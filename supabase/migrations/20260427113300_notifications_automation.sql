create or replace function public.queue_progress_reminders()
returns json
language plpgsql
security definer
set search_path = public
as $$
declare
  v_count integer := 0;
begin
  insert into public.notifications (user_id, title, message, channel, metadata)
  select
    u.id,
    'Continue your learning',
    'You are close to your next reward. Return to MIG Wealth Academy today.',
    'in_app',
    jsonb_build_object('campaign', 'inactivity_3d')
  from public.users u
  where u.is_active = true
    and (u.last_activity_date is null or u.last_activity_date <= current_date - interval '3 day');

  get diagnostics v_count = row_count;
  return json_build_object('queued', v_count);
end;
$$;
