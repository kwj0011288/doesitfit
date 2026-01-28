import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { corsHeaders } from '../_shared/cors.ts'

const POLAR_ACCESS_TOKEN = Deno.env.get('POLAR_ACCESS_TOKEN')
const POLAR_PRODUCT_ID = Deno.env.get('POLAR_PRODUCT_ID')
const POLAR_SUCCESS_URL = Deno.env.get('POLAR_SUCCESS_URL')

console.log('Create Checkout Function Invoked')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    if (!POLAR_ACCESS_TOKEN || !POLAR_PRODUCT_ID) {
      console.error('Polar config missing')
      return new Response(
        JSON.stringify({ 
          error: 'Payment system not configured. Service is currently free.' 
        }),
        { 
          status: 503,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Determine success URL based on request origin
    // If request comes from localhost, redirect to localhost
    const origin = req.headers.get('origin') || ''
    const isLocal = origin.includes('localhost') || origin.includes('127.0.0.1')
    
    // Default to production URL if env var is set, otherwise fall back to localhost
    let successUrl = POLAR_SUCCESS_URL
    
    if (isLocal) {
      successUrl = 'http://localhost:5173/success?checkout_id={CHECKOUT_ID}'
    } else if (!successUrl) {
       // Fallback for safety
       successUrl = 'https://doesitfit.dev/success?checkout_id={CHECKOUT_ID}'
    }

    // Create Polar checkout
    console.log('Creating Polar checkout with Success URL:', successUrl)
    const response = await fetch('https://api.polar.sh/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${POLAR_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        products: [POLAR_PRODUCT_ID],
        success_url: successUrl,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Polar API Error:', response.status, errorText)
      throw new Error(`Failed to create checkout: ${errorText}`)
    }

    const data = await response.json()
    console.log('Checkout created:', data.url)

    return new Response(
      JSON.stringify({ checkout_url: data.url }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Function Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
