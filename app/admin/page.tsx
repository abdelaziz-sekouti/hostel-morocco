"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  const router = useRouter();
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

  return (
    <div className="p-6 lg:p-8">
      {/* Header with logout */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-[var(--color-on-surface)]">Dashboard</h1>
        <button 
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm font-medium text-[var(--color-on-surface)] bg-[var(--color-surface)] rounded-[var(--radius-lg)] hover:bg-[var(--color-surface-variant)] transition-colors"
        >
          Logout
        </button>
      </div>
      
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
  );
}