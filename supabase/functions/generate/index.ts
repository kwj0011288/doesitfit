import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;
const GEMINI_API_KEY_2 = Deno.env.get("GEMINI_API_KEY_2");

// API keys array - try primary first, then fallback
const getApiKeys = (): string[] => {
  const keys = [GEMINI_API_KEY];
  if (GEMINI_API_KEY_2) {
    keys.push(GEMINI_API_KEY_2);
  }
  return keys;
};

console.log("Gemini 2.5 Generation Function Invoked");

/**
 * ---- Rate Limiting & Concurrency Control ----
 */

// In-memory semaphore to limit concurrent requests
const MAX_CONCURRENT_REQUESTS = 3;
let activeRequests = 0;
const requestQueue: Array<() => void> = [];

async function acquireSemaphore(): Promise<void> {
  return new Promise((resolve) => {
    if (activeRequests < MAX_CONCURRENT_REQUESTS) {
      activeRequests++;
      resolve();
    } else {
      requestQueue.push(resolve);
    }
  });
}

function releaseSemaphore(): void {
  activeRequests--;
  if (requestQueue.length > 0) {
    const next = requestQueue.shift();
    if (next) {
      activeRequests++;
      next();
    }
  }
}

/**
 * ---- Retry Logic with Exponential Backoff + Jitter ----
 */

interface RetryConfig {
  maxRetries?: number;
  baseDelayMs?: number;
  maxDelayMs?: number;
}

function calculateBackoffDelay(
  attempt: number,
  statusCode: number,
  baseDelayMs: number = 1000,
  maxDelayMs: number = 30000,
): number {
  // 429 (Rate Limit): Longer backoff - start with 5s, max 60s
  if (statusCode === 429) {
    const base = Math.min(baseDelayMs * 5, maxDelayMs * 2);
    const exponential = Math.min(base * Math.pow(2, attempt), maxDelayMs * 2);
    // Add jitter: ±20% random variation
    const jitter = exponential * 0.2 * (Math.random() * 2 - 1);
    return Math.max(1000, Math.min(exponential + jitter, maxDelayMs * 2));
  }

  // 503 (Overload) / 500 (Server Error): Standard backoff
  const exponential = Math.min(baseDelayMs * Math.pow(2, attempt), maxDelayMs);
  // Add jitter: ±15% random variation
  const jitter = exponential * 0.15 * (Math.random() * 2 - 1);
  return Math.max(500, Math.min(exponential + jitter, maxDelayMs));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  config: RetryConfig = {},
): Promise<Response> {
  const { maxRetries = 3, baseDelayMs = 1000, maxDelayMs = 30000 } = config;

  let lastError: Error | null = null;
  let lastStatus: number | null = null;

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);

      if (response.ok) {
        return response;
      }

      const status = response.status;
      lastStatus = status;

      // Determine if retryable and get appropriate delay
      const isRetryable =
        status === 503 ||
        status === 429 ||
        status === 500 ||
        status === 502 ||
        status === 504;

      if (isRetryable && attempt < maxRetries - 1) {
        const delayMs = calculateBackoffDelay(
          attempt,
          status,
          baseDelayMs,
          maxDelayMs,
        );
        const statusName =
          status === 429
            ? "Rate Limit"
            : status === 503
              ? "Overloaded"
              : "Server Error";

        console.log(
          `⚠️ Gemini API ${status} (${statusName}) - Attempt ${attempt + 1}/${maxRetries}. Waiting ${Math.round(delayMs)}ms before retry...`,
        );

        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }

      // If not retryable or last attempt, throw with context
      const errorText = await response.text().catch(() => "Unknown error");
      throw new Error(`API Error ${status}: ${errorText}`);
    } catch (error) {
      lastError = error as Error;

      // If it's a network error and we have retries left, retry
      if (attempt < maxRetries - 1) {
        const delayMs = calculateBackoffDelay(
          attempt,
          lastStatus || 500,
          baseDelayMs,
          maxDelayMs,
        );
        console.log(
          `⚠️ Network/Request error - Attempt ${attempt + 1}/${maxRetries}. Waiting ${Math.round(delayMs)}ms...`,
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        continue;
      }
    }
  }

  // Format error message for frontend
  if (lastStatus === 429) {
    throw new Error(
      "Rate limit exceeded. Please wait a moment and try again. The service is handling many requests right now.",
    );
  } else if (lastStatus === 503) {
    throw new Error(
      "Service temporarily overloaded. Please try again in a few moments.",
    );
  } else if (lastStatus === 500 || lastStatus === 502 || lastStatus === 504) {
    throw new Error("Temporary server issue. Please try again in a moment.");
  }

  throw lastError || new Error("Request failed after retries");
}

/**
 * Fetch with API key fallback - tries multiple API keys if one fails
 */
async function fetchWithKeyFallback(
  baseUrl: string,
  options: RequestInit,
  config: RetryConfig = {},
): Promise<Response> {
  const apiKeys = getApiKeys();
  let lastError: Error | null = null;

  for (let keyIndex = 0; keyIndex < apiKeys.length; keyIndex++) {
    const apiKey = apiKeys[keyIndex];
    // Replace API key in URL (handles both ?key= and &key= patterns)
    const url = baseUrl.replace(
      /[?&]key=[^&]*/,
      `${keyIndex === 0 ? "?" : "&"}key=${apiKey}`,
    );

    try {
      console.log(
        `🔑 Trying API key ${keyIndex + 1}/${apiKeys.length}${keyIndex > 0 ? " (fallback)" : ""}`,
      );
      return await fetchWithRetry(url, options, config);
    } catch (error) {
      lastError = error as Error;
      const errorMessage = (error as Error).message || "";

      // If it's an API key related error (401, 403) or rate limit (429), try next key
      // For other errors, also try next key as fallback
      if (
        keyIndex < apiKeys.length - 1 &&
        (errorMessage.includes("401") ||
          errorMessage.includes("403") ||
          errorMessage.includes("429") ||
          errorMessage.includes("API Error") ||
          errorMessage.includes("Rate limit") ||
          errorMessage.includes("API key"))
      ) {
        console.log(
          `⚠️ API key ${keyIndex + 1} failed (${errorMessage}), trying fallback key...`,
        );
        continue;
      }

      // If it's the last key or non-key-related error, throw
      throw error;
    }
  }

  throw lastError || new Error("All API keys failed");
}

/**
 * ---- Strict anti-dup helpers (server-side enforcement) ----
 */

function norm(s: string) {
  return (s || "")
    .toLowerCase()
    .replace(/[\u2019’]/g, "'")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function hasDuplicateStrings(values: string[]) {
  const seen = new Set<string>();
  for (const v of values) {
    const k = norm(v);
    if (!k) continue;
    if (seen.has(k)) return true;
    seen.add(k);
  }
  return false;
}

type HairTraits = {
  length: "short" | "medium" | "long";
  part: "center" | "side" | "none" | "zigzag";
  volume: "flat" | "natural" | "voluminous" | "teased";
  texture: "straight" | "wavy" | "curly" | "coily" | "textured";
  silhouette:
    | "pixie"
    | "bob"
    | "lob"
    | "layers"
    | "shag"
    | "slick_back"
    | "fringe"
    | "bun"
    | "ponytail"
    | "half_up"
    | "braids"
    | "twists"
    | "waves"
    | "curls"
    | "updo"
    | "chignon"
    | "topknot"
    | "braided_updo"
    | "fishtail"
    | "dutch_braids"
    | "french_braids"
    | "space_buns"
    | "low_bun"
    | "high_bun"
    | "messy_bun"
    | "sleek_ponytail"
    | "low_ponytail"
    | "side_ponytail"
    | "braided_ponytail";
  direction: "down" | "up" | "pulled_back" | "side_swept";
};

function hairSignature(t: HairTraits) {
  // strongest uniqueness key
  return `${t.length}|${t.silhouette}`;
}

function sharedHairTraitCount(a: HairTraits, b: HairTraits) {
  let c = 0;
  if (a.length === b.length) c++;
  if (a.part === b.part) c++;
  if (a.volume === b.volume) c++;
  if (a.texture === b.texture) c++;
  if (a.silhouette === b.silhouette) c++;
  if (a.direction === b.direction) c++;
  return c;
}

function validateHairstyles(hairstyles: any[]) {
  if (!Array.isArray(hairstyles) || hairstyles.length !== 6) {
    return { ok: false as const, reason: "hairstyles must be length 6" };
  }

  // strict index order check
  for (let i = 0; i < 6; i++) {
    if (hairstyles[i]?.index !== i) {
      return {
        ok: false as const,
        reason: `hairstyles[${i}].index must be ${i}`,
      };
    }
  }

  // duplicate names
  if (hasDuplicateStrings(hairstyles.map((h) => h?.name ?? ""))) {
    return { ok: false as const, reason: "duplicate hairstyle names" };
  }

  // require traits for all
  for (let i = 0; i < 6; i++) {
    if (!hairstyles[i]?.traits) {
      return { ok: false as const, reason: "missing hairstyle traits" };
    }
  }

  // signature uniqueness (length+silhouette)
  const sigSeen = new Set<string>();
  for (let i = 0; i < 6; i++) {
    const t = hairstyles[i].traits as HairTraits;
    const sig = hairSignature(t);
    if (sigSeen.has(sig)) {
      return {
        ok: false as const,
        reason: `duplicate hair signature ${sig}`,
      };
    }
    sigSeen.add(sig);
  }

  // strong similarity rejection: no pair can share >=4 traits (relaxed from 2 to allow more variety)
  // Only reject if they share too many traits (4 or more out of 6)
  for (let i = 0; i < 6; i++) {
    for (let j = i + 1; j < 6; j++) {
      const a = hairstyles[i].traits as HairTraits;
      const b = hairstyles[j].traits as HairTraits;
      const shared = sharedHairTraitCount(a, b);
      // Only reject if they share 4 or more traits (more than half)
      if (shared >= 4) {
        return {
          ok: false as const,
          reason: `hairstyles ${i} and ${j} too similar (shared ${shared} traits)`,
        };
      }
    }
  }

  return { ok: true as const };
}

type OutfitTags = {
  formality: "work" | "daily" | "date_party";
  silhouette: "tailored" | "relaxed" | "fitted" | "flowy";
  color_family: "neutral" | "cool" | "warm" | "earth" | "monochrome";
  shoe_type: "loafer" | "sneaker" | "heel" | "boot" | "flat";
};

function outfitSignature(t: OutfitTags) {
  // strong uniqueness key
  return `${t.formality}|${t.shoe_type}`;
}

function sharedOutfitTraitCount(a: OutfitTags, b: OutfitTags) {
  let c = 0;
  if (a.formality === b.formality) c++;
  if (a.silhouette === b.silhouette) c++;
  if (a.color_family === b.color_family) c++;
  if (a.shoe_type === b.shoe_type) c++;
  return c;
}

function validateOutfits(outfits: any[]) {
  if (!Array.isArray(outfits) || outfits.length !== 3) {
    return { ok: false as const, reason: "outfits must be length 3" };
  }

  if (hasDuplicateStrings(outfits.map((o) => o?.title ?? ""))) {
    return { ok: false as const, reason: "duplicate outfit titles" };
  }

  for (let i = 0; i < 3; i++) {
    if (!outfits[i]?.diversity_tags) {
      return { ok: false as const, reason: "missing outfit diversity_tags" };
    }
    if (!Array.isArray(outfits[i]?.items) || outfits[i].items.length < 3) {
      return {
        ok: false as const,
        reason: `outfit ${i} items missing/too few`,
      };
    }
  }

  // signature uniqueness (formality+shoe_type)
  const sigSeen = new Set<string>();
  for (let i = 0; i < 3; i++) {
    const t = outfits[i].diversity_tags as OutfitTags;
    const sig = outfitSignature(t);
    if (sigSeen.has(sig)) {
      return {
        ok: false as const,
        reason: `duplicate outfit signature ${sig}`,
      };
    }
    sigSeen.add(sig);
  }

  // strong similarity rejection: no pair can share >=3 outfit traits
  for (let i = 0; i < 3; i++) {
    for (let j = i + 1; j < 3; j++) {
      const a = outfits[i].diversity_tags as OutfitTags;
      const b = outfits[j].diversity_tags as OutfitTags;
      const shared = sharedOutfitTraitCount(a, b);
      if (shared >= 3) {
        return {
          ok: false as const,
          reason: `outfits ${i} and ${j} too similar (shared ${shared} tags)`,
        };
      }
    }
  }

  // items category uniqueness inside each outfit
  for (let i = 0; i < 3; i++) {
    const items = outfits[i].items || [];
    const catSeen = new Set<string>();
    for (const it of items) {
      const cat = norm(it?.category ?? "");
      if (!cat) {
        return {
          ok: false as const,
          reason: `missing item.category in outfit ${i}`,
        };
      }
      if (catSeen.has(cat)) {
        return {
          ok: false as const,
          reason: `duplicate item category "${cat}" in outfit ${i}`,
        };
      }
      catSeen.add(cat);
    }
  }

  // key items uniqueness across all outfits by (category + normalized name)
  const globalItemSeen = new Set<string>();
  for (let i = 0; i < 3; i++) {
    for (const it of outfits[i].items || []) {
      const cat = norm(it?.category ?? "");
      const name = norm(it?.name ?? "");
      if (!cat || !name) continue;
      const key = `${cat}|${name}`;
      if (globalItemSeen.has(key)) {
        return {
          ok: false as const,
          reason: `duplicate key item across outfits: ${cat} "${it.name}"`,
        };
      }
      globalItemSeen.add(key);
    }
  }

  return { ok: true as const };
}

function safeJsonParse(text: string) {
  const cleaned = (text || "").replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(cleaned);
}

async function callGeminiJSON(
  prompt: string,
  photoB64: string,
  photoMime: string,
  maxRetries: number = 3,
) {
  await acquireSemaphore();
  try {
    const analysisResponse = await fetchWithKeyFallback(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: prompt },
                {
                  inline_data: {
                    mime_type: photoMime || "image/jpeg",
                    data: photoB64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: 0.45,
          },
        }),
      },
      { maxRetries, baseDelayMs: 1000, maxDelayMs: 30000 },
    );

    const analysisData = await analysisResponse.json();
    const text = analysisData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    return safeJsonParse(text);
  } finally {
    releaseSemaphore();
  }
}

function buildHairStyleSpecsFromTraits(hairstyles: any[]) {
  // For image model: give explicit trait spec per panel to reduce “similar hair” collapse.
  return hairstyles
    .map((h: any) => {
      const t = h.traits as HairTraits;
      const idx = h.index;
      return `Panel ${idx}: ${h.name}. Traits: length=${t.length}, silhouette=${t.silhouette}, part=${t.part}, volume=${t.volume}, texture=${t.texture}, direction=${t.direction}.`;
    })
    .join("\n");
}

async function callGeminiImage(
  gridPrompt: string,
  photoB64: string,
  photoMime: string,
  maxRetries: number = 3,
) {
  await acquireSemaphore();
  try {
    const imageResponse = await fetchWithKeyFallback(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: gridPrompt },
                {
                  inline_data: {
                    mime_type: photoMime || "image/jpeg",
                    data: photoB64,
                  },
                },
              ],
            },
          ],
        }),
      },
      { maxRetries, baseDelayMs: 1000, maxDelayMs: 30000 },
    );

    const imageData = await imageResponse.json();
    const parts = imageData.candidates?.[0]?.content?.parts || [];
    const imagePart = parts.find((p: any) => p.inline_data || p.inlineData);

    if (!imagePart) {
      throw new Error(
        `No image data found. Response: ${JSON.stringify(imageData)}`,
      );
    }

    return (imagePart.inline_data || imagePart.inlineData).data as string;
  } finally {
    releaseSemaphore();
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const formData = await req.formData();
    const photo = formData.get("photo") as File;
    const heightCm = formData.get("height_cm");
    const gender = formData.get("gender") as string;
    const occasion = formData.get("occasion");
    const checkoutId = formData.get("checkout_id") as string;

    // Optional fields
    const weightKg = formData.get("weight_kg");
    const styleVibe = formData.get("style_vibe");
    const fitPreference = formData.get("fit_preference");

    if (!photo || !heightCm || !gender || !occasion) {
      throw new Error(
        "Missing required fields: photo, height_cm, gender, or occasion",
      );
    }

    // 1) Verify & Consume Purchase (Supabase)
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    if (checkoutId) {
      const { error } = await supabase
        .from("purchases")
        .update({ used: true })
        .eq("checkout_id", checkoutId);

      if (error) console.error("Error consuming checkout_id:", error);
    }

    // 2) Prepare Image -> base64
    const photoBytes = await photo.arrayBuffer();
    const uint8Array = new Uint8Array(photoBytes);

    let binary = "";
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    const photoB64 = btoa(binary);

    // Unit conversions for clarity
    const heightCmNum = parseFloat(heightCm as string);
    const heightFeet = Math.floor(heightCmNum / 30.48);
    const heightInches = Math.round((heightCmNum % 30.48) / 2.54);
    const heightImperial = `${heightFeet}'${heightInches}"`;

    let weightImperial = "";
    if (weightKg) {
      const weightKgNum = parseFloat(weightKg as string);
      const weightLbs = Math.round(weightKgNum / 0.453592);
      weightImperial = ` (${weightLbs} lbs)`;
    }

    /**
     * 3) Build Prompt (Schema updated to include anti-dup fields)
     * - hairstyles: traits required
     * - outfits: diversity_tags required
     * - items: category required
     */
    const basePrompt = `
You are a world-class personal stylist. Analyze the uploaded photo and the user details below, then generate recommendations that are realistic, flattering, and appropriate for the user’s situation.

User details:
- Gender: ${gender}
- Height: ${heightCm} cm (${heightImperial})
    - Occasion: ${occasion}
${weightKg ? `- Weight: ${weightKg} kg${weightImperial}` : ""}
${styleVibe ? `- Preferred Vibe: ${styleVibe}` : ""}
${fitPreference ? `- Fit Preference: ${fitPreference}` : ""}

Critical rules (must follow):
1) Do NOT give extreme, costume-like, or niche styles unless the user explicitly asked for it.
2) Every recommendation must be justified by visible traits in the photo (overall proportions, face shape, vibe, contrast, etc.).
3) Prioritize flattering fit, balanced proportions, and clean color harmony. When unsure, choose classic, safe options.
4) Respect Occasion strictly:
   - Interview/Work: polished, minimal, low-risk, neutral colors, no flashy items.
   - Daily: practical and versatile.
   - Date/Party: still flattering, but only slightly bolder, never extreme.
5) Respect Preferred Vibe if provided. If not provided, infer a conservative, neutral vibe from the photo.
6) Respect Fit Preference if provided:
   - If "Slim-No": avoid tight fits.
   - If "Oversized-No": avoid oversized fits.

STRICT UNIQUENESS POLICY (NON-NEGOTIABLE):
- If you cannot produce UNIQUE outputs, you MUST internally regenerate until you can.
- Do NOT output JSON unless all uniqueness constraints are satisfied.

HAIRSTYLES (MUST BE UNIQUE):
- Exactly 6 hairstyles indexed 0..5.
- Each hairstyle MUST include traits: length, part, volume, texture, silhouette, direction.
- CRITICAL: You MUST use DIFFERENT combinations across all 6 styles. Plan your combinations before generating.

DIVERSITY STRATEGY (MUST FOLLOW):
- Use ALL available options: short, medium, long lengths (distribute evenly: ~2 each)
- Use ALL part options: center, side, none, zigzag (vary them)
- Use ALL volume options: flat, natural, voluminous, teased (mix them)
- Use ALL texture options: straight, wavy, curly, coily, textured (vary them)
- Use MANY silhouette options: pixie, bob, lob, layers, shag, slick_back, fringe, bun, ponytail, half_up, braids, twists, waves, curls, updo, chignon, topknot, braided_updo, fishtail, dutch_braids, french_braids, space_buns, low_bun, high_bun, messy_bun, sleek_ponytail, low_ponytail, side_ponytail, braided_ponytail
- Use ALL direction options: down, up, pulled_back, side_swept

EXAMPLE DISTRIBUTION (use as inspiration, but create unique combinations):
- Style 0: short + side + natural + straight + pixie + down
- Style 1: medium + center + voluminous + wavy + layers + down
- Style 2: long + none + natural + curly + dutch_braids + pulled_back
- Style 3: short + zigzag + flat + textured + slick_back + side_swept
- Style 4: medium + side + voluminous + wavy + lob + down (PRIMARY)
- Style 5: long + center + natural + straight + sleek_ponytail + up

IMPORTANT: When generating, actively vary ALL traits. Don't repeat the same combinations.
- Use different lengths: mix short (2), medium (2), long (2)
- Use different parts: vary center, side, none, zigzag
- Use different volumes: mix flat, natural, voluminous, teased
- Use different textures: vary straight, wavy, curly, coily, textured
- Use MANY different silhouettes: don't repeat the same silhouette type
- Use different directions: mix down, up, pulled_back, side_swept

Uniqueness rules:
  A) No two hairstyles may share the same (length + silhouette) combination.
  B) No two hairstyles may share 4 or more traits total.
  C) Names must be all different and specific (no generic duplicates).
  D) Actively vary traits: don't use the same length/part/volume/texture/silhouette/direction repeatedly.

OUTFITS (MUST BE UNIQUE):
- Exactly 3 outfits.
- Each outfit MUST include diversity_tags: formality, silhouette, color_family, shoe_type.
- Uniqueness rules:
  A) No two outfits may share the same (formality + shoe_type).
  B) No two outfits may share 3 or more of the diversity_tags.
  C) Outfit titles must be all different.

KEY ITEMS (MUST BE UNIQUE):
- Each outfit items[] must include category and categories must not repeat within the same outfit.
- Across ALL outfits, do not repeat the same (category + name). If it repeats, regenerate.

REALISM RULE:
- Avoid unrealistic colors, exaggerated wigs, or dramatic transformations.
- Keep changes within what a real salon could do.

Required analyses:
- Personal color guidance with a 5-color HEX palette
- Determine ONE body shape keyword and ONE face shape keyword (keywords only)
- Provide styling rules as short, actionable bullets
- Outfits: exactly 3 complete looks aligned with Occasion and Vibe
- Hairstyles: exactly 6, following the strict uniqueness rules above

Output ONLY valid JSON with EXACTLY this schema. No markdown, no comments, no extra text.

    {
      "personal_color": {
    "season": "String",
    "description": "String",
    "palette": ["#Hex", "#Hex", "#Hex", "#Hex", "#Hex"]
  },
  "analysis": {
    "body_shape": "KEYWORD_ONLY",
    "face_shape": "KEYWORD_ONLY",
    "notes": "Short explanation (2-4 sentences) explaining why these keywords were chosen based on visible traits."
  },
  "styling_rules": ["String", "String", "String", "String"],
  "outfits": [
    {
      "title": "String",
      "description": "String",
      "why_it_works": "String",
      "diversity_tags": {
        "formality": "work|daily|date_party",
        "silhouette": "tailored|relaxed|fitted|flowy",
        "color_family": "neutral|cool|warm|earth|monochrome",
        "shoe_type": "loafer|sneaker|heel|boot|flat"
      },
      "items": [
        { "category": "top|bottom|outerwear|shoes|bag|accessory", "name": "Item Name", "color": "Color", "image_query": "search keywords" }
      ]
    },
    {
      "title": "String",
      "description": "String",
      "why_it_works": "String",
      "diversity_tags": {
        "formality": "work|daily|date_party",
        "silhouette": "tailored|relaxed|fitted|flowy",
        "color_family": "neutral|cool|warm|earth|monochrome",
        "shoe_type": "loafer|sneaker|heel|boot|flat"
      },
      "items": [
        { "category": "top|bottom|outerwear|shoes|bag|accessory", "name": "Item Name", "color": "Color", "image_query": "search keywords" }
      ]
    },
    {
      "title": "String",
      "description": "String",
      "why_it_works": "String",
      "diversity_tags": {
        "formality": "work|daily|date_party",
        "silhouette": "tailored|relaxed|fitted|flowy",
        "color_family": "neutral|cool|warm|earth|monochrome",
        "shoe_type": "loafer|sneaker|heel|boot|flat"
      },
          "items": [
        { "category": "top|bottom|outerwear|shoes|bag|accessory", "name": "Item Name", "color": "Color", "image_query": "search keywords" }
      ]
    }
      ],
      "hairstyles": [
        {
      "index": 0,
      "name": "String (distinct style name)",
      "description": "String (why this style works)",
      "image_query": "search keywords",
      "traits": {
        "length": "short|medium|long",
        "part": "center|side|none|zigzag",
        "volume": "flat|natural|voluminous|teased",
        "texture": "straight|wavy|curly|coily|textured",
        "silhouette": "pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail",
        "direction": "down|up|pulled_back|side_swept"
      }
    },
    { "index": 1, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 2, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 3, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 4, "name": "String (PRIMARY/BEST)", "description": "String (best style)", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 5, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 6, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 7, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } },
    { "index": 8, "name": "String", "description": "String", "image_query": "String", "traits": { "length":"short|medium|long","part":"center|side|none|zigzag","volume":"flat|natural|voluminous|teased","texture":"straight|wavy|curly|coily|textured","silhouette":"pixie|bob|lob|layers|shag|slick_back|fringe|bun|ponytail|half_up|braids|twists|waves|curls|updo|chignon|topknot|braided_updo|fishtail|dutch_braids|french_braids|space_buns|low_bun|high_bun|messy_bun|sleek_ponytail|low_ponytail|side_ponytail|braided_ponytail","direction":"down|up|pulled_back|side_swept" } }
  ]
}
`;

    // 4) Step 1: JSON generation with server-side rejection loop
    console.log(
      "Calling Gemini 2.5 Flash for Analysis (with strict anti-dup validation)...",
    );

    const MAX_ATTEMPTS = 6; // Increased from 4 to allow more retries
    let result: any = null;
    let lastRejectReason = "";

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const feedback = lastRejectReason
        ? `\n\nPREVIOUS OUTPUT WAS REJECTED BY SERVER VALIDATION.\nRejection reason: ${lastRejectReason}\nYou MUST regenerate and fix ONLY the violated uniqueness rules. Ensure hairstyles are visually distinct. Output valid JSON only.\n`
        : "";

      const prompt = basePrompt + feedback;

      console.log(`🧪 Attempt ${attempt}/${MAX_ATTEMPTS}...`);
      try {
        const candidate = await callGeminiJSON(
          prompt,
          photoB64,
          photo.type || "image/jpeg",
        );

        const hairCheck = validateHairstyles(candidate.hairstyles);
        if (!hairCheck.ok) {
          lastRejectReason = hairCheck.reason;
          console.warn("❌ Reject (hairstyles):", lastRejectReason);
          // Add delay between retries to avoid rate limiting
          if (attempt < MAX_ATTEMPTS) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          }
          continue;
        }

        const outfitCheck = validateOutfits(candidate.outfits);
        if (!outfitCheck.ok) {
          lastRejectReason = outfitCheck.reason;
          console.warn("❌ Reject (outfits/items):", lastRejectReason);
          if (attempt < MAX_ATTEMPTS) {
            await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
          }
          continue;
        }

        // All good
        result = candidate;
        lastRejectReason = "";
        console.log("✅ Step 1: JSON accepted by server validation");
        break;
      } catch (error) {
        console.error(`Attempt ${attempt} failed:`, error);
        if (attempt === MAX_ATTEMPTS) {
          throw error;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      }
    }

    if (!result) {
      throw new Error(
        `Generation rejected after ${MAX_ATTEMPTS} attempts: ${lastRejectReason || "unknown"}. Please try again.`,
      );
    }

    console.log("   - Personal Color:", result.personal_color?.season);
    console.log(
      "   - Hairstyles:",
      result.hairstyles?.map((h: any) => h.name).join(", "),
    );
    console.log(
      "   - Outfit Titles:",
      result.outfits?.map((o: any) => o.title).join(", "),
    );

    // 5) Step 2: Image Generation (gemini-2.5-flash-image)
    // Build a stricter panel spec using traits to reduce "similar hair" collapse
    const hairStyleSpecs = buildHairStyleSpecsFromTraits(result.hairstyles);

    const gridPrompt = `
Using the uploaded photo as the ONLY identity reference, generate ONE single image that is a 3×3 collage (grid) of hairstyle variations.

ABSOLUTE GLOBAL CONSTRAINTS (MUST FOLLOW):
- Output MUST be exactly ONE image.
- Final image MUST be a perfect rectangle (2:3 aspect ratio, portrait orientation).
- The person MUST be the exact same individual as the uploaded photo in ALL 6 panels (identity lock).
- Same camera distance, same framing, same lighting, same head pose (front-facing), same neutral expression in every panel.
- Same clothing and same neutral background in every panel.
- Only the hair is allowed to change. No other changes.

GRID RULES:
- 2×3 grid, 6 panels, evenly sized, perfectly aligned with clear borders/separators between panels.
- Each panel: close-up / portrait / upper-body only. No full-body. No wide-angle.
- Each panel should be a complete, independent portrait that could stand alone.

HAIR VARIATION RULES (CRITICAL):
- Provide SIX VISUALLY DISTINCT hairstyles. Each must be clearly different and easily distinguishable.
- Hair color MUST remain natural and consistent with the original photo (no fantasy colors).
- No wigs, no exaggerated transformations. Salon-achievable only.
- Apply the panel-by-panel trait specs EXACTLY. Each panel must match its traits.

PANEL ORDER (left→right, top→bottom):
Top row:     0  1
Middle row:  2  3
Bottom row:  4  5

PANEL-BY-PANEL SPEC (MUST APPLY EXACTLY):
${hairStyleSpecs}

REMINDER: Panel 3 (center-right) is the PRIMARY/BEST recommendation.

INDEX LABEL RULES (MUST BE VISIBLE):
- Add a CLEAR, READABLE index label in the bottom-right corner of EACH panel.
- Labels MUST be exactly: 0, 1, 2, 3, 4, 5, 6, 7, 8
- No other text.

QUALITY:
- Photorealistic, sharp focus, clean studio lighting.
- No blur, no distortion, no duplicated face.

NEGATIVE PROMPT:
different person, face change, identity drift, altered facial features, different ethnicity, different age, different makeup, different expression, distorted face, duplicated face, blurry, cartoon, illustration, painting

Output only ONE square collage image.
`;

    console.log("🚀 Calling Gemini 2.5 Flash Image for 3x3 Grid...");
    let generatedImageB64: string | null = null;

    try {
      generatedImageB64 = await callGeminiImage(
        gridPrompt,
        photoB64,
        photo.type || "image/jpeg",
      );
      console.log("✅ Image generated successfully");
    } catch (e) {
      console.warn("❌ Image generation failed:", (e as Error).message);
      // keep null; still return JSON result
    }

    // Attach generated image to result
    result.generated_outfit_image = generatedImageB64;

    // Attach gender to result for frontend image search
    result.gender = gender;

    return new Response(JSON.stringify({ result }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    const errorMessage = (error as Error).message || "Internal Server Error";

    // Determine status code and user-friendly message based on error
    let statusCode = 500;
    let userMessage = errorMessage;

    if (errorMessage.includes("Rate limit") || errorMessage.includes("429")) {
      statusCode = 429;
      userMessage = "Too many requests. Please wait a moment and try again.";
    } else if (
      errorMessage.includes("overloaded") ||
      errorMessage.includes("503")
    ) {
      statusCode = 503;
      userMessage =
        "Service temporarily overloaded. Please try again in a few moments.";
    } else if (
      errorMessage.includes("server issue") ||
      errorMessage.includes("500") ||
      errorMessage.includes("502") ||
      errorMessage.includes("504")
    ) {
      statusCode = 500;
      userMessage = "Temporary server issue. Please try again in a moment.";
    }

    return new Response(
      JSON.stringify({
        error: userMessage,
        code:
          statusCode === 429
            ? "RATE_LIMIT"
            : statusCode === 503
              ? "OVERLOADED"
              : "SERVER_ERROR",
      }),
      {
        status: statusCode,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
