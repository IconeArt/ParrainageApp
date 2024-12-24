/*
  # Fix RLS Policies for Participants and Storage

  1. Changes
    - Update RLS policies for participants table
    - Add more granular access control
    - Fix storage bucket policies
  
  2. Security
    - Allow public read access to participants
    - Allow public insert for registration
    - Maintain audit logging
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Lecture publique participants" ON participants;
DROP POLICY IF EXISTS "Insertion participants authentifiés" ON participants;

-- Create new policies for participants table
CREATE POLICY "Allow public read access"
  ON participants FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public registration"
  ON participants FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow users to update own data"
  ON participants FOR UPDATE
  TO public
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- Ensure storage policies are correct
DO $$
BEGIN
  -- Recreate storage policies if they don't exist
  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Read Access' AND table_name = 'objects'
  ) THEN
    CREATE POLICY "Public Read Access"
    ON storage.objects FOR SELECT
    TO public
    USING (bucket_id = 'profile-images');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM storage.policies 
    WHERE name = 'Public Upload Access' AND table_name = 'objects'
  ) THEN
    CREATE POLICY "Public Upload Access"
    ON storage.objects FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'profile-images');
  END IF;
END $$;