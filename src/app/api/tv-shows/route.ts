import { NextRequest, NextResponse } from "next/server";
import { fetchTvShows } from "@/lib/tmdb";

export async function GET(req: NextRequest) {
  const page = parseInt(req.nextUrl.searchParams.get("page") || "1");
  try {
    const shows = await fetchTvShows(page);
    return NextResponse.json(shows);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Error" },
      { status: 500 }
    );
  }
}
