import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SUPABASE_ANON_KEY = Deno.env.get('SUPABASE_ANON_KEY')!

console.log('Verify Purchase Function Invoked')

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const checkoutId = formData.get('checkout_id') as string

    console.log('Verifying checkout_id:', checkoutId)

    if (!checkoutId) {
      return new Response(
        JSON.stringify({ error: 'checkout_id is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    // Create Supabase client
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

    // Insert purchase record
    const { error } = await supabase
      .from('purchases')
      .insert({
        checkout_id: checkoutId,
        used: false,
      })

    if (error) {
      // Check if duplicate (already exists) - this is fine, idempotent
      if (error.code === '23505') { // unique_violation
        console.log('Purchase already recorded')
        return new Response(
            JSON.stringify({ success: true, message: 'Already recorded' }),
            {
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            }
          )
      }

      console.error('Supabase insert error:', error)
      return new Response(
        JSON.stringify({ error: 'Failed to record purchase' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      )
    }

    console.log('Purchase recorded successfully')

    return new Response(
      JSON.stringify({ success: true, checkout_id: checkoutId }),
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
