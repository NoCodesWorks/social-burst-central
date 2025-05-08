
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

// Get environment variables with fallbacks for development
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Check if we're in a browser environment
const isBrowser = typeof window !== 'undefined';

// Only show warning in browser console, not during SSR
if (isBrowser && (!supabaseUrl || !supabaseAnonKey)) {
  console.warn(
    'Missing Supabase environment variables. Make sure to set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.'
  );
}

// Create a dummy client if credentials are missing
const createDummyClient = () => {
  console.error('Using dummy Supabase client. Authentication and database operations will fail.');
  
  // Return a mock client that prevents runtime crashes but logs errors
  return {
    auth: {
      getSession: async () => ({ data: { session: null }, error: new Error('Supabase not configured') }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signInWithPassword: async () => ({ error: new Error('Supabase not configured') }),
      signUp: async () => ({ error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: new Error('Supabase not configured') })
    },
    from: () => ({
      select: () => ({ data: null, error: new Error('Supabase not configured') }),
      insert: () => ({ data: null, error: new Error('Supabase not configured') }),
      update: () => ({ data: null, error: new Error('Supabase not configured') }),
      delete: () => ({ data: null, error: new Error('Supabase not configured') }),
      eq: () => ({ data: null, error: new Error('Supabase not configured') }),
      order: () => ({ data: null, error: new Error('Supabase not configured') })
    })
  };
};

// Create the Supabase client only if we have valid credentials
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient<Database>(supabaseUrl, supabaseAnonKey)
  : createDummyClient() as any;

export default supabase;
