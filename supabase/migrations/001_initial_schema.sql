-- Profiles: one per auth user
create table public.profiles (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null unique references auth.users(id) on delete cascade,
  username    text not null unique,
  phone       text,
  bg_color    text not null default '#0A0A0A',
  brand_color text not null default '#C9A84C',
  role        text not null default 'user' check (role in ('user', 'admin')),
  is_active   boolean not null default true,
  created_at  timestamptz not null default now()
);

-- Links: each user's affiliate links
create table public.links (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references auth.users(id) on delete cascade,
  title       text not null,
  url         text not null,
  is_active   boolean not null default true,
  sort_order  int not null default 0,
  click_count int not null default 0,
  created_at  timestamptz not null default now()
);

-- Page views: one row per visit to a public profile
create table public.page_views (
  id         uuid primary key default gen_random_uuid(),
  username   text not null,
  viewed_at  timestamptz not null default now()
);

-- Indexes
create index on public.links(user_id);
create index on public.page_views(username);
create index on public.page_views(viewed_at);

-- ============================================================
-- GRANTs (required for new Supabase projects after 2026-05-30)
-- ============================================================

grant select, insert, update on public.profiles to authenticated;
grant select                  on public.profiles to anon;

grant select, insert, update, delete on public.links to authenticated;
grant select                          on public.links to anon;

grant insert         on public.page_views to anon;
grant select, insert on public.page_views to authenticated;

-- ============================================================
-- RLS
-- ============================================================

alter table public.profiles   enable row level security;
alter table public.links       enable row level security;
alter table public.page_views  enable row level security;

-- profiles: anyone can read (needed for public profile pages)
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

-- profiles: users manage only their own row
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = user_id);

-- profiles: admins can update any row (role stored in same table — use subquery to avoid recursion)
create policy "Admins can update all profiles"
  on public.profiles for update
  using (
    (select role from public.profiles where user_id = auth.uid()) = 'admin'
  );

-- links: owners have full control
create policy "Users can manage own links"
  on public.links for all
  using  (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- links: public can read active links (for the public profile page)
create policy "Anyone can read active links"
  on public.links for select
  using (is_active = true);

-- links: admins can read all
create policy "Admins can read all links"
  on public.links for select
  using (
    (select role from public.profiles where user_id = auth.uid()) = 'admin'
  );

-- page_views: anyone can insert (public page loads — anon visitors too)
create policy "Anyone can insert page views"
  on public.page_views for insert
  with check (true);

-- page_views: users can read their own page's views
create policy "Users can read own page views"
  on public.page_views for select
  using (
    exists (
      select 1 from public.profiles p
      where p.user_id = auth.uid() and p.username = page_views.username
    )
  );

-- page_views: admins can read all
create policy "Admins can read all page views"
  on public.page_views for select
  using (
    (select role from public.profiles where user_id = auth.uid()) = 'admin'
  );
