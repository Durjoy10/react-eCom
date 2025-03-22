/*
  # Create products table and security policies

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `price` (numeric)
      - `category` (text)
      - `tags` (text array)
      - `image_url` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on products table
    - Add policies for:
      - Public read access
      - Authenticated admin users can manage products
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric NOT NULL CHECK (price >= 0),
  category text NOT NULL,
  tags text[] DEFAULT '{}',
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Allow public read access to products
CREATE POLICY "Products are viewable by everyone"
  ON products
  FOR SELECT
  TO public
  USING (true);

-- Allow admin users to manage products (you'll need to set up admin roles)
CREATE POLICY "Admin users can manage products"
  ON products
  USING (auth.uid() IN (
    SELECT id FROM auth.users
    WHERE raw_user_meta_data->>'role' = 'admin'
  ));