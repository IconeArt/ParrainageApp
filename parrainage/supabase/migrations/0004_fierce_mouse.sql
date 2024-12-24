/*
  # Configuration du bucket de stockage pour les images de profil

  1. Création
    - Création du bucket profile-images
    - Configuration des permissions publiques
  
  2. Politiques
    - Lecture publique des images
    - Upload pour utilisateurs authentifiés
*/

-- Suppression du bucket existant s'il existe
DO $$
BEGIN
  DELETE FROM storage.buckets WHERE id = 'profile-images';
EXCEPTION WHEN OTHERS THEN
  NULL;
END $$;

-- Création du bucket avec les bons paramètres
INSERT INTO storage.buckets (id, name, public)
VALUES ('profile-images', 'profile-images', true);

-- Politique de lecture publique
CREATE POLICY "Lecture publique des images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-images');

-- Politique d'upload
CREATE POLICY "Upload d'images"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'profile-images');

-- Politique de suppression
CREATE POLICY "Suppression d'images"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'profile-images');