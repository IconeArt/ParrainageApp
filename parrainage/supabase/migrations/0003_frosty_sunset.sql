/*
  # Structure de base de données pour le système de parrainage

  1. Tables
    - participants: stocke les informations des parrains et filleuls
    - parrainages: gère les relations entre parrains et filleuls
    - audit_logs: trace les actions importantes

  2. Sécurité
    - RLS activé sur toutes les tables
    - Politiques d'accès public en lecture
    - Politiques d'insertion pour les utilisateurs authentifiés

  3. Fonctions
    - trigger_set_timestamp: met à jour automatiquement updated_at
    - create_parrainage: fonction sécurisée pour créer des parrainages
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Fonction pour updated_at automatique
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Table des participants
CREATE TABLE IF NOT EXISTS participants (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text UNIQUE NOT NULL,
  image_url text NOT NULL,
  status text NOT NULL CHECK (status IN ('parrain', 'filleul')),
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Trigger pour updated_at
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON participants
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Table des parrainages
CREATE TABLE IF NOT EXISTS parrainages (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  parrain_id uuid REFERENCES participants(id) NOT NULL,
  filleul_id uuid REFERENCES participants(id) NOT NULL,
  status text DEFAULT 'actif' CHECK (status IN ('actif', 'terminé')),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  UNIQUE(parrain_id, filleul_id)
);

-- Trigger pour updated_at
CREATE TRIGGER set_timestamp
BEFORE UPDATE ON parrainages
FOR EACH ROW
EXECUTE FUNCTION trigger_set_timestamp();

-- Table d'audit
CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  action text NOT NULL,
  old_data jsonb,
  new_data jsonb,
  created_at timestamptz DEFAULT NOW()
);

-- Activer RLS
ALTER TABLE participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE parrainages ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- Politiques RLS pour participants
CREATE POLICY "Lecture publique participants"
  ON participants FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Insertion participants authentifiés"
  ON participants FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Politiques RLS pour parrainages
CREATE POLICY "Lecture publique parrainages"
  ON parrainages FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Insertion parrainages authentifiés"
  ON parrainages FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Fonction pour créer un parrainage
CREATE OR REPLACE FUNCTION create_parrainage(
  p_parrain_id uuid,
  p_filleul_id uuid
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_parrain_status text;
  v_filleul_status text;
  v_parrainage_id uuid;
BEGIN
  -- Vérifier les statuts
  SELECT status INTO v_parrain_status FROM participants WHERE id = p_parrain_id;
  SELECT status INTO v_filleul_status FROM participants WHERE id = p_filleul_id;
  
  IF v_parrain_status != 'parrain' THEN
    RAISE EXCEPTION 'Le parrain sélectionné n''a pas le statut parrain';
  END IF;
  
  IF v_filleul_status != 'filleul' THEN
    RAISE EXCEPTION 'Le filleul sélectionné n''a pas le statut filleul';
  END IF;
  
  -- Créer le parrainage
  INSERT INTO parrainages (parrain_id, filleul_id)
  VALUES (p_parrain_id, p_filleul_id)
  RETURNING id INTO v_parrainage_id;
  
  RETURN v_parrainage_id;
END;
$$;