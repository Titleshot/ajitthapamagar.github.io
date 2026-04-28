# Deployment and Operations Runbook

## 1) Frontend Deployment (Vercel)

1. Import repository into Vercel.
2. Set build command to `npm run build`.
3. Set output directory to `dist`.
4. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_USE_SUPABASE_AUTH`
   - `VITE_ENABLE_SERVER_PROGRESS`
   - `VITE_ENABLE_ADMIN_ANALYTICS`
   - `VITE_ENABLE_WHATSAPP_AUTOMATION`
5. Enable preview deployments on pull requests.

## 2) Supabase Operations

1. Apply migrations in order from `supabase/migrations`.
2. Configure auth SMS provider and OTP rate limits.
3. Set backups and PITR retention.
4. Review advisors regularly:
   - Indexes
   - RLS policy correctness
   - Query performance hotspots

## 3) Cloudflare Edge Security

1. Point DNS to Vercel.
2. Enable WAF managed rules.
3. Add bot management and rate-limit rules for `/login` and auth endpoints.
4. Enforce HTTPS redirect.

## 4) Monitoring and Release Gates

Before each production release:

1. `npm run build`
2. `npm run smoke:test` against preview URL
3. Validate login, quiz submit, reward claim, admin analytics
4. Confirm RLS policies still enforce user isolation
5. Verify no secret keys are exposed in frontend bundle

## 5) Load Testing

- OTP/login baseline: `npm run load:test:otp`
- Quiz concurrency baseline: `npm run load:test:quiz`

Run against staging first. Promote to production only after thresholds pass.
