/**
 * API client for Supabase Edge Functions
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321'
const FUNCTIONS_URL = `${SUPABASE_URL}/functions/v1`

export const api = {
  createCheckout: async () => {
    const response = await fetch(`${FUNCTIONS_URL}/create-checkout`, {
      method: 'POST',
    })
    return response
  },

  verifyPurchase: async (checkoutId: string) => {
    const formData = new FormData()
    formData.append('checkout_id', checkoutId)

    const response = await fetch(`${FUNCTIONS_URL}/verify-purchase`, {
      method: 'POST',
      body: formData,
    })
    return response
  },

  generate: async (formData: FormData) => {
    const response = await fetch(`${FUNCTIONS_URL}/generate`, {
      method: 'POST',
      body: formData,
    })
    return response
  },
}
