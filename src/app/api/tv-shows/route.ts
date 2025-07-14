import { NextRequest, NextResponse } from "next/server";
import { fetchTvShows } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  try {
    const shows = await fetchTvShows(page);
    return NextResponse.json(shows);
  } catch (error: unknown) {
    let message = "Error";
    if (error instanceof Error) {
      message = error.message;
    }
    return NextResponse.json({ message }, { status: 500 });
  }
}
