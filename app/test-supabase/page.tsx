import { supabase } from "../../lib/supabaseClient";

export default async function TestSupabase() {
  const { data, error } = await supabase.from("gallery_images").select("*");

  return (
    <div className="p-10">
      <h1>Test Supabase</h1>
      {error && <p>Error: {error.message}</p>}
      <pre>{JSON.stringify(data, null, 2)}</pre>
      console.log("URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.log("KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    </div>
    


  );
}
