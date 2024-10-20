import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  'ADRESA TVOJI DATABAZE',
  'TVUJ API KLIC DATABAZE'
);
