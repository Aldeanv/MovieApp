"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/populer", label: "Populer" },
    { href: "/upcoming", label: "Upcoming" },
    { href: "/top-rated", label: "Top Rated" },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10 shadow-lg">
      <div className="mx-auto max-w-7xl px-4 lg:px-8 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-extrabold text-red-500 hover:text-red-400 transition-colors">
          🎥 MovieApp
        </Link>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-white font-medium">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                href={link.href}
                key={link.href}
                className={`relative px-2 py-1 transition-colors ${
                  isActive ? "text-red-500" : "hover:text-red-500"
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 bottom-0 w-full h-0.5 bg-red-500 scale-x-100 origin-left transition-transform"></span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Spacer untuk layout */}
        <div className="w-24"></div>
      </div>
    </header>
  );
}
