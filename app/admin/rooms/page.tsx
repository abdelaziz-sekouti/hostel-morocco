"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  status: "available" | "occupied" | "maintenance";
  floor: string;
  features: string[];
}

const initialRooms: Room[] = [
  { id: "1", name: "Dar Aliyah Suite", type: "Suite", price: 250, capacity: 2, status: "available", floor: "2nd Floor", features: ["Private Balcony", "King Bed", "Rain Shower"] },
  { id: "2", name: "Riad Classic Room", type: "Standard", price: 120, capacity: 2, status: "occupied", floor: "1st Floor", features: ["Garden View", "Queen Bed"] },
  { id: "3", name: "Marrakech Family Room", type: "Family", price: 180, capacity: 4, status: "available", floor: "1st Floor", features: ["2 Double Beds", "Bathtub"] },
  { id: "4", name: "Terrace Deluxe", type: "Deluxe", price: 195, capacity: 2, status: "maintenance", floor: "3rd Floor", features: ["Private Terrace", "Mountain View"] },
  { id: "5", name: "Budget Dorm Room", type: "Dorm", price: 35, capacity: 1, status: "available", floor: "Ground Floor", features: ["Bunk Bed", "Shared Bathroom"] },
  { id: "6", name: "Couple's Retreat", type: "Standard", price: 165, capacity: 2, status: "occupied", floor: "2nd Floor", features: ["Four-Poster Bed", "Couple Bathrobes"] },
  { id: "7", name: "Atlas View Room", type: "Deluxe", price: 210, capacity: 2, status: "available", floor: "3rd Floor", features: ["Mountain View", "King Bed", "Balcony"] },
  { id: "8", name: "Traditional Riad Room", type: "Standard", price: 95, capacity: 2, status: "available", floor: "1st Floor", features: ["Courtyard View", "Queen Bed"] },
  { id: "9", name: "Premium Suite", type: "Suite", price: 350, capacity: 4, status: "occupied", floor: "2nd Floor", features: ["Living Area", "Kitchen", "Rooftop Access"] }
];

export default function AdminRoomsPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [rooms, setRooms] = useState<Room[]>(initialRooms);
  const [showModal, setShowModal] = useState(false);
  const [editingRoom, setEditingRoom] = useState<Room | null>(null);
  const [formData, setFormData] = useState<Partial<Room>>({});

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

  const filteredRooms = filterStatus === "all" 
    ? rooms 
    : rooms.filter(r => r.status === filterStatus);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter(r => r.id !== id));
    }
  };

  const handleEdit = (room: Room) => {
    setEditingRoom(room);
    setFormData(room);
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingRoom(null);
    setFormData({ name: "", type: "Standard", price: 100, capacity: 2, status: "available", floor: "1st Floor", features: [] });
    setShowModal(true);
  };

  const handleSave = () => {
    if (!formData.name || !formData.type) return;
    
    if (editingRoom) {
      setRooms(rooms.map(r => r.id === editingRoom.id ? { ...r, ...formData } as Room : r));
    } else {
      const newRoom: Room = {
        id: String(Date.now()),
        name: formData.name || "",
        type: formData.type || "Standard",
        price: formData.price || 100,
        capacity: formData.capacity || 2,
        status: formData.status || "available",
        floor: formData.floor || "1st Floor",
        features: formData.features || []
      };
      setRooms([...rooms, newRoom]);
    }
    setShowModal(false);
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
              <h1 className="text-3xl font-display font-bold text-[var(--color-on-surface)]">Room Management</h1>
              <p className="text-[var(--color-on-surface-variant)] mt-1">Manage your property&apos;s rooms and availability.</p>
            </div>
            <button className="btn-primary" onClick={handleAdd}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline mr-2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Room
            </button>
          </div>

          {/* Filters */}
          <div className="card mb-6">
            <div className="flex flex-wrap gap-4 items-center">
              <span className="text-sm font-medium text-[var(--color-on-surface)]">Filter by:</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setFilterStatus("all")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "all" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  All ({rooms.length})
                </button>
                <button 
                  onClick={() => setFilterStatus("available")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "available" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  Available ({rooms.filter(r => r.status === "available").length})
                </button>
                <button 
                  onClick={() => setFilterStatus("occupied")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "occupied" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  Occupied ({rooms.filter(r => r.status === "occupied").length})
                </button>
                <button 
                  onClick={() => setFilterStatus("maintenance")}
                  className={`px-4 py-2 rounded-[var(--radius-lg)] text-sm font-medium ${filterStatus === "maintenance" ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-surface)] text-[var(--color-on-surface-variant)] hover:bg-[var(--color-surface-variant)]"}`}
                >
                  Maintenance ({rooms.filter(r => r.status === "maintenance").length})
                </button>
              </div>
            </div>
          </div>

          {/* Rooms Table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--color-outline-variant)]">
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Room Name</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Type</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Floor</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Capacity</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Price</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Status</th>
                    <th className="text-left label-sm text-[var(--color-on-surface-variant)] pb-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRooms.map((room) => (
                    <tr key={room.id} className="border-b border-[var(--color-outline-variant)]/50 last:border-0 hover:bg-[var(--color-surface-variant)]/50">
                      <td className="py-4">
                        <span className="font-medium text-[var(--color-on-surface)]">{room.name}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{room.type}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{room.floor}</span>
                      </td>
                      <td className="py-4">
                        <span className="text-[var(--color-on-surface-variant)]">{room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}</span>
                      </td>
                      <td className="py-4">
                        <span className="font-medium text-[var(--color-on-surface)]">${room.price}/night</span>
                      </td>
                      <td className="py-4">
                        <span className={`status-badge ${room.status === "available" ? "status-available" : room.status === "occupied" ? "status-occupied" : "status-pending"}`}>
                          {room.status}
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEdit(room)} className="p-2 hover:bg-[var(--color-surface)] rounded-lg" title="Edit">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(room.id)} className="p-2 hover:bg-[var(--color-surface)] rounded-lg" title="Delete">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-error)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
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

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-primary)] mb-2">
                {rooms.filter(r => r.status === "available").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Available Rooms</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-secondary)] mb-2">
                {rooms.filter(r => r.status === "occupied").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Occupied Rooms</div>
            </div>
            <div className="card text-center">
              <div className="text-3xl font-display font-bold text-[var(--color-error)] mb-2">
                {rooms.filter(r => r.status === "maintenance").length}
              </div>
              <div className="text-[var(--color-on-surface-variant)]">Maintenance</div>
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-[var(--color-surface-lowest)] rounded-[var(--radius-xl)] p-6 w-full max-w-md">
            <h2 className="title-lg text-[var(--color-on-surface)] mb-4">
              {editingRoom ? "Edit Room" : "Add New Room"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Room Name</label>
                <input
                  type="text"
                  value={formData.name || ""}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-field"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Type</label>
                  <select
                    value={formData.type || "Standard"}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as Room["type"] })}
                    className="input-field"
                  >
                    <option value="Standard">Standard</option>
                    <option value="Deluxe">Deluxe</option>
                    <option value="Suite">Suite</option>
                    <option value="Family">Family</option>
                    <option value="Dorm">Dorm</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Price/night</label>
                  <input
                    type="number"
                    value={formData.price || ""}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Capacity</label>
                  <input
                    type="number"
                    value={formData.capacity || ""}
                    onChange={(e) => setFormData({ ...formData, capacity: Number(e.target.value) })}
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Floor</label>
                  <select
                    value={formData.floor || "1st Floor"}
                    onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                    className="input-field"
                  >
                    <option value="Ground Floor">Ground Floor</option>
                    <option value="1st Floor">1st Floor</option>
                    <option value="2nd Floor">2nd Floor</option>
                    <option value="3rd Floor">3rd Floor</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-1">Status</label>
                <select
                  value={formData.status || "available"}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as Room["status"] })}
                  className="input-field"
                >
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} className="btn-primary flex-1">
                Save
              </button>
              <button onClick={() => setShowModal(false)} className="btn-tertiary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}