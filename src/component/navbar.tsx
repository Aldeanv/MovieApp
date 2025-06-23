"use client";

import { Search } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed w-full z-50 flex items-center justify-between p-4 md:px-8 backdrop-blur-lg bg-gray-950/60">
      <h1 className="text-2xl font-bold text-red-600">MovieApp</h1>

      <div>
        <Link href="/populer" className="hover:underline text-white">
          Populer
        </Link>
      </div>

      <div className="relative max-w-sm w-full">
        <input
          type="text"
          placeholder="Cari film..."
          className="w-full text-white bg-transparent border border-gray-700 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-red-600"
        />
        <Search className="absolute right-3 top-2.5 text-white" />
      </div>
    </header>
  );
}
