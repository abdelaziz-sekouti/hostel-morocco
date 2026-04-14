"use client";

import { useState } from "react";
import Link from "next/link";

export default function MobileNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <button 
        className="md:hidden p-2" 
        aria-label="Menu"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {mobileMenuOpen ? (
            <>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </>
          ) : (
            <>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </>
          )}
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 right-0 h-[calc(100vh-5rem)] bg-[var(--color-surface-lowest)] border-t border-[var(--color-outline-variant)] shadow-lg">
          <div className="container-custom py-8 px-6 space-y-6">
            <Link 
              href="/" 
              className="block py-3 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/rooms" 
              className="block py-3 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rooms
            </Link>
            <Link 
              href="/booking" 
              className="block py-3 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Book Now
            </Link>
            <Link 
              href="/admin/login" 
              className="block py-3 text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] font-medium text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
            <div className="pt-4">
              <Link href="/booking" className="btn-primary block text-center w-full py-3 text-lg">
                Reserve Now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}