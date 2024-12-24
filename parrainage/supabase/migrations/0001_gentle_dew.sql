/*
  # Initial Schema Setup

  1. New Tables
    - `participants`
      - `id` (uuid, primary key)
      - `first_name` (text)
      - `last_name` (text)
      - `email` (text, unique)
      - `image_url` (text)
      - `status` (text: 'parrain' or 'filleul')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `parrains_filleuls`
      - `id` (uuid, primary key)
      - `parrain_id` (uuid, foreign key)
      - `filleul_id` (uuid, foreign key)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create participants table
CREATE TABLE participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('parrain', 'filleul')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create parrains_filleuls table
CREATE TABLE parrains_filleuls (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  parrain_id uuid REFERENCES participants(id) NOT NULL,
  filleul_id uuid REFERENCES participants(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(parrain_id, filleul_id)
);

-- Enable RLS
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE parrains_filleuls ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to participants"
  ON participants
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public read access to parrains_filleuls"
  ON parrains_filleuls
  FOR SELECT
  TO public
  USING (true);

-- Create storage bucket for profile images
INSERT INTO storage.buckets (id, name)
VALUES ('profile-images', 'profile-images')
ON CONFLICT DO NOTHING;

-- Enable public access to profile images
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'profile-images');

CREATE POLICY "Public Upload"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'profile-images');