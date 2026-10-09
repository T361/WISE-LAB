insert into storage.buckets (id, name, public)
values ('happenings-images', 'happenings-images', true)
on conflict (id) do nothing;

-- Allow anyone to read (view) images (public bucket)
drop policy if exists "happenings-images: public read" on storage.objects;
create policy "happenings-images: public read"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'happenings-images');

-- Allow admins to upload
drop policy if exists "happenings-images: admin write" on storage.objects;
create policy "happenings-images: admin write"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'happenings-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );

-- Allow admins to update
drop policy if exists "happenings-images: admin update" on storage.objects;
create policy "happenings-images: admin update"
  on storage.objects for update
  to authenticated
  using (
    bucket_id = 'happenings-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );

-- Allow admins to delete
drop policy if exists "happenings-images: admin delete" on storage.objects;
create policy "happenings-images: admin delete"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'happenings-images'
    and exists (select 1 from public.admin_profiles where id = auth.uid())
  );
