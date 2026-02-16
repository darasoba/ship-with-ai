-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  cohort text,
  project text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on user signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Applications table
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  full_name text not null,
  email text not null,
  twitter_handle text,
  portfolio_url text,
  github_url text,
  linkedin_url text,
  location text not null,
  current_role text not null,
  role_other text,
  coding_comfort text not null,
  technologies text[] not null default '{}',
  ai_tools_experience text not null,
  ai_tools_projects text,
  deployment_experience text not null,
  project_description text not null,
  project_type text not null,
  project_audience text not null,
  project_mvp text not null,
  project_started text not null,
  tech_stack text,
  preferred_ai_tool text not null,
  primary_goal text not null,
  weekly_hours text not null,
  live_session_availability text not null,
  referral_source text not null,
  referral_name text,
  additional_info text,
  commitments_agreed boolean not null default false,
  status text not null default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.applications enable row level security;

-- Public can insert applications
create policy "Anyone can submit an application"
  on public.applications for insert
  with check (true);

-- Invite tokens table
create table public.invite_tokens (
  id uuid default gen_random_uuid() primary key,
  token text unique not null,
  email text not null,
  application_id uuid references public.applications(id),
  used boolean not null default false,
  cohort text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  expires_at timestamp with time zone not null
);

alter table public.invite_tokens enable row level security;

-- Public can read tokens (for validation during signup)
create policy "Anyone can validate a token"
  on public.invite_tokens for select
  using (true);

-- Progress table
create table public.progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  week integer not null check (week >= 1 and week <= 4),
  milestone_index integer not null,
  completed boolean not null default false,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, week, milestone_index)
);

alter table public.progress enable row level security;

create policy "Users can view their own progress"
  on public.progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own progress"
  on public.progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own progress"
  on public.progress for update
  using (auth.uid() = user_id);

-- Reading progress table
create table public.reading_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  material_slug text not null,
  heading_id text,
  scroll_position float default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, material_slug)
);

alter table public.reading_progress enable row level security;

create policy "Users can view their own reading progress"
  on public.reading_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert their own reading progress"
  on public.reading_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reading progress"
  on public.reading_progress for update
  using (auth.uid() = user_id);
