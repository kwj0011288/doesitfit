/**
 * API client for Supabase Edge Functions
 */

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://glafafbiazbewfjhmbes.supabase.co";
const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`;

if (!import.meta.env.VITE_SUPABASE_URL) {
  console.warn(
    "⚠️ VITE_SUPABASE_URL not found in env, using fallback:",
    SUPABASE_URL,
  );
}

console.log("API Client Initialized");
console.log("VITE_SUPABASE_URL:", SUPABASE_URL);
console.log("FUNCTIONS_URL:", FUNCTIONS_URL);

export const api = {
  createCheckout: async () => {
    const url = `${FUNCTIONS_URL}/create-checkout`;
    console.log("Creating checkout via:", url);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      });

      if (!response.ok) {
        console.error("API Error:", response.status, await response.text());
      }

      return response;
    } catch (error) {
      console.error("Network/Fetch Error:", error);
      throw error; // Let TryPage handle it
    }
  },

  verifyPurchase: async (checkoutId: string) => {
    const url = `${FUNCTIONS_URL}/verify-purchase`;
    console.log("Verifying purchase:", url);

    const formData = new FormData();
    formData.append("checkout_id", checkoutId);

    return fetch(url, {
      method: "POST",
      body: formData,
    });
  },

  generate: async (formData: FormData) => {
    const url = `${FUNCTIONS_URL}/generate`;
    console.log("Generating report:", url);

    return fetch(url, {
      method: "POST",
      body: formData,
    });
  },
};
