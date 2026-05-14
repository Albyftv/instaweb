-- Instaweb — Schema SQL
-- Ejecutar en el SQL Editor de Supabase

CREATE TABLE businesses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  category TEXT NOT NULL CHECK (category IN ('restaurant', 'services', 'shop', 'tourism')),
  template TEXT NOT NULL,
  description TEXT,
  phone TEXT,
  whatsapp TEXT,
  email TEXT,
  address TEXT,
  city TEXT,
  schedule JSONB DEFAULT '{}',
  logo_url TEXT,
  cover_url TEXT,
  gallery JSONB DEFAULT '[]',
  instagram TEXT,
  facebook TEXT,
  tiktok TEXT,
  primary_color TEXT DEFAULT '#2563eb',
  accent_color TEXT DEFAULT '#f97316',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  plan TEXT DEFAULT 'basic' CHECK (plan IN ('basic', 'pro', 'negocio')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'cancelled')),
  owner_email TEXT NOT NULL,
  custom_domain TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'General',
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  image_url TEXT,
  available BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE service_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  business_id UUID REFERENCES businesses(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price TEXT,
  duration TEXT,
  image_url TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE businesses ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_items ENABLE ROW LEVEL SECURITY;

-- Páginas de negocios son públicas (para renderizar /[slug])
CREATE POLICY "public read active businesses" ON businesses
  FOR SELECT USING (status = 'active');

-- El dueño puede leer y editar su negocio (por email)
CREATE POLICY "owner can read own business" ON businesses
  FOR SELECT USING (owner_email = auth.jwt()->>'email');

CREATE POLICY "owner can update own business" ON businesses
  FOR UPDATE USING (owner_email = auth.jwt()->>'email');

-- Service role puede todo (para webhooks de Stripe)
CREATE POLICY "service role full access businesses" ON businesses
  USING (auth.role() = 'service_role');

CREATE POLICY "public read menu items" ON menu_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND status = 'active')
  );

CREATE POLICY "owner manage menu items" ON menu_items
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_email = auth.jwt()->>'email')
  );

CREATE POLICY "public read service items" ON service_items
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND status = 'active')
  );

CREATE POLICY "owner manage service items" ON service_items
  USING (
    EXISTS (SELECT 1 FROM businesses WHERE id = business_id AND owner_email = auth.jwt()->>'email')
  );

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = NOW(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER businesses_updated_at
  BEFORE UPDATE ON businesses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
