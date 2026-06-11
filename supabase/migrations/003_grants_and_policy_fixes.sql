-- ============================================================
-- FIX: Explicit GRANTs required for new Supabase projects
-- (enforced by default from May 30 2026)
-- ============================================================

-- profiles
grant select, insert, update on public.profiles to authenticated;
grant select                  on public.profiles to anon;

-- links
grant select, insert, update, delete on public.links to authenticated;
grant select                          on public.links to anon;

-- page_views
grant insert        on public.page_views to anon;
grant select, insert on public.page_views to authenticated;

-- rpc
grant execute on function public.increment_link_click(uuid) to anon, authenticated;


-- ============================================================
-- FIX: Remove redundant / conflicting SELECT policies on profiles
-- ============================================================

-- Drop the three overlapping SELECT policies; replace with two clean ones.
drop policy if exists "Users can read own profile"          on public.profiles;
drop policy if exists "Public profiles are readable by anyone" on public.profiles;
drop policy if exists "Admins can read all profiles"        on public.profiles;

-- Anyone (anon + authenticated) can read all profiles — needed for public pages.
create policy "Profiles are publicly readable"
  on public.profiles for select
  using (true);

-- ============================================================
-- FIX: Admin update policy used a self-join on profiles which
--      causes an infinite recursion. Use JWT claim instead.
-- ============================================================

drop policy if exists "Admins can update all profiles" on public.profiles;

create policy "Admins can update all profiles"
  on public.profiles for update
  using (
    (select role from public.profiles where user_id = auth.uid()) = 'admin'
  );

-- ============================================================
-- FIX: Admin policies on links / page_views had the same
--      self-join recursion risk. Rewrite with subquery alias.
-- ============================================================

drop policy if exists "Admins can read all links"       on public.links;
drop policy if exists "Admins can read all page views"  on public.page_views;

create policy "Admins can read all links"
  on public.links for select
  using (
    (select role from public.profiles where user_id = auth.uid()) = 'admin'
  );

create policy "Admins can read all page views"
  on public.page_views for select
  using (
    (select role from public.profiles where user_id = auth.uid()) = 'admin'
  );
