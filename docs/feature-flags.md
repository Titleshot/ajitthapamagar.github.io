# Feature Flags and Rollback

Feature flags are environment-driven and can be toggled without code revert.

## Flags

- `VITE_USE_SUPABASE_AUTH`
  - `true`: use Supabase phone OTP login
  - `false`: use local fallback login

- `VITE_ENABLE_SERVER_PROGRESS`
  - `true`: use DB-backed progress write paths (RPC)
  - `false`: local storage mode

- `VITE_ENABLE_ADMIN_ANALYTICS`
  - `true`: use admin analytics views
  - `false`: show mock fallback data

- `VITE_ENABLE_WHATSAPP_AUTOMATION`
  - `true`: enable WhatsApp adapter dispatch
  - `false`: disable external sends

## Rollback Procedure

1. Disable the failing flag.
2. Redeploy environment variables.
3. Confirm fallback flow is healthy via smoke tests.
4. Investigate and patch forward without destructive migrations.
