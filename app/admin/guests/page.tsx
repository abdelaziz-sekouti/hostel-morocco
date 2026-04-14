"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  totalBookings: number;
  totalSpent: number;
  lastVisit: string;
  membership: "standard" | "silver" | "gold";
}

const guests: Guest[] = [
  { id: "G001", name: "Sarah Johnson", email: "sarah.j@email.com", phone: "+44 7700 900123", country: "United Kingdom", totalBookings: 3, totalSpent: 2250, lastVisit: "2024-04-15", membership: "gold" },
  { id: "G002", name: "Michael Chen", email: "m.chen@email.com", phone: "+1 555 123 4567", country: "USA", totalBookings: 1, totalSpent: 480, lastVisit: "2024-04-16", membership: "standard" },
  { id: "G003", name: "Emma Wilson", email: "emma.w@email.com", phone: "+44 7700 900456", country: "United Kingdom", totalBookings: 2, totalSpent: 1800, lastVisit: "2024-04-17", membership: "silver" },
  { id: "G004", name: "James Brown", email: "j.brown@email.com", phone: "+1 555 987 6543", country: "USA", totalBookings: 5, totalSpent: 4200, lastVisit: "2024-04-18", membership: "gold" },
  { id: "G005", name: "Lisa Anderson", email: "l.anderson@email.com", phone: "+61 400 123 456", country: "Australia", totalBookings: 1, totalSpent: 140, lastVisit: "2024-04-19", membership: "standard" },
  { id: "G006", name: "David Martinez", email: "d.martinez@email.com", phone: "+34 600 123 456", country: "Spain", totalBookings: 4, totalSpent: 3200, lastVisit: "2024-04-20", membership: "gold" }
];

export default function AdminGuestsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

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

  const filteredGuests = guests.filter(g => 
    g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    g.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case "gold": return "bg-yellow-500/10 text-yellow-600";
      case "silver": return "bg-gray-400/10 text-gray-600";
      default: return "bg-[var(--color-surface-variant)] text-[var(--color-on-surface-variant)]";
    }
  };

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
            <Link href="/" className="flex items-center gap-2">
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
              className="px-3 py-1.5 text-sm font-medium text-[var(--color-on-surface)] bg-[var(--color-surface)] rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-variant)] transition-colors"
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
        <div className="p-6 lg:p-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-display font-bold text-[var(--color-on-surface)]">Guest Database</h1>
              <p className="text-[var(--color-on-surface-variant)] mt-1">Manage your guest information and loyalty program.</p>
            </div>
            <button className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add Guest
            </button>
          </div>

          {/* Search */}
          <div className="card mb-6">
            <div className="relative w-full lg:w-96">
              <input 
                type="text"
                placeholder="Search by name, email, or country..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-10"
              />
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-on-surface-variant)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-3 top-1/2 -translate-y-1/2">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          {/* Guests Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-outline-variant)]">
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Guest</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Country</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Bookings</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Total Spent</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Last Visit</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Membership</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredGuests.map((guest) => (
                    <tr key={guest.id} className="border-b border-[var(--color-outline-variant)]/50 last:border-0 hover:bg-[var(--color-surface-variant)]/50">
                      <td className="py-4">
                        <div>
                          <span className="font-medium text-[var(--color-on-surface)]">{guest.name}</span>
                          <p className="text-xs text-[var(--color-on-surface-variant)]">{guest.email}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{guest.country}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface)]">{guest.totalBookings}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-medium text-[var(--color-on-surface)]">${guest.totalSpent.toLocaleString()}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{guest.lastVisit}</span>
                      </td>
                      <td className="py-4">
                        <span className={`status-badge ${getMembershipBadge(guest.membership)}`}>
                          {guest.membership.charAt(0).toUpperCase() + guest.membership.slice(1)}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-[var(--color-surface)] rounded-lg" title="View">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                              <circle cx="12" cy="12" r="3"></circle>
                            </svg>
                          </button>
                          <button className="p-2 hover:bg-[var(--color-surface)] rounded-lg" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-8">
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-primary)] mb-2">
                {guests.length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Total Guests</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-yellow-600 mb-2">
                {guests.filter(g => g.membership === "gold").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Gold Members</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-gray-500 mb-2">
                {guests.filter(g => g.membership === "silver").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Silver Members</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-on-surface-variant)] mb-2">
                ${guests.reduce((sum, g) => sum + g.totalSpent, 0).toLocaleString()}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Total Revenue</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}