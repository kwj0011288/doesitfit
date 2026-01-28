# Deployment Guide - Supabase Edge Functions

## Prerequisites
1. Supabase CLI installed: `brew install supabase/tap/supabase`
2. Supabase account with project created
3. Environment variables ready

## Step 1: Login to Supabase
```bash
supabase login
```

## Step 2: Link Project
```bash
cd /Users/Files/Project/doesitfit
supabase link --project-ref your-project-ref
```

Get your project ref from: Supabase Dashboard → Settings → General → Reference ID

## Step 3: Set Secrets (Environment Variables)
```bash
# Set Polar access token
supabase secrets set POLAR_ACCESS_TOKEN=your_polar_access_token

# Set Polar product ID
supabase secrets set POLAR_PRODUCT_ID=90cacaa6-a249-43ce-a0fc-a54f025e33a2

# Set success URL
supabase secrets set POLAR_SUCCESS_URL=https://doesitfit.dev/success

# Set Gemini API key
supabase secrets set GEMINI_API_KEY=your_gemini_api_key
```

## Step 4: Deploy Functions
```bash
# Deploy all functions
supabase functions deploy create-checkout
supabase functions deploy verify-purchase
supabase functions deploy generate
```

## Step 5: Verify Deployment
Your functions will be available at:
- `https://your-project.supabase.co/functions/v1/create-checkout`
- `https://your-project.supabase.co/functions/v1/verify-purchase`
- `https://your-project.supabase.co/functions/v1/generate`

## Step 6: Update Frontend Environment
Create `frontend/.env`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_publishable_key
```

## Step 7: Deploy Frontend
Deploy to Vercel/Netlify with:
- Build command: `npm run build`
- Output directory: `dist`
- Environment variables: Copy from `frontend/.env`

## Testing
1. Visit https://doesitfit.dev
2. Click "Buy Access" → Should redirect to Polar
3. Complete payment → Should redirect to /success
4. Try page → Upload photo → Should generate report

## Troubleshooting
- Check function logs: `supabase functions logs generate`
- Test locally: `supabase start` then `supabase functions serve`
- Verify secrets: They should be set in Supabase Dashboard → Edge Functions → Secrets
