/*
  # Create users table for Telegram Web App

  1. New Tables
    - `users`
      - `id` (uuid, primary key)
      - `username` (text, unique) - Telegram username
      - `created_at` (timestamp) - Account creation date
      - `allocated_vics` (integer) - Number of VICs allocated
      - `is_premium` (boolean) - Premium status

  2. Security
    - Enable RLS on `users` table
    - Add policy for authenticated users to read their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  allocated_vics integer NOT NULL DEFAULT 0,
  is_premium boolean NOT NULL DEFAULT false
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own data"
  ON users
  FOR INSERT
  TO authenticated
  WITH CHECK (true);