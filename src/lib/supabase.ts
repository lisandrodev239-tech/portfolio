import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  image_url: string;
  demo_url: string;
  github_url: string;
  status: string;
  percentage: number;
  technologies: string[];
  year: number;
  featured: boolean;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  company: string;
  need: string;
  budget: string;
  message: string;
  read: boolean;
  created_at: string;
}