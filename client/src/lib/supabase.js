import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl =
  rawUrl && rawUrl !== "your_supabase_project_url"
    ? rawUrl
    : typeof window !== "undefined"
    ? window.location.origin
    : "http://localhost:5173";

const supabaseAnonKey =
  rawKey && rawKey !== "your_supabase_anon_key"
    ? rawKey
    : "sb_publishable_demo_key_123";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

