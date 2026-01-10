-- Create the quiz_results table if it doesn't exist
create table if not exists public.quiz_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) not null,
  score integer not null,
  results jsonb not null, -- Stores the granular question answers
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.quiz_results enable row level security;

-- Policy: Users can insert their own results
create policy "Users can insert their own results"
  on public.quiz_results for insert
  with check (auth.uid() = user_id);

-- Policy: Users can view their own results
create policy "Users can view their own results"
  on public.quiz_results for select
  using (auth.uid() = user_id);

-- Policy: Admins/Service Role can view all (optional, for dashboarding later)
-- create policy "Service role can view all"
--   on public.quiz_results for select
--   using (auth.role() = 'service_role');
