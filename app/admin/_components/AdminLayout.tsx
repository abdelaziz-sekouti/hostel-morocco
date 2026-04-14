"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = sessionStorage.getItem("admin_auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--color-surface)] flex items-center justify-center">
        <div className="text-[var(--color-on-surface-variant)]">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[var(--color-surface)]">
      {/* Top Navigation */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[var(--color-surface-lowest)] border-b border-[var(--color-outline-variant)] z-50">
        <div className="h-full px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 hover:bg-[var(--color-surface)] rounded-lg"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            </button>
            <Link href="/admin" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">EN</span>
              </div>
              <span className="font-display font-bold text-[var(--color-on-surface)] hidden sm:inline">
                The Elevated Nomad
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[var(--color-surface)] rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              <span className="text-sm text-[var(--color-on-surface-variant)]">System Operational</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-sm text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)]"
            >
              Logout
            </button>
            <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">AD</span>
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <aside className={`fixed top-16 left-0 w-64 h-screen bg-[var(--color-surface-low)] border-r border-[var(--color-outline-variant)] transform transition-transform duration-200 z-40 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <nav className="p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] ${pathname === "/admin" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="12" width="7" height="7"></rect>
              <rect x="3" y="12" width="7" height="7"></rect>
            </svg>
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link 
            href="/admin/rooms" 
            className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] ${pathname === "/admin/rooms" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            <span className="font-medium">Rooms</span>
          </Link>

          <Link 
            href="/admin/bookings" 
            className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] ${pathname === "/admin/bookings" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            <span className="font-medium">Bookings</span>
          </Link>

          <Link 
            href="/admin/guests" 
            className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-lg)] ${pathname === "/admin/guests" ? "bg-[var(--color-primary)] text-white" : "text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            <span className="font-medium">Guests</span>
          </Link>

          <div className="pt-4 mt-4 border-t border-[var(--color-outline-variant)]">
            <Link href="/" className="flex items-center gap-3 px-4 py-3 text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)] rounded-[var(--radius-lg)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              <span className="font-medium">Back to Website</span>
            </Link>
          </div>
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        {children}
      </main>
    </div>
  );
}