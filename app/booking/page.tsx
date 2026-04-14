"use client";

import { useState } from "react";

const rooms = [
  { id: "1", name: "Dar Aliyah Suite", price: 250, type: "Suite" },
  { id: "2", name: "Riad Classic Room", price: 120, type: "Standard" },
  { id: "3", name: "Marrakech Family Room", price: 180, type: "Family" },
  { id: "4", name: "Terrace Deluxe", price: 195, type: "Deluxe" },
  { id: "5", name: "Budget Dorm Room", price: 35, type: "Dorm" },
  { id: "6", name: "Couple's Retreat", price: 165, type: "Standard" }
];

export default function BookingPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomType: "",
    specialRequests: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Booking request submitted! We'll confirm shortly.");
  };

  const calculateTotal = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.roomType) return 0;
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    const room = rooms.find(r => r.id === formData.roomType);
    return room ? nights * room.price : 0;
  };

  return (
    <>
      {/* Header */}
      <section className="relative py-24 bg-[var(--color-surface)]">
        <div className="container-custom">
          <div className="text-center">
            <span className="text-[var(--color-primary)] font-medium tracking-wider uppercase text-sm">
              Reservation
            </span>
            <h1 className="text-5xl font-display font-bold text-[var(--color-on-surface)] mt-2 mb-4">
              Book Your Stay
            </h1>
            <p className="text-[var(--color-on-surface-variant)] max-w-2xl mx-auto text-lg">
              Complete the form below to reserve your room at The Elevated Nomad.
            </p>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="section-padding bg-[var(--color-surface)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Guest Information */}
                <div className="card">
                  <h2 className="title-lg text-[var(--color-on-surface)] mb-6">Guest Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="Enter your last name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="+212 6XX XXX XXX"
                      />
                    </div>
                  </div>
                </div>

                {/* Stay Details */}
                <div className="card">
                  <h2 className="title-lg text-[var(--color-on-surface)] mb-6">Stay Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Check-in Date *
                      </label>
                      <input
                        type="date"
                        name="checkIn"
                        required
                        value={formData.checkIn}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Check-out Date *
                      </label>
                      <input
                        type="date"
                        name="checkOut"
                        required
                        value={formData.checkOut}
                        onChange={handleChange}
                        className="input-field"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Number of Guests *
                      </label>
                      <select
                        name="guests"
                        required
                        value={formData.guests}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5">5+ Guests</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--color-on-surface)] mb-2">
                        Room Type *
                      </label>
                      <select
                        name="roomType"
                        required
                        value={formData.roomType}
                        onChange={handleChange}
                        className="input-field"
                      >
                        <option value="">Select a room</option>
                        {rooms.map(room => (
                          <option key={room.id} value={room.id}>
                            {room.name} - ${room.price}/night
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Special Requests */}
                <div className="card">
                  <h2 className="title-lg text-[var(--color-on-surface)] mb-6">Special Requests</h2>
                  <textarea
                    name="specialRequests"
                    value={formData.specialRequests}
                    onChange={handleChange}
                    rows={4}
                    className="input-field resize-none"
                    placeholder="Any special requests? Dietary requirements, early check-in, etc."
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-4 text-lg">
                  Complete Reservation
                </button>
              </form>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-24">
                <h2 className="title-lg text-[var(--color-on-surface)] mb-6">Reservation Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-on-surface-variant)]">Room</span>
                    <span className="font-medium text-[var(--color-on-surface)]">
                      {formData.roomType ? rooms.find(r => r.id === formData.roomType)?.name : "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-on-surface-variant)]">Check-in</span>
                    <span className="font-medium text-[var(--color-on-surface)]">
                      {formData.checkIn || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-on-surface-variant)]">Check-out</span>
                    <span className="font-medium text-[var(--color-on-surface)]">
                      {formData.checkOut || "—"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-on-surface-variant)]">Guests</span>
                    <span className="font-medium text-[var(--color-on-surface)]">
                      {formData.guests}
                    </span>
                  </div>
                </div>

                <div className="border-t border-[var(--color-outline-variant)] pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[var(--color-on-surface)] font-medium">Total</span>
                    <span className="text-2xl font-display font-bold text-[var(--color-primary)]">
                      ${calculateTotal()}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--color-on-surface-variant)]">
                    {formData.checkIn && formData.checkOut && formData.roomType 
                      ? `${Math.ceil((new Date(formData.checkOut).getTime() - new Date(formData.checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights`
                      : "Select dates to see total"}
                  </p>
                </div>

                <div className="mt-6 p-4 bg-[var(--color-surface-low)] rounded-[var(--radius-lg)]">
                  <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <div>
                      <p className="text-sm font-medium text-[var(--color-on-surface)]">Free Cancellation</p>
                      <p className="text-xs text-[var(--color-on-surface-variant)]">
                        Cancel up to 24 hours before check-in for a full refund.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="section-padding bg-[var(--color-surface-low)]">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h3 className="title-md text-[var(--color-on-surface)] mb-2">Check-in / Check-out</h3>
              <p className="text-[var(--color-on-surface-variant)] body-md">
                Check-in from 2 PM, Check-out until 11 AM. Late check-out available upon request.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </div>
              <h3 className="title-md text-[var(--color-on-surface)] mb-2">Contact Us</h3>
              <p className="text-[var(--color-on-surface-variant)] body-md">
                Need help? Call us at +212 612 236 660 or email sekoutiabdelaziz0@gmail.com
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[var(--color-primary)]/10 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
              </div>
              <h3 className="title-md text-[var(--color-on-surface)] mb-2">Best Price Guarantee</h3>
              <p className="text-[var(--color-on-surface-variant)] body-md">
                Book direct for the best rates. We match any lower price found elsewhere.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}