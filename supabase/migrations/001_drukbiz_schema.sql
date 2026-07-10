-- DrukBiz OS — Database Schema
-- Run in Supabase SQL Editor
-- Uses a separate schema to keep it clean from cyberbhutan data

CREATE SCHEMA IF NOT EXISTS drukbiz;

-- ============================================================
-- COMPANIES (each business using DrukBiz is a "company")
-- ============================================================
CREATE TABLE drukbiz.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_name TEXT,
  email TEXT,
  phone TEXT,
  address TEXT,
  business_type TEXT, -- 'retail', 'restaurant', 'hotel', 'service', 'farm', 'other'
  currency TEXT DEFAULT 'BTN',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS / INVENTORY
-- ============================================================
CREATE TABLE drukbiz.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sku TEXT,
  category TEXT,
  unit TEXT DEFAULT 'piece', -- piece, kg, litre, bag, box
  purchase_price NUMERIC(12,2) DEFAULT 0,
  selling_price NUMERIC(12,2) DEFAULT 0,
  stock INTEGER DEFAULT 0,
  low_stock_threshold INTEGER DEFAULT 5,
  supplier_id UUID,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SUPPLIERS
-- ============================================================
CREATE TABLE drukbiz.suppliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  contact_person TEXT,
  phone TEXT,
  email TEXT,
  address TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- CUSTOMERS (CRM)
-- ============================================================
CREATE TABLE drukbiz.customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  address TEXT,
  notes TEXT,
  credit_limit NUMERIC(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SALES
-- ============================================================
CREATE TABLE drukbiz.sales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  invoice_number TEXT,
  customer_id UUID REFERENCES drukbiz.customers(id) ON DELETE SET NULL,
  customer_name TEXT,
  sale_date DATE DEFAULT CURRENT_DATE,
  total_amount NUMERIC(12,2) DEFAULT 0,
  discount NUMERIC(12,2) DEFAULT 0,
  paid_amount NUMERIC(12,2) DEFAULT 0,
  payment_method TEXT DEFAULT 'cash', -- cash, bank, credit, mobile
  status TEXT DEFAULT 'completed', -- completed, pending, cancelled
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SALE ITEMS (line items for each sale)
-- ============================================================
CREATE TABLE drukbiz.sale_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sale_id UUID REFERENCES drukbiz.sales(id) ON DELETE CASCADE,
  product_id UUID REFERENCES drukbiz.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EXPENSES
-- ============================================================
CREATE TABLE drukbiz.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  category TEXT, -- rent, salary, utilities, supplies, marketing, other
  amount NUMERIC(12,2) NOT NULL,
  description TEXT,
  expense_date DATE DEFAULT CURRENT_DATE,
  payment_method TEXT DEFAULT 'cash',
  receipt_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EMPLOYEES
-- ============================================================
CREATE TABLE drukbiz.employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  phone TEXT,
  email TEXT,
  role TEXT, -- manager, cashier, waiter, cook, driver, other
  salary NUMERIC(12,2) DEFAULT 0,
  salary_frequency TEXT DEFAULT 'monthly', -- monthly, weekly, daily
  hire_date DATE,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EMPLOYEE ATTENDANCE
-- ============================================================
CREATE TABLE drukbiz.attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  employee_id UUID REFERENCES drukbiz.employees(id) ON DELETE CASCADE,
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'present', -- present, absent, late, half-day, leave
  check_in TIME,
  check_out TIME,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PURCHASES (stock replenishment)
-- ============================================================
CREATE TABLE drukbiz.purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES drukbiz.companies(id) ON DELETE CASCADE,
  supplier_id UUID REFERENCES drukbiz.suppliers(id) ON DELETE SET NULL,
  supplier_name TEXT,
  invoice_number TEXT,
  purchase_date DATE DEFAULT CURRENT_DATE,
  total_amount NUMERIC(12,2) DEFAULT 0,
  status TEXT DEFAULT 'pending', -- pending, received, cancelled
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PURCHASE ITEMS
-- ============================================================
CREATE TABLE drukbiz.purchase_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  purchase_id UUID REFERENCES drukbiz.purchases(id) ON DELETE CASCADE,
  product_id UUID REFERENCES drukbiz.products(id) ON DELETE SET NULL,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price NUMERIC(12,2) NOT NULL,
  total NUMERIC(12,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- RLS / PERMISSIONS
-- ============================================================
ALTER TABLE drukbiz.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.suppliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.sale_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.expenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.employees ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.purchases ENABLE ROW LEVEL SECURITY;
ALTER TABLE drukbiz.purchase_items ENABLE ROW LEVEL SECURITY;

-- Grant access
GRANT USAGE ON SCHEMA drukbiz TO authenticated, anon, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA drukbiz TO authenticated, service_role;
GRANT SELECT ON ALL TABLES IN SCHEMA drukbiz TO anon;

-- Indexes for performance
CREATE INDEX idx_drukbiz_products_company ON drukbiz.products(company_id);
CREATE INDEX idx_drukbiz_sales_company ON drukbiz.sales(company_id);
CREATE INDEX idx_drukbiz_sales_date ON drukbiz.sales(sale_date);
CREATE INDEX idx_drukbiz_customers_company ON drukbiz.customers(company_id);
CREATE INDEX idx_drukbiz_expenses_company ON drukbiz.expenses(company_id);
CREATE INDEX idx_drukbiz_employees_company ON drukbiz.employees(company_id);
