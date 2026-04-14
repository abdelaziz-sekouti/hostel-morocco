"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const stats = [
  { label: "Total Rooms", value: "15", change: "+2", trend: "up" },
  { label: "Occupancy Rate", value: "78%", change: "+12%", trend: "up" },
  { label: "Active Bookings", value: "23", change: "-5", trend: "down" },
  { label: "Revenue (Month)", value: "$12,450", change: "+18%", trend: "up" }
];

const recentBookings = [
  { id: "B001", guest: "Sarah Johnson", room: "Dar Aliyah Suite", checkIn: "2024-04-15", status: "confirmed" },
  { id: "B002", guest: "Michael Chen", room: "Riad Classic Room", checkIn: "2024-04-16", status: "pending" },
  { id: "B003", guest: "Emma Wilson", room: "Marrakech Family Room", checkIn: "2024-04-17", status: "confirmed" },
  { id: "B004", guest: "James Brown", room: "Terrace Deluxe", checkIn: "2024-04-18", status: "cancelled" },
  { id: "B005", guest: "Lisa Anderson", room: "Budget Dorm Room", checkIn: "2024-04-19", status: "confirmed" }
];

export default function AdminDashboard() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-[var(--color-on-surface)]">Dashboard</h1>
            <p className="text-[var(--color-on-surface-variant)] mt-1">Welcome back! Here&apos;s your property overview.</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="card">
                <div className="flex items-start justify-between mb-4">
                  <span className="label-sm text-[var(--color-on-surface-variant)]">{stat.label}</span>
                  <span className={`text-sm font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                    {stat.change}
                  </span>
                </div>
                <div className="text-3xl font-display font-bold text-[var(--color-on-surface)]">
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Recent Bookings */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="title-lg text-[var(--color-on-surface)]">Recent Bookings</h2>
              <Link href="/admin/bookings" className="text-sm font-medium text-[var(--color-primary)] hover:underline">
                View All
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-outline-variant)]">
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Booking ID</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Guest</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Room</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Check-in</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id} className="border-b border-[var(--color-outline-variant)]/50 last:border-0">
                      <td className="py-4">
                        <span className="font-medium text-[var(--color-on-surface)]">{booking.id}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface)]">{booking.guest}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{booking.room}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{booking.checkIn}</span>
                      </td>
                      <td className="py-4">
                        <span className={`status-badge ${booking.status === "confirmed" ? "status-available" : booking.status === "pending" ? "status-pending" : "status-occupied"}`}>
                          {booking.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <Link href="/admin/rooms" className="card hover:border-[var(--color-primary)] border-2 border-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-on-surface)]">Manage Rooms</h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Add, edit, or remove rooms</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/bookings" className="card hover:border-[var(--color-primary)] border-2 border-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-secondary)]/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-secondary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-on-surface)]">View Bookings</h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">See all reservations</p>
                </div>
              </div>
            </Link>

            <Link href="/admin/guests" className="card hover:border-[var(--color-primary)] border-2 border-transparent">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="8.5" cy="7" r="4"></circle>
                    <line x1="20" y1="8" x2="20" y2="14"></line>
                    <line x1="23" y1="11" x2="17" y2="11"></line>
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[var(--color-on-surface)]">Guest Database</h3>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">Manage guest information</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}