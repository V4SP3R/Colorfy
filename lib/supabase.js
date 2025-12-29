import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

const supabaseUrl = process.env.SUPABASE_URL;

// ✅ usa service role no backend (Vercel) e anon no front/local
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;

let client = null;

if (supabaseUrl && supabaseKey) {
  client = createClient(supabaseUrl, supabaseKey);
} else {
  console.warn("⚠️ Supabase keys not found in env. Database features will fail.");
}

export const supabase = client;
