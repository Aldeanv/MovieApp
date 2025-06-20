import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  images: {
    domains: ['image.tmdb.org'], // Izinkan gambar dari TMDb
  },
};

export default nextConfig;
