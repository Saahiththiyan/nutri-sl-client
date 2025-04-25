// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY } from '@env';

if (!SUPABASE_URL) {
  console.error('SUPABASE_URL is undefined. Please check your .env file and babel configuration.');
  throw new Error('SUPABASE_URL is required');
}

if (!SUPABASE_ANON_KEY) {
  console.error('SUPABASE_ANON_KEY is undefined. Please check your .env file and babel configuration.');
  throw new Error('SUPABASE_ANON_KEY is required');
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
