import Image from "next/image";
import Link from "next/link";

interface Room {
  id: string;
  name: string;
  type: string;
  price: number;
  capacity: number;
  description: string;
  features: string[];
  image: string;
  status: "available" | "occupied";
}

const rooms: Room[] = [
  {
    id: "1",
    name: "Dar Aliyah Suite",
    type: "Suite",
    price: 250,
    capacity: 2,
    description: "Our signature suite featuring a private balcony overlooking the courtyard, king-size bed with Egyptian cotton linens, and a marble en-suite with rain shower.",
    features: ["Private Balcony", "King Bed", "Rain Shower", "Air Conditioning", "Mini Bar", "Room Service"],
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&h=600&fit=crop",
    status: "available"
  },
  {
    id: "2",
    name: "Riad Classic Room",
    type: "Standard",
    price: 120,
    capacity: 2,
    description: "A cozy retreat with traditional zellige tilework, comfortable queen bed, and views of the internal garden from your window.",
    features: ["Garden View", "Queen Bed", "En-Suite", "Air Conditioning", "Free Wi-Fi"],
    image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=800&h=600&fit=crop",
    status: "available"
  },
  {
    id: "3",
    name: "Marrakech Family Room",
    type: "Family",
    price: 180,
    capacity: 4,
    description: "Spacious room perfect for families, featuring two double beds, seating area, and a large bathroom with both tub and shower.",
    features: ["2 Double Beds", "Seating Area", "Bathtub", "Air Conditioning", "Family Friendly"],
    image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop",
    status: "occupied"
  },
  {
    id: "4",
    name: "Terrace Deluxe",
    type: "Deluxe",
    price: 195,
    capacity: 2,
    description: "Experience outdoor living with a private rooftop terrace, queen bed, and stunning views of the Atlas Mountains.",
    features: ["Private Terrace", "Mountain View", "Queen Bed", "Breakfast Included", "Sunset Access"],
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    status: "available"
  },
  {
    id: "5",
    name: "Budget Dorm Room",
    type: "Dorm",
    price: 35,
    capacity: 1,
    description: "Clean and comfortable bunk bed in our shared dormitory. Perfect for budget-conscious travelers seeking social atmosphere.",
    features: ["Bunk Bed", "Shared Bathroom", "Lockers", "Free Wi-Fi", "Luggage Storage"],
    image: "https://images.unsplash.com/photo-1629119882640-c8e2a4d430a7?w=800&h=600&fit=crop",
    status: "available"
  },
  {
    id: "6",
    name: "Couple's Retreat",
    type: "Standard",
    price: 165,
    capacity: 2,
    description: "Romantic room designed for couples, featuring a four-poster bed, candlelit bathroom, and rose petal turndown service.",
    features: ["Four-Poster Bed", "Candle Service", "Couple Bathrobes", "Champagne on Arrival", "Breakfast in Bed"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&h=600&fit=crop",
    status: "available"
  }
];

export default function RoomsPage() {
  return (
    <>
      {/* Header */}
      <section className="relative py-24 bg-(--color-surface)">
        <div className="container-custom">
          <div className="text-center">
            <span className="text-(--color-primary) font-medium tracking-wider uppercase text-sm">
              Accommodations
            </span>
            <h1 className="text-5xl font-display font-bold text-(--color-on-surface) mt-2 mb-4">
              Our Rooms & Suites
            </h1>
            <p className="text-(--color-on-surface-variant) max-w-2xl mx-auto text-lg">
              From traditional riad rooms to luxurious suites, find your perfect sanctuary in the heart of Marrakech.
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-(--color-surface-low) border-b border-(--color-outline-variant)">
        <div className="container-custom">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-3">
              <button className="px-5 py-2.5 rounded-(--radius-lg) bg-(--color-primary) text-white font-medium text-sm">
                All Rooms
              </button>
              <button className="px-5 py-2.5 rounded-(--radius-lg) bg-(--color-surface-lowest) text-(--color-on-surface) font-medium text-sm hover:bg-(--color-surface-variant) transition-colors">
                Suites
              </button>
              <button className="px-5 py-2.5 rounded-(--radius-lg) bg-(--color-surface-lowest) text-(--color-on-surface) font-medium text-sm hover:bg-(--color-surface-variant) transition-colors">
                Standard
              </button>
              <button className="px-5 py-2.5 rounded-(--radius-lg) bg-(--color-surface-lowest) text-(--color-on-surface) font-medium text-sm hover:bg-(--color-surface-variant) transition-colors">
                Dorm
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <span className="text-sm text-(--color-on-surface-variant)">Sort by:</span>
              <select aria-label="Sort rooms by" className="bg-(--color-surface-lowest) border-none rounded-(--radius-lg) px-4 py-2.5 text-(--color-on-surface) focus:ring-2 focus:ring-(--color-primary) outline-none cursor-pointer">
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Capacity</option>
                <option>Newest</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Room Grid */}
      <section className="section-padding bg-(--color-surface)">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rooms.map((room) => (
              <div 
                key={room.id} 
                className="card group overflow-hidden p-0"
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={room.image}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <span className={`status-badge ${room.status === "available" ? "status-available" : "status-occupied"}`}>
                      {room.status === "available" ? "Available" : "Occupied"}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="glass px-3 py-1.5 rounded-full text-sm font-semibold text-(--color-on-surface)">
                      {room.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="title-lg text-(--color-on-surface)">{room.name}</h3>
                    <div className="text-right">
                      <span className="text-2xl font-display font-bold text-(--color-primary)">
                        ${room.price}
                      </span>
                      <span className="text-sm text-(--color-on-surface-variant)">/night</span>
                    </div>
                  </div>

                  <p className="text-(--color-on-surface-variant) body-md mb-4 line-clamp-2">
                    {room.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {room.features.slice(0, 4).map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-2.5 py-1 bg-(--color-surface-low) rounded-full text-xs text-(--color-on-surface-variant)"
                      >
                        {feature}
                      </span>
                    ))}
                    {room.features.length > 4 && (
                      <span className="px-2.5 py-1 bg-(--color-surface-low) rounded-full text-xs text-(--color-on-surface-variant)">
                        +{room.features.length - 4} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-(--color-outline-variant)">
                    <div className="flex items-center gap-2 text-sm text-(--color-on-surface-variant)">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                      </svg>
                      <span>{room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}</span>
                    </div>
                    <Link 
                      href={`/booking?room=${room.id}`}
                      className="btn-primary text-sm py-2.5 px-5"
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="section-padding bg-(--color-surface-low)">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold text-(--color-on-surface) mb-4">
              Riad Amenities
            </h2>
            <p className="text-(--color-on-surface-variant) max-w-2xl mx-auto">
              All guests enjoy access to our shared amenities and services
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { icon: "wifi", name: "Free Wi-Fi" },
              { icon: "pool", name: "Rooftop Pool" },
              { icon: "spa", name: "Hammam" },
              { icon: "restaurant", name: "Restaurant" },
              { icon: "coffee", name: "Breakfast" },
              { icon: "shuttle", name: "Airport Transfer" },
              { icon: "parking", name: "Free Parking" },
              { icon: "concierge", name: "24/7 Concierge" },
              { icon: "laundry", name: "Laundry Service" },
              { icon: "locker", name: "Luggage Storage" },
              { icon: "camera", name: "Tour Desk" },
              { icon: "phone", name: "International Calls" }
            ].map((amenity, idx) => (
              <div key={idx} className="flex flex-col items-center gap-3 p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {amenity.icon === "wifi" && <><path d="M5 12.55a11 11 0 0 1 14.08 0"></path><path d="M1.42 9a16 16 0 0 1 21.16 0"></path><path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path><line x1="12" y1="20" x2="12.01" y2="20"></line></>}
                    {amenity.icon === "pool" && <><path d="M2 12h20"></path><path d="M2 20h20"></path><path d="M12 2v5"></path><path d="M12 17v5"></path></>}
                    {amenity.icon === "spa" && <><circle cx="12" cy="12" r="10"></circle><path d="M12 8v8"></path><path d="M8 12h8"></path></>}
                    {amenity.icon === "restaurant" && <><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"></path><path d="M7 2v20"></path><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"></path></>}
                    {amenity.icon === "coffee" && <><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></>}
                    {amenity.icon === "shuttle" && <><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></>}
                    {amenity.icon === "parking" && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="3" x2="9" y2="21"></line></>}
                    {amenity.icon === "concierge" && <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></>}
                    {amenity.icon === "laundry" && <><path d="M9 11l3 3L22 4"></path><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></>}
                    {amenity.icon === "locker" && <><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></>}
                    {amenity.icon === "camera" && <><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></>}
                    {amenity.icon === "phone" && <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></>}
                  </svg>
                </div>
                <span className="text-sm font-medium text-(--color-on-surface)">{amenity.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-(--color-surface)">
        <div className="container-custom">
          <div className="bg-(--color-surface-low) rounded-(--radius-xl) p-12 text-center">
            <h2 className="text-3xl font-display font-bold text-(--color-on-surface) mb-4">
              Can{"'"}t find what you{"'"}re looking for?
            </h2>
            <p className="text-(--color-on-surface-variant) mb-8 max-w-xl mx-auto">
              Contact our team directly and we{"'"}ll help you find the perfect room for your stay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/booking" className="btn-primary">
                Contact Us
              </Link>
              <a href="tel:+212612236660" className="btn-tertiary">
                +212 612 236 660
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}