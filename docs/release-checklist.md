# Release Checklist

## Security
- Confirm `service_role` keys are not exposed in frontend envs.
- Validate RLS on all public tables.
- Validate OTP rate limiting and resend cooldown behavior.

## Functional Smoke
- Signup/login with OTP
- Lesson completion and unlock
- Quiz submit and point update
- Reward claim pending flow
- Admin analytics pages load

## Reliability
- Run load tests in staging.
- Check Supabase query latency and error rates.
- Verify notification queue and campaign dispatch.

## Rollout
- Deploy to preview and verify.
- Promote to production.
- Monitor for 30 minutes and rollback flags if errors spike.
