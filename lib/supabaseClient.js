import { default as config } from "../config.js";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = config.supabaseUrl
const supabaseServiceKey = config.supabaseServiceKey

const supabaseClient = createClient(
  supabaseUrl, 
  supabaseServiceKey
)

export default supabaseClient