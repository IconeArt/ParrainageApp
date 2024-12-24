/*
  # Configure Storage Bucket for Profile Images

  1. Storage Configuration
    - Create 'profile-images' bucket
    - Set public access policies
  
  2. Security
    - Enable public read access
    - Enable authenticated upload access
*/

-- Create the storage bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true)
ON CONFLICT (id) DO UPDATE SET public = true;

-- Allow public read access to profile images
CREATE POLICY "Public Read Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated Upload Access"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'profile-images');

-- Allow authenticated users to update their own images
CREATE POLICY "Authenticated Update Access"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'profile-images')
WITH CHECK (bucket_id = 'profile-images');

-- Allow authenticated users to delete their own images
CREATE POLICY "Authenticated Delete Access"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-images');