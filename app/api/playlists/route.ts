import { client } from "@/sanity/lib/client";
import { ALL_PLAYLISTS_QUERY } from "@/sanity/lib/queries";


export async function GET( ) {
  const playlists = await client.withConfig({ useCdn: false }).fetch(ALL_PLAYLISTS_QUERY);
  return new Response(JSON.stringify({ playlists }), {
    headers: { 'Content-Type': 'application/json' },
  });
}