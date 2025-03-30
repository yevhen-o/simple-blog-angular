import { createClient } from '@supabase/supabase-js';
import { environment } from '@src/environments/environment';

// Access environment variables from the environment file
const supabaseUrl = environment.VITE_SUPABASE_URL;
const supabaseKey = environment.VITE_SUPABASE_KEY;

// Check if environment variables are defined
if (!supabaseUrl) {
  throw new Error('supabaseUrl is not defined in the environment.');
}
if (!supabaseKey) {
  throw new Error('supabaseKey is not defined in the environment.');
}

// Create the Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
export default supabase;
