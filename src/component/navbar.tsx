"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  X,
  Search,
  Clapperboard,
  Popcorn,
  CalendarDays,
  Home,
  Tv,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const links = [
    { href: "/", label: "Home", icon: <Home size={20} /> },
    { href: "/popular", label: "Popular", icon: <Popcorn size={20} /> },
    { href: "/tv", label: "TV Shows", icon: <Tv size={20} /> },
    { href: "/upcoming", label: "Upcoming", icon: <CalendarDays size={20} /> },
  ];

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchQuery.trim();
    if (query) {
      setIsSearchOpen(false);
      router.push(`/search?query=${encodeURIComponent(query)}`);
      setSearchQuery("");
    }
  };

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 bg-gradient-to-b from-gray-900 to-gray-900/80 backdrop-blur-md border-b border-gray-800/50 shadow-lg">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              href="/"
              className="flex items-center space-x-2 group"
            >
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 group-hover:from-amber-400 group-hover:to-orange-500 transition-all">
                <Clapperboard className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                CineVerse
              </span>
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                    isActive
                      ? "bg-gray-800 text-white font-medium shadow-inner shadow-amber-500/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center space-x-3 relative">
            <div ref={searchRef} className="flex items-center">
              <button
                className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-all relative group"
                onClick={() => setIsSearchOpen((prev) => !prev)}
                aria-label="Toggle search"
              >
                <Search size={20} />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-amber-500 group-hover:w-4 transition-all duration-300"></span>
              </button>

              {/* Search Bar - Now appears to the right */}
              {isSearchOpen && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-gray-800 rounded-lg shadow-xl border border-gray-700/50 overflow-hidden">
                  <form
                    onSubmit={handleSearchSubmit}
                    className="flex items-center"
                  >
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search movies or TV shows..."
                        className="w-full pl-10 pr-4 py-2.5 bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        autoFocus
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:from-amber-400 hover:to-orange-500 transition-all"
                    >
                      Search
                    </button>
                  </form>
                </div>
              )}
            </div>

            <button
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800/50 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-gradient-to-b from-gray-900 to-gray-900/95 backdrop-blur-md border-t border-gray-800/30 px-5 py-3 shadow-xl">
          <nav className="flex flex-col space-y-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-gray-800 text-white font-medium shadow-inner shadow-amber-500/20"
                      : "text-gray-300 hover:text-white hover:bg-gray-800/50"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
}