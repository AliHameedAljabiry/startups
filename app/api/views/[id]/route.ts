import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/lib/write-client";
import { client } from "@/sanity/lib/client";
import { STARTUP_VIEWS_QUERY } from "@/sanity/lib/queries";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  // Get current views
  const { views } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
  // Increment
  await writeClient.patch(id).set({ views: views + 1 }).commit();
  // Return new value
  return NextResponse.json({ views: views + 1 });
}

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const { views } = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
  return NextResponse.json({ views });
}