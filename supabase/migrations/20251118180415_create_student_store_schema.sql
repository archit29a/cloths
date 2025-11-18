/*
  # Student Clothing Store Database Schema

  ## Overview
  This migration creates the complete database schema for a student-focused online clothing store.

  ## New Tables Created

  ### 1. categories
  - `id` (uuid, primary key) - Unique category identifier
  - `name` (text) - Category name (e.g., "Hoodies", "T-Shirts")
  - `slug` (text, unique) - URL-friendly category identifier
  - `image_url` (text) - Category thumbnail image
  - `created_at` (timestamptz) - Record creation timestamp

  ### 2. products
  - `id` (uuid, primary key) - Unique product identifier
  - `name` (text) - Product name
  - `slug` (text, unique) - URL-friendly product identifier
  - `description` (text) - Product description
  - `price` (decimal) - Original price
  - `discount_price` (decimal, nullable) - Discounted price if on sale
  - `category_id` (uuid, foreign key) - References categories table
  - `images` (jsonb) - Array of product image URLs
  - `sizes` (jsonb) - Available sizes array
  - `colors` (jsonb) - Available colors array
  - `is_trending` (boolean) - Whether product is trending
  - `badge` (text, nullable) - Badge text (e.g., "New", "Sale")
  - `stock` (integer) - Available stock count
  - `created_at` (timestamptz) - Record creation timestamp

  ### 3. cart_items
  - `id` (uuid, primary key) - Unique cart item identifier
  - `user_id` (uuid) - User identifier (from auth.users)
  - `product_id` (uuid, foreign key) - References products table
  - `quantity` (integer) - Item quantity
  - `size` (text) - Selected size
  - `color` (text) - Selected color
  - `created_at` (timestamptz) - Record creation timestamp

  ### 4. orders
  - `id` (uuid, primary key) - Unique order identifier
  - `user_id` (uuid) - User identifier (from auth.users)
  - `total` (decimal) - Order total amount
  - `status` (text) - Order status (pending, confirmed, shipped, delivered)
  - `items` (jsonb) - Order items details
  - `shipping_address` (jsonb) - Shipping address details
  - `payment_method` (text) - Payment method used
  - `created_at` (timestamptz) - Record creation timestamp

  ## Security
  - RLS enabled on all tables
  - Public read access for categories and products
  - Authenticated users can manage their own cart and orders

  ## Important Notes
  - All tables use UUID primary keys
  - JSONB used for flexible data (images, sizes, colors, order details)
  - Indexes added for common query patterns
  - Foreign key constraints ensure data integrity
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  price decimal(10, 2) NOT NULL,
  discount_price decimal(10, 2),
  category_id uuid REFERENCES categories(id) ON DELETE CASCADE,
  images jsonb NOT NULL DEFAULT '[]',
  sizes jsonb NOT NULL DEFAULT '[]',
  colors jsonb NOT NULL DEFAULT '[]',
  is_trending boolean DEFAULT false,
  badge text,
  stock integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer DEFAULT 1,
  size text NOT NULL,
  color text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  total decimal(10, 2) NOT NULL,
  status text DEFAULT 'pending',
  items jsonb NOT NULL,
  shipping_address jsonb NOT NULL,
  payment_method text NOT NULL,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_trending ON products(is_trending);
CREATE INDEX IF NOT EXISTS idx_cart_items_user ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON categories FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);