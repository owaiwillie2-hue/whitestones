-- Create profiles table for user information
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  phone_number text,
  date_of_birth date,
  country text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create user_roles table
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create KYC verification table
CREATE TYPE public.kyc_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.kyc_verifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  id_document_url text NOT NULL,
  selfie_url text NOT NULL,
  status kyc_status DEFAULT 'pending',
  rejection_reason text,
  submitted_at timestamptz DEFAULT now(),
  reviewed_at timestamptz,
  reviewed_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.kyc_verifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own KYC"
  ON public.kyc_verifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can submit KYC"
  ON public.kyc_verifications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all KYC"
  ON public.kyc_verifications FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update KYC"
  ON public.kyc_verifications FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create investment plans table
CREATE TABLE public.investment_plans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  min_amount numeric NOT NULL,
  max_amount numeric NOT NULL,
  roi_percentage numeric NOT NULL,
  duration_days integer NOT NULL,
  description text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.investment_plans ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view investment plans"
  ON public.investment_plans FOR SELECT
  TO authenticated
  USING (true);

-- Insert default investment plans
INSERT INTO public.investment_plans (name, min_amount, max_amount, roi_percentage, duration_days, description) VALUES
  ('Starter Plan', 500, 4999, 25, 7, 'Perfect for beginners looking to start their investment journey'),
  ('Platinum Plan', 5000, 49999, 45, 14, 'For serious investors seeking higher returns'),
  ('Executive Plan', 50000, 99999, 65, 21, 'Premium plan for executive-level investors'),
  ('Apex Plan', 100000, 999999999, 85, 30, 'Our highest tier for elite investors');

-- Create user investments table
CREATE TYPE public.investment_status AS ENUM ('active', 'completed', 'cancelled');

CREATE TABLE public.user_investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  plan_id uuid REFERENCES public.investment_plans(id) NOT NULL,
  amount numeric NOT NULL,
  status investment_status DEFAULT 'active',
  start_date timestamptz DEFAULT now(),
  end_date timestamptz,
  profit_earned numeric DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_investments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own investments"
  ON public.user_investments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create investments"
  ON public.user_investments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all investments"
  ON public.user_investments FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Create wallet/balance table
CREATE TABLE public.user_wallets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  balance numeric DEFAULT 0,
  total_deposited numeric DEFAULT 0,
  total_withdrawn numeric DEFAULT 0,
  total_profit numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.user_wallets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own wallet"
  ON public.user_wallets FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all wallets"
  ON public.user_wallets FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update wallets"
  ON public.user_wallets FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create deposits table
CREATE TYPE public.transaction_status AS ENUM ('pending', 'approved', 'rejected');

CREATE TABLE public.deposits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  payment_method text,
  transaction_id text,
  proof_url text,
  status transaction_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  processed_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.deposits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own deposits"
  ON public.deposits FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create deposits"
  ON public.deposits FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all deposits"
  ON public.deposits FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update deposits"
  ON public.deposits FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create withdrawals table
CREATE TABLE public.withdrawals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount numeric NOT NULL,
  wallet_address text NOT NULL,
  status transaction_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  processed_at timestamptz,
  processed_by uuid REFERENCES auth.users(id)
);

ALTER TABLE public.withdrawals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own withdrawals"
  ON public.withdrawals FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create withdrawals"
  ON public.withdrawals FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all withdrawals"
  ON public.withdrawals FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update withdrawals"
  ON public.withdrawals FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

-- Create trigger for profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, phone_number, date_of_birth, country)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    NEW.raw_user_meta_data->>'phone_number',
    (NEW.raw_user_meta_data->>'date_of_birth')::date,
    NEW.raw_user_meta_data->>'country'
  );
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  INSERT INTO public.user_wallets (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_wallets_updated_at
  BEFORE UPDATE ON public.user_wallets
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Insert admin user role for tgramstore@gmail.com (needs to be done after user signs up)
-- This will be handled in the application code