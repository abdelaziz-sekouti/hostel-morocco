"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  createdAt: string;
}

const bookings: Booking[] = [
  { id: "B001", guestName: "Sarah Johnson", guestEmail: "sarah.j@email.com", guestPhone: "+44 7700 900123", room: "Dar Aliyah Suite", checkIn: "2024-04-15", checkOut: "2024-04-18", guests: 2, total: 750, status: "confirmed", createdAt: "2024-04-10" },
  { id: "B002", guestName: "Michael Chen", guestEmail: "m.chen@email.com", guestPhone: "+1 555 123 4567", room: "Riad Classic Room", checkIn: "2024-04-16", checkOut: "2024-04-20", guests: 2, total: 480, status: "pending", createdAt: "2024-04-11" },
  { id: "B003", guestName: "Emma Wilson", guestEmail: "emma.w@email.com", guestPhone: "+44 7700 900456", room: "Marrakech Family Room", checkIn: "2024-04-17", checkOut: "2024-04-22", guests: 4, total: 900, status: "confirmed", createdAt: "2024-04-09" },
  { id: "B004", guestName: "James Brown", guestEmail: "j.brown@email.com", guestPhone: "+1 555 987 6543", room: "Terrace Deluxe", checkIn: "2024-04-18", checkOut: "2024-04-21", guests: 2, total: 585, status: "cancelled", createdAt: "2024-04-08" },
  { id: "B005", guestName: "Lisa Anderson", guestEmail: "l.anderson@email.com", guestPhone: "+61 400 123 456", room: "Budget Dorm Room", checkIn: "2024-04-19", checkOut: "2024-04-23", guests: 1, total: 140, status: "confirmed", createdAt: "2024-04-12" },
  { id: "B006", guestName: "David Martinez", guestEmail: "d.martinez@email.com", guestPhone: "+34 600 123 456", room: "Premium Suite", checkIn: "2024-04-20", checkOut: "2024-04-25", guests: 4, total: 1750, status: "confirmed", createdAt: "2024-04-13" },
  { id: "B007", guestName: "Sophie Taylor", guestEmail: "s.taylor@email.com", guestPhone: "+33 600 789 123", room: "Couple's Retreat", checkIn: "2024-04-21", checkOut: "2024-04-24", guests: 2, total: 495, status: "pending", createdAt: "2024-04-14" },
  { id: "B008", guestName: "Robert White", guestEmail: "r.white@email.com", guestPhone: "+1 555 321 987", room: "Atlas View Room", checkIn: "2024-04-10", checkOut: "2024-04-14", guests: 2, total: 840, status: "completed", createdAt: "2024-04-05" }
];

export default function AdminBookingsPage() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookings = bookings.filter(b => {
    const matchesStatus = filterStatus === "all" || b.status === filterStatus;
    const matchesSearch = b.guestName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         b.room.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "confirmed": return "status-available";
      case "pending": return "status-pending";
      case "cancelled": return "status-occupied";
      case "completed": return "status-available";
      default: return "";
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
              <h1 className="text-3xl font-display font-bold text-[var(--color-on-surface)]">Booking Management</h1>
              <p className="text-[var(--color-on-surface-variant)] mt-1">View and manage all reservations.</p>
            </div>
            <button className="btn-primary">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              New Booking
            </button>
          </div>

          {/* Filters & Search */}
          <div className="card mb-6">
            <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
              <div className="flex flex-wrap gap-2">
                <button 
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "all" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  All ({bookings.length})
                </button>
                <button 
                  onClick={() => setFilterStatus("confirmed")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "confirmed" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  Confirmed ({bookings.filter(b => b.status === "confirmed").length})
                </button>
                <button 
                  onClick={() => setFilterStatus("pending")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "pending" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  Pending ({bookings.filter(b => b.status === "pending").length})
                </button>
                <button 
                  onClick={() => setFilterStatus("cancelled")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "cancelled" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  Cancelled ({bookings.filter(b => b.status === "cancelled").length})
                </button>
              </div>
              <div className="relative w-full lg:w-64">
                <input 
                  type="text"
                  placeholder="Search by name, ID, or room..."
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
          </div>

          {/* Bookings Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-outline-variant)]">
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">ID</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Guest</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Room</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Check-in</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Check-out</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Total</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Status</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-[var(--color-outline-variant)]/50 last:border-0 hover:bg-[var(--color-surface-variant)]/50">
                      <td className="py-4">
                        <span className="font-medium text-[var(--color-on-surface)]">{booking.id}</span>
                      </td>
                      <td className="py-4">
                        <div>
                          <span className="font-medium text-[var(--color-on-surface)]">{booking.guestName}</span>
                          <p className="text-xs text-[var(--color-on-surface-variant)]">{booking.guestEmail}</p>
                        </div>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{booking.room}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{booking.checkIn}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{booking.checkOut}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-medium text-[var(--color-on-surface)]">${booking.total}</span>
                      </td>
                      <td className="py-4">
                        <span className={`status-badge ${getStatusBadge(booking.status)}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button className="p-2 hover:bg-[var(--color-surface)] rounded-lg" title="View Details">
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
                          {booking.status === "pending" && (
                            <button className="p-2 hover:bg-[var(--color-surface)] rounded-lg" title="Confirm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </button>
                          )}
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
                ${bookings.reduce((sum, b) => b.status !== "cancelled" ? sum + b.total : sum, 0).toLocaleString()}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Total Revenue</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-green-600 mb-2">
                {bookings.filter(b => b.status === "confirmed").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Confirmed</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-error)] mb-2">
                {bookings.filter(b => b.status === "pending").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Pending</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-on-surface-variant)] mb-2">
                {bookings.filter(b => b.status === "cancelled").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Cancelled</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}