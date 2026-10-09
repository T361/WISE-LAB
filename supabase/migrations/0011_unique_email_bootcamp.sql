-- Add unique constraint to the email column in the bootcamp_applications table
-- This prevents duplicate applications for the same email address at the database level.
ALTER TABLE public.bootcamp_applications 
  ADD CONSTRAINT unique_email UNIQUE (email);
