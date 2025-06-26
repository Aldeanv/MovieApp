import { fetchTvShowDetail } from "@/lib/tmdb";
import TvShowDetailClient from "./TvShowDetailClient";
import Navbar from "@/component/navbar";

export default async function TvShowDetailPage({ params }: { params: { id: string } }) {
  const show = await fetchTvShowDetail(params.id);
  return (
    <>
      <Navbar />
      <TvShowDetailClient show={show} />
    </>
  );
}
