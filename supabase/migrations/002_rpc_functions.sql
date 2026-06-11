-- Increment link click count atomically
create or replace function increment_link_click(link_id uuid)
returns void
language sql
security definer
as $$
  update public.links set click_count = click_count + 1 where id = link_id;
$$;
