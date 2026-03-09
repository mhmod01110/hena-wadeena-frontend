import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://otiwcwoyaomszirhhwky.supabase.co';
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im90aXdjd295YW9tc3ppcmhod2t5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkzNDEyNzUsImV4cCI6MjA4NDkxNzI3NX0.YX9lkWtCuA5akmnv4UhaWUekj-p-ww25AlTyMhqEbtw';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
