-- Tahan Group website: database for the /admin dashboard.
-- Run once in Supabase: SQL Editor -> New query -> paste all of this -> Run.
-- Before running, change OWNER@EXAMPLE.COM (bottom of the file) to the owner's login email.
-- Safe to run again: it only creates what is missing.

-- 1. The site's edited content (one row, id = 'main')
create table if not exists public.site_content (
  id text primary key,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by text
);

-- 2. Every saved version, so any change can be undone from /admin -> History
create table if not exists public.site_content_history (
  id bigint generated always as identity primary key,
  content_id text not null,
  data jsonb not null,
  saved_at timestamptz not null default now(),
  saved_by text
);
create index if not exists site_content_history_saved_at on public.site_content_history (saved_at desc);

-- 3. Who may edit: emails listed here (the login itself is a Supabase Auth user)
create table if not exists public.site_admins (
  email text primary key
);

-- true when the logged-in user's email is in site_admins
create or replace function public.is_site_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.site_admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;
revoke all on function public.is_site_admin() from public;
grant execute on function public.is_site_admin() to authenticated;

-- stamp each save and copy it into the history
create or replace function public.site_content_log()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  new.updated_at := now();
  new.updated_by := auth.jwt() ->> 'email';
  insert into public.site_content_history (content_id, data, saved_by)
  values (new.id, new.data, new.updated_by);
  return new;
end;
$$;
drop trigger if exists site_content_log on public.site_content;
create trigger site_content_log
  before insert or update on public.site_content
  for each row execute function public.site_content_log();

-- Row Level Security: visitors can only read; only listed admins can write
alter table public.site_content enable row level security;
alter table public.site_content_history enable row level security;
alter table public.site_admins enable row level security; -- no policies: nobody reads it from outside

drop policy if exists "anyone reads site content" on public.site_content;
create policy "anyone reads site content" on public.site_content
  for select to anon, authenticated using (true);

drop policy if exists "admins insert site content" on public.site_content;
create policy "admins insert site content" on public.site_content
  for insert to authenticated with check (public.is_site_admin());

drop policy if exists "admins update site content" on public.site_content;
create policy "admins update site content" on public.site_content
  for update to authenticated using (public.is_site_admin()) with check (public.is_site_admin());

drop policy if exists "admins read history" on public.site_content_history;
create policy "admins read history" on public.site_content_history
  for select to authenticated using (public.is_site_admin());

revoke all on public.site_content, public.site_content_history, public.site_admins from anon, authenticated;
grant select on public.site_content to anon, authenticated;
grant insert, update on public.site_content to authenticated;
grant select on public.site_content_history to authenticated;

insert into public.site_content (id, data) values ('main', '{}'::jsonb)
on conflict (id) do nothing;

-- 4. Photo storage: anyone can view, only admins can upload, replace or delete
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site', 'site', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "admins upload site photos" on storage.objects;
create policy "admins upload site photos" on storage.objects
  for insert to authenticated with check (bucket_id = 'site' and public.is_site_admin());

drop policy if exists "admins update site photos" on storage.objects;
create policy "admins update site photos" on storage.objects
  for update to authenticated using (bucket_id = 'site' and public.is_site_admin());

drop policy if exists "admins delete site photos" on storage.objects;
create policy "admins delete site photos" on storage.objects
  for delete to authenticated using (bucket_id = 'site' and public.is_site_admin());

-- 5. The owner's email (must match the user you create in Authentication -> Users)
insert into public.site_admins (email) values (lower('OWNER@EXAMPLE.COM'))
on conflict (email) do nothing;
