
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tttbnvlwclhxvmzsmdvt.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InR0dGJudmx3Y2xoeHZtenNtZHZ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgwNjU5OTYsImV4cCI6MjA4MzY0MTk5Nn0.MrWrf3uwPbFHJxWIe2fj0M0bRhkZHUk20s9HRPgvOfo';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
