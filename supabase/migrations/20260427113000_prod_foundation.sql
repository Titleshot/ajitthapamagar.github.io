-- MIG Wealth Academy production foundation
create extension if not exists pgcrypto;

-- Core profile and access registry
create table if not exists public.approved_members (
  id uuid primary key default gen_random_uuid(),
  member_id text not null unique,
  phone text not null unique,
  full_name text,
  district text,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text not null unique,
  member_id text not null unique,
  district text not null,
  age_group text,
  gender text,
  role text not null default 'member' check (role in ('member', 'admin')),
  total_points integer not null default 0,
  financial_score integer not null default 0,
  current_level text not null default 'Beginner',
  streak_count integer not null default 0,
  last_activity_date date,
  last_login timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lessons (
  id text primary key,
  chapter_number integer not null unique,
  title text not null,
  slug text not null unique,
  description text not null,
  goal text not null,
  content text not null,
  key_takeaways text[] not null default '{}',
  real_life_example text not null,
  estimated_minutes integer not null check (estimated_minutes > 0),
  video_url text,
  points_reward integer not null default 20,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.quizzes (
  id uuid primary key default gen_random_uuid(),
  lesson_id text not null references public.lessons (id) on delete cascade,
  question text not null,
  option_a text not null,
  option_b text not null,
  option_c text not null,
  option_d text not null,
  correct_option text not null check (correct_option in ('A', 'B', 'C', 'D')),
  explanation text,
  created_at timestamptz not null default now()
);

create table if not exists public.user_lesson_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  lesson_id text not null references public.lessons (id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  points_earned integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, lesson_id)
);

create table if not exists public.quiz_attempts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  lesson_id text not null references public.lessons (id) on delete cascade,
  score integer not null check (score >= 0 and score <= 100),
  total_questions integer not null check (total_questions > 0),
  correct_answers integer not null check (correct_answers >= 0),
  passed boolean not null,
  points_earned integer not null,
  attempt_number integer not null,
  time_taken integer,
  device_type text,
  ip_address inet,
  created_at timestamptz not null default now()
);

create table if not exists public.badges (
  id text primary key,
  name text not null unique,
  description text not null,
  icon text,
  required_points integer not null,
  required_lessons integer not null,
  created_at timestamptz not null default now()
);

create table if not exists public.user_badges (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  badge_id text not null references public.badges (id) on delete cascade,
  awarded_at timestamptz not null default now(),
  unique (user_id, badge_id)
);

create table if not exists public.rewards (
  id text primary key,
  title text not null,
  description text not null,
  reward_type text not null,
  required_points integer not null,
  required_lessons integer not null,
  requires_all_quizzes_passed boolean not null default false,
  max_winners integer,
  is_active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reward_claims (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  reward_id text not null references public.rewards (id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected', 'paid')),
  approved_by uuid references public.users (id),
  claimed_at timestamptz not null default now(),
  approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  action text not null check (action in ('lesson_started', 'lesson_completed', 'quiz_passed', 'challenge_submitted', 'reward_claimed', 'login')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  title text not null,
  message text not null,
  channel text not null default 'in_app' check (channel in ('in_app', 'whatsapp')),
  is_read boolean not null default false,
  delivery_status text not null default 'queued' check (delivery_status in ('queued', 'sent', 'failed')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

-- Performance indexes
create index if not exists idx_lessons_active on public.lessons (is_active, chapter_number);
create index if not exists idx_quizzes_lesson on public.quizzes (lesson_id);
create index if not exists idx_progress_user on public.user_lesson_progress (user_id, updated_at desc);
create index if not exists idx_progress_lesson_status on public.user_lesson_progress (lesson_id, status);
create index if not exists idx_attempts_user_created on public.quiz_attempts (user_id, created_at desc);
create index if not exists idx_attempts_lesson_pass on public.quiz_attempts (lesson_id, passed);
create index if not exists idx_activity_user_created on public.activity_logs (user_id, created_at desc);
create index if not exists idx_notifications_user_created on public.notifications (user_id, created_at desc);
create index if not exists idx_notifications_unread on public.notifications (user_id, created_at desc) where is_read = false;
create index if not exists idx_reward_claims_pending on public.reward_claims (created_at desc) where status = 'pending';

-- Keep updated_at fields fresh
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_users_touch on public.users;
create trigger trg_users_touch
before update on public.users
for each row execute function public.touch_updated_at();

drop trigger if exists trg_lessons_touch on public.lessons;
create trigger trg_lessons_touch
before update on public.lessons
for each row execute function public.touch_updated_at();

drop trigger if exists trg_progress_touch on public.user_lesson_progress;
create trigger trg_progress_touch
before update on public.user_lesson_progress
for each row execute function public.touch_updated_at();

-- Helper score functions
create or replace function public.calculate_quiz_points(score_percent integer)
returns integer
language sql
stable
as $$
  select case
    when score_percent >= 100 then 100
    when score_percent >= 80 then 80
    when score_percent >= 70 then 60
    else 20
  end
$$;

create or replace function public.calculate_financial_score(
  quiz_average numeric,
  completion_rate numeric,
  streak_score numeric,
  challenge_score numeric
)
returns integer
language sql
stable
as $$
  select greatest(
    0,
    least(
      100,
      round((coalesce(quiz_average, 0) * 0.4) + (coalesce(completion_rate, 0) * 0.3) + (coalesce(streak_score, 0) * 0.2) + (coalesce(challenge_score, 0) * 0.1))
    )
  )::integer
$$;

-- Main transactional writes
create or replace function public.submit_quiz_attempt(
  p_lesson_id text,
  p_score integer,
  p_total_questions integer,
  p_correct_answers integer,
  p_time_taken integer default null,
  p_device_type text default null
)
returns table (
  passed boolean,
  points_earned integer,
  attempt_number integer,
  total_points integer,
  financial_score integer
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_attempt_number integer;
  v_points integer;
  v_passed boolean := p_score >= 70;
  v_quiz_avg numeric;
  v_completion_rate numeric;
  v_streak_score numeric;
  v_financial integer;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select coalesce(max(attempt_number), 0) + 1
  into v_attempt_number
  from public.quiz_attempts
  where user_id = v_user_id and lesson_id = p_lesson_id;

  v_points := public.calculate_quiz_points(p_score);

  insert into public.quiz_attempts (
    user_id, lesson_id, score, total_questions, correct_answers, passed, points_earned, attempt_number, time_taken, device_type
  ) values (
    v_user_id, p_lesson_id, p_score, p_total_questions, p_correct_answers, v_passed, v_points, v_attempt_number, p_time_taken, p_device_type
  );

  insert into public.activity_logs (user_id, action, metadata)
  values (v_user_id, case when v_passed then 'quiz_passed' else 'lesson_started' end, jsonb_build_object('lesson_id', p_lesson_id, 'score', p_score));

  if v_passed then
    insert into public.user_lesson_progress (user_id, lesson_id, status, completed_at, points_earned)
    values (v_user_id, p_lesson_id, 'completed', now(), 20)
    on conflict (user_id, lesson_id)
    do update set status = 'completed', completed_at = now(), points_earned = excluded.points_earned;
  end if;

  update public.users
  set total_points = total_points + v_points,
      last_activity_date = current_date
  where id = v_user_id;

  select coalesce(avg(score), 0) into v_quiz_avg from public.quiz_attempts where user_id = v_user_id and passed = true;
  select (count(*)::numeric / nullif((select count(*) from public.lessons where is_active), 0)) * 100
    into v_completion_rate
    from public.user_lesson_progress
    where user_id = v_user_id and status = 'completed';
  select least(streak_count * 15, 100) into v_streak_score from public.users where id = v_user_id;

  v_financial := public.calculate_financial_score(v_quiz_avg, coalesce(v_completion_rate, 0), coalesce(v_streak_score, 0), 50);

  update public.users set financial_score = v_financial where id = v_user_id;

  return query
  select v_passed, v_points, v_attempt_number, u.total_points, u.financial_score
  from public.users u
  where u.id = v_user_id;
end;
$$;

create or replace function public.mark_lesson_complete(p_lesson_id text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  insert into public.user_lesson_progress (user_id, lesson_id, status, completed_at, points_earned)
  values (v_user_id, p_lesson_id, 'completed', now(), 20)
  on conflict (user_id, lesson_id)
  do update set status = 'completed', completed_at = now(), points_earned = excluded.points_earned;

  update public.users
  set total_points = total_points + 20,
      last_activity_date = current_date
  where id = v_user_id;

  insert into public.activity_logs (user_id, action, metadata)
  values (v_user_id, 'lesson_completed', jsonb_build_object('lesson_id', p_lesson_id));
end;
$$;

create or replace function public.claim_reward(p_reward_id text)
returns text
language plpgsql
security definer
set search_path = public
as $$
declare
  v_user_id uuid := auth.uid();
  v_reward record;
  v_completed integer;
  v_all_lessons integer;
  v_all_quizzes_passed boolean;
  v_points integer;
begin
  if v_user_id is null then
    raise exception 'Not authenticated';
  end if;

  select * into v_reward from public.rewards where id = p_reward_id and is_active = true;
  if not found then
    raise exception 'Reward not found';
  end if;

  select count(*) into v_completed
  from public.user_lesson_progress
  where user_id = v_user_id and status = 'completed';

  select count(*) into v_all_lessons from public.lessons where is_active = true;
  select total_points into v_points from public.users where id = v_user_id;

  select count(*) = v_all_lessons into v_all_quizzes_passed
  from (
    select distinct lesson_id from public.quiz_attempts where user_id = v_user_id and passed = true
  ) t;

  if v_completed < v_reward.required_lessons then
    raise exception 'Not enough completed lessons';
  end if;
  if v_points < v_reward.required_points then
    raise exception 'Not enough points';
  end if;
  if v_reward.requires_all_quizzes_passed and not v_all_quizzes_passed then
    raise exception 'All quizzes must be passed';
  end if;

  insert into public.reward_claims (user_id, reward_id, status)
  values (v_user_id, p_reward_id, 'pending');

  insert into public.activity_logs (user_id, action, metadata)
  values (v_user_id, 'reward_claimed', jsonb_build_object('reward_id', p_reward_id));

  return 'pending';
end;
$$;

-- Admin analytics views (security invoker)
create or replace view public.admin_user_overview with (security_invoker = true) as
select
  count(*)::bigint as total_users,
  count(*) filter (where last_activity_date >= current_date - interval '7 day')::bigint as active_users_7d,
  round(
    (
      count(*) filter (where exists (
        select 1 from public.user_lesson_progress ulp where ulp.user_id = users.id and ulp.status = 'completed'
      ))::numeric
      / nullif(count(*)::numeric, 0)
    ) * 100,
    2
  ) as completion_rate_pct
from public.users;

create or replace view public.admin_dropoff_funnel with (security_invoker = true) as
select
  l.chapter_number,
  l.title,
  count(distinct ulp.user_id)::bigint as completed_users
from public.lessons l
left join public.user_lesson_progress ulp on ulp.lesson_id = l.id and ulp.status = 'completed'
group by l.chapter_number, l.title
order by l.chapter_number;

create or replace view public.admin_quiz_analytics with (security_invoker = true) as
select
  l.id as lesson_id,
  l.title,
  count(qa.id)::bigint as attempts,
  round(avg(qa.score)::numeric, 2) as avg_score,
  round((count(*) filter (where qa.passed))::numeric / nullif(count(*), 0) * 100, 2) as pass_rate_pct
from public.lessons l
left join public.quiz_attempts qa on qa.lesson_id = l.id
group by l.id, l.title;

create or replace view public.admin_hardest_questions with (security_invoker = true) as
select
  q.id as quiz_id,
  l.title as lesson_title,
  q.question,
  count(qa.id)::bigint as attempts,
  round((count(*) filter (where qa.passed = false))::numeric / nullif(count(*), 0) * 100, 2) as fail_rate_pct
from public.quizzes q
join public.lessons l on l.id = q.lesson_id
left join public.quiz_attempts qa on qa.lesson_id = q.lesson_id
group by q.id, l.title, q.question
having count(qa.id) > 0
order by fail_rate_pct desc;

-- RLS baseline
alter table public.approved_members enable row level security;
alter table public.users enable row level security;
alter table public.lessons enable row level security;
alter table public.quizzes enable row level security;
alter table public.user_lesson_progress enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.badges enable row level security;
alter table public.user_badges enable row level security;
alter table public.rewards enable row level security;
alter table public.reward_claims enable row level security;
alter table public.activity_logs enable row level security;
alter table public.notifications enable row level security;

-- Public read-only course data
drop policy if exists lessons_public_read on public.lessons;
create policy lessons_public_read on public.lessons for select using (is_active = true);
drop policy if exists quizzes_public_read on public.quizzes;
create policy quizzes_public_read on public.quizzes for select using (true);
drop policy if exists badges_public_read on public.badges;
create policy badges_public_read on public.badges for select using (true);
drop policy if exists rewards_public_read on public.rewards;
create policy rewards_public_read on public.rewards for select using (is_active = true);

-- Profile/member and user-owned tables
drop policy if exists users_self_read on public.users;
create policy users_self_read on public.users for select using (id = auth.uid());
drop policy if exists users_self_update on public.users;
create policy users_self_update on public.users for update using (id = auth.uid()) with check (id = auth.uid());
drop policy if exists users_self_insert on public.users;
create policy users_self_insert on public.users for insert with check (id = auth.uid());

drop policy if exists approved_members_auth_read on public.approved_members;
create policy approved_members_auth_read on public.approved_members
for select using (
  exists (
    select 1 from auth.users au
    where au.id = auth.uid()
      and au.phone = approved_members.phone
      and approved_members.is_active = true
  )
);

drop policy if exists progress_self_rw on public.user_lesson_progress;
create policy progress_self_rw on public.user_lesson_progress for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists attempts_self_rw on public.quiz_attempts;
create policy attempts_self_rw on public.quiz_attempts for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists user_badges_self_read on public.user_badges;
create policy user_badges_self_read on public.user_badges for select using (user_id = auth.uid());

drop policy if exists reward_claims_self_rw on public.reward_claims;
create policy reward_claims_self_rw on public.reward_claims for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

drop policy if exists activity_logs_self_read on public.activity_logs;
create policy activity_logs_self_read on public.activity_logs for select using (user_id = auth.uid());
drop policy if exists activity_logs_self_insert on public.activity_logs;
create policy activity_logs_self_insert on public.activity_logs for insert with check (user_id = auth.uid());

drop policy if exists notifications_self_rw on public.notifications;
create policy notifications_self_rw on public.notifications for all
using (user_id = auth.uid())
with check (user_id = auth.uid());

-- Admin read policies based on profile role
drop policy if exists users_admin_read on public.users;
create policy users_admin_read on public.users
for select using (
  exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

drop policy if exists reward_claims_admin_read on public.reward_claims;
create policy reward_claims_admin_read on public.reward_claims
for select using (
  exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

drop policy if exists activity_logs_admin_read on public.activity_logs;
create policy activity_logs_admin_read on public.activity_logs
for select using (
  exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

drop policy if exists notifications_admin_read on public.notifications;
create policy notifications_admin_read on public.notifications
for select using (
  exists (select 1 from public.users u where u.id = auth.uid() and u.role = 'admin')
);

-- Seed reward and badge tiers for app logic
insert into public.badges (id, name, description, icon, required_points, required_lessons)
values
  ('badge-starter', 'Bronze Learner', 'Complete 3 chapters and reach 200 points.', 'medal', 200, 3),
  ('badge-silver', 'Silver Learner', 'Complete 6 chapters and reach 500 points.', 'award', 500, 6),
  ('badge-gold', 'Gold Financial Champion', 'Complete all 10 chapters and pass every quiz.', 'trophy', 800, 10)
on conflict (id) do update set
  name = excluded.name,
  description = excluded.description,
  icon = excluded.icon,
  required_points = excluded.required_points,
  required_lessons = excluded.required_lessons;

insert into public.rewards (id, title, description, reward_type, required_points, required_lessons, requires_all_quizzes_passed, max_winners)
values
  ('bronze', 'Bronze Learner', 'Badge plus community recognition for early momentum.', 'recognition', 200, 3, false, null),
  ('silver', 'Silver Learner', 'Digital certificate for strong mid-program progress.', 'certificate', 500, 6, false, null),
  ('gold', 'Gold Financial Champion', 'Certificate plus eligibility for MIG rewards when you finish all chapters and quizzes.', 'grand_prize', 800, 10, true, null),
  ('top100', 'Top 100 Members', 'Special recognition, gifts, or opportunities for top learners.', 'top100', 1200, 10, true, 100)
on conflict (id) do update set
  title = excluded.title,
  description = excluded.description,
  reward_type = excluded.reward_type,
  required_points = excluded.required_points,
  required_lessons = excluded.required_lessons,
  requires_all_quizzes_passed = excluded.requires_all_quizzes_passed,
  max_winners = excluded.max_winners;
