import { default as config } from "../config.js";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = config.supabaseUrl
const supabaseAnonKey = config.supabaseAnonKey

const supabaseClient = createClient(supabaseUrl, supabaseAnonKey)

export default supabaseClient