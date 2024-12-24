/*
  # Fix Registration RLS Policies

  1. Changes
    - Update RLS policies for participants table to allow public registration
    - Simplify policy structure
  
  2. Security
    - Enable public registration without authentication
    - Maintain read access
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Allow public read access" ON participants;
DROP POLICY IF EXISTS "Allow public registration" ON participants;
DROP POLICY IF EXISTS "Allow users to update own data" ON participants;

-- Create simplified policies
CREATE POLICY "Enable read access for all users"
ON participants FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert access for registration"
ON participants FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Enable update for users"
ON participants FOR UPDATE
TO public
USING (true)
WITH CHECK (true);