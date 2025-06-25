"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Search, Clapperboard, Popcorn, Star, CalendarDays, Home } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: <Home size={18} /> },
    { href: "/popular", label: "Popular", icon: <Popcorn size={18} /> },
    { href: "/upcoming", label: "Upcoming", icon: <CalendarDays size={18} /> },
    { href: "/top-rated", label: "Top Rated", icon: <Star size={18} /> },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-800 shadow-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors"
            >
              <Clapperboard className="h-6 w-6 text-amber-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                CineVerse
              </span>
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <nav className="hidden md:flex items-center space-x-6">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-md transition-all ${
                    isActive 
                      ? "bg-gray-800 text-amber-400 font-medium" 
                      : "text-gray-300 hover:text-amber-400 hover:bg-gray-800/50"
                  }`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Search and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-300 hover:text-amber-400 rounded-full hover:bg-gray-800/50 transition-colors">
              <Search size={20} />
            </button>
            
            <button
              className="md:hidden p-2 text-gray-300 hover:text-amber-400 rounded-full hover:bg-gray-800/50 transition-colors"
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
        <div className="md:hidden bg-gray-900/95 backdrop-blur-lg border-t border-gray-800 px-4 py-3">
          <nav className="flex flex-col space-y-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`flex items-center space-x-3 px-3 py-3 rounded-md transition-colors ${
                    isActive 
                      ? "bg-gray-800 text-amber-400 font-medium" 
                      : "text-gray-300 hover:text-amber-400 hover:bg-gray-800/50"
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