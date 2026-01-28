import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY")!;

console.log("Gemini 2.5 Generation Function Invoked");

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response("ok", { headers: corsHeaders });

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

    // 1. Verify & Consume Purchase (Supabase)
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Temporarily verify first (optional, mainly for production integrity)
    if (checkoutId) {
      // Mark as used
      const { error } = await supabase
        .from("purchases")
        .update({ used: true })
        .eq("checkout_id", checkoutId);

      if (error) console.error("Error consuming checkout_id:", error);
    }

    // 2. Prepare Image
    const photoBytes = await photo.arrayBuffer();
    const uint8Array = new Uint8Array(photoBytes);

    // Convert to base64 in chunks to avoid stack overflow (Restoring user's robust logic)
    let binary = "";
    const chunkSize = 8192;
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      const chunk = uint8Array.subarray(i, i + chunkSize);
      binary += String.fromCharCode(...chunk);
    }
    const photoB64 = btoa(binary);

    // Convert to imperial units for prompt clarity
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

    // 3. Build Prompt (Combining previous detailed prompt with user's structure)
    const prompt = `
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

7) Hairstyles must be EXACTLY 9 options for a 3×3 grid.

GRID & INDEX RULES (STRICT):
- Hairstyles MUST be indexed from 1 to 9 (NOT 0-based).
- Index mapping is FIXED and MUST NOT be changed:

Index → Grid Position
1 = top-left
2 = top-center
3 = top-right
4 = middle-left
5 = center (PRIMARY recommendation)
6 = middle-right
7 = bottom-left
8 = bottom-center
9 = bottom-right

- The array order MUST match the index order exactly.
- hairstyles[0] MUST have index = 1
- hairstyles[8] MUST have index = 9
- Any mismatch is INVALID.

STYLE DIVERSITY RULE (CRITICAL):
- NO two hairstyles may be similar.
- Similar means sharing more than ONE of the following traits:
  • overall length category (short / medium / long)
  • parting (center / side / no part)
  • volume profile (flat / natural / voluminous)
  • texture (straight / wavy / curly / coily)
  • silhouette (bob / lob / layers / shag / slick-back / fringe-forward / bun-updo / ponytail / half-up)
- For every pair of hairstyles, ensure they differ in AT LEAST TWO traits from the list above.
- Also avoid repeating the same core cut type (e.g., do not output 3 different versions of "long layers").

REALISM RULE:
- Avoid unrealistic colors, exaggerated wigs, or dramatic transformations.
- Keep changes within what a real salon could do without extreme styling.

Required analyses to perform internally:
- Personal color guidance with a 5-color HEX palette
- Determine ONE body shape keyword and ONE face shape keyword (keywords only, no extra sentences for these two fields)
- Provide styling rules as short, actionable bullets
- Outfits: create exactly 3 complete looks aligned with Occasion and Vibe
- Hairstyles: exactly 9, following the grid and diversity rules above

Output ONLY valid JSON with EXACTLY this schema. Do NOT include markdown, comments, or extra text.

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
      "items": [
        { "name": "Item Name", "color": "Color", "image_query": "search keywords" }
      ]
    },
    {
      "title": "String",
      "description": "String",
      "why_it_works": "String",
      "items": [
        { "name": "Item Name", "color": "Color", "image_query": "search keywords" }
      ]
    },
    {
      "title": "String",
      "description": "String",
      "why_it_works": "String",
      "items": [
        { "name": "Item Name", "color": "Color", "image_query": "search keywords" }
      ]
    }
  ],
  "hairstyles": [
    { "index": 1, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 2, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 3, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 4, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 5, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 6, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 7, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 8, "name": "String", "description": "String", "image_query": "search keywords" },
    { "index": 9, "name": "String", "description": "String", "image_query": "search keywords" }
  ]
}
`;

    // 4. Step 1: Text Analysis (gemini-2.5-flash)
    console.log("Calling Gemini 2.5 Flash for Analysis...");

    const analysisResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`,
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
                    mime_type: photo.type || "image/jpeg",
                    data: photoB64,
                  },
                },
              ],
            },
          ],
          generationConfig: {
            response_mime_type: "application/json",
            temperature: 0.7,
          },
        }),
      },
    );

    if (!analysisResponse.ok) {
      const err = await analysisResponse.text();
      throw new Error(`Analysis Failed: ${err}`);
    }

    const analysisData = await analysisResponse.json();
    let responseText = analysisData.candidates[0].content.parts[0].text;
    responseText = responseText.replace(/```json\n?|\n?```/g, "").trim();
    const result = JSON.parse(responseText);
    console.log("✅ Step 1: Text Analysis Complete");
    console.log("   - Personal Color:", result.personal_color?.season);
    console.log(
      "   - Recommended Hairstyles:",
      result.hairstyles?.map((h: any) => h.name).join(", "),
    );

    // 5. Step 2: Image Generation (gemini-2.5-flash-image)
    // Create a prompt for 3x3 Hairstyle Grid
    const hairStyleSpecs =
      result.hairstyles
        ?.map((h: any, i: number) => {
          const idx = h.index ?? i + 1; // 너 JSON은 1~9로 바꿨으니 그 기준
          // description을 짧게 써놨다는 가정. 없으면 name만.
          const desc = h.description ? `(${h.description})` : "";
          return `${idx}: ${h.name} ${desc}`.trim();
        })
        .join("\n") ||
      "1: natural style\n2: side part\n3: fringe\n4: bob\n5: layered\n6: slick back\n7: ponytail\n8: half-up\n9: low bun";

    const gridPrompt = `
    Using the uploaded photo as the ONLY identity reference, generate ONE single image that is a 3×3 collage (grid) of hairstyle variations.
    
    ABSOLUTE GLOBAL CONSTRAINTS (MUST FOLLOW):
    - Output MUST be exactly ONE image.
    - Final image MUST be a perfect square (1:1 aspect ratio).
    - The person MUST be the exact same individual as the uploaded photo in ALL 9 panels (identity lock).
    - Same camera distance, same framing, same lighting, same head pose (front-facing), same neutral expression in every panel.
    - Same clothing and same neutral background in every panel.
    - Only the hair is allowed to change. No other changes.
    
    IDENTITY LOCK (NON-NEGOTIABLE):
    - Face MUST match the reference exactly: same eyes, nose, lips, jawline, cheekbones, skin tone, age.
    - Do NOT change makeup, do NOT add accessories, do NOT change eyebrows, do NOT change facial hair.
    - Do NOT slim/alter the face or body.
    - If any panel deviates from the identity, the output is invalid.
    
    GRID RULES:
    - 3×3 grid, 9 panels, evenly sized, perfectly aligned.
    - Each panel: close-up / portrait / upper-body only. No full-body. No wide-angle.
    
    HAIR VARIATION RULES:
    - Provide NINE DISTINCT hairstyles, each clearly different from the others.
    - Hair color MUST remain natural and consistent with the original photo (no fantasy colors).
    - No wigs, no exaggerated transformations.
    - Keep realism: salon-achievable.
    
    PANEL-BY-PANEL HAIRSTYLE SPEC (MUST APPLY EXACTLY):
    Apply these nine styles in order left→right, top→bottom.
    Panel positions:
    Top row:     [0] [1] [2]
    Middle row:  [3] [4] [5]
    Bottom row:  [6] [7] [8]
    
    Use this exact mapping:
    [0] = style 1
    [1] = style 2
    [2] = style 3
    [3] = style 4
    [4] = style 5 (PRIMARY)
    [5] = style 6
    [6] = style 7
    [7] = style 8
    [8] = style 9
    
    Style list to apply (do not ignore descriptions):
    ${hairStyleSpecs}
    
    INDEX LABEL RULES (MUST):
    - Add a small index label in the bottom-right corner of EACH panel.
    - Labels MUST be: 0,1,2,3,4,5,6,7,8 exactly.
    - Ordered left→right, top→bottom (top-left=0 ... bottom-right=8).
    - Small, simple font, subtle but readable.
    - No other text anywhere.
    
    QUALITY:
    - Photorealistic, sharp focus, clean studio lighting.
    - No blur, no distortion, no duplicated face.
    
    NEGATIVE PROMPT:
    different person, face change, identity drift, altered facial features, different ethnicity, different age, different makeup, different expression, distorted face, duplicated face, blurry, cartoon, illustration, painting
    
    Output only ONE square collage image.
    `;

    // Debug: Log the payload
    const imagePayload = {
      contents: [
        {
          parts: [
            { text: gridPrompt },
            {
              inline_data: {
                mime_type: photo.type || "image/jpeg",
                data: photoB64.substring(0, 50) + "...[TRUNCATED]", // Log truncation
              },
            },
          ],
        },
      ],
    };
    console.log(
      "🚀 Request Payload (Preview):",
      JSON.stringify(imagePayload, null, 2),
    );

    console.log("🚀 Calling Gemini 2.5 Flash Image for 3x3 Grid...");

    const imageResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // Re-construct body with full data
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: gridPrompt },
                {
                  inline_data: {
                    mime_type: photo.type || "image/jpeg",
                    data: photoB64,
                  },
                },
              ],
            },
          ],
        }),
      },
    );

    let generatedImageB64 = null;

    if (imageResponse.ok) {
      const imageData = await imageResponse.json();
      // Check for inline_data (image) - handle both snake_case and camelCase
      const parts = imageData.candidates?.[0]?.content?.parts || [];
      const imagePart = parts.find((p: any) => p.inline_data || p.inlineData);

      if (imagePart) {
        generatedImageB64 = (imagePart.inline_data || imagePart.inlineData)
          .data;
        console.log("✅ Image generated successfully");
      } else {
        console.warn(
          "❌ No image data found. Full Response:",
          JSON.stringify(imageData, null, 2),
        );
      }
    } else {
      const errorText = await imageResponse.text();
      console.warn(
        "❌ Image generation API failed:",
        imageResponse.status,
        errorText,
      );
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
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
