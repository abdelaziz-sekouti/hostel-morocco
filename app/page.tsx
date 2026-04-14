import Link from "next/link";
import Image from "next/image";

const experiences = [
  {
    id: 1,
    title: "Sunset Rooftop Views",
    description: "Experience magical sunsets over the Atlas Mountains from our panoramic rooftop terrace.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    icon: "sunset"
  },
  {
    id: 2,
    title: "Traditional Hammam",
    description: "Rejuvenate your body and soul with our authentic Moroccan steam bath and spa treatments.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    icon: "spa"
  },
  {
    id: 3,
    title: "Moroccan Cooking Class",
    description: "Learn the secrets of tagine and couscous from our master chef in our interactive cooking workshops.",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&h=400&fit=crop",
    icon: "cooking"
  },
  {
    id: 4,
    title: "Medina Walking Tour",
    description: "Explore the ancient winding streets of Marrakech with our knowledgeable local guides.",
    image: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&h=400&fit=crop",
    icon: "tour"
  }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop"
            alt="Riad courtyard"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-(--color-on-surface)/80 via-(--color-on-surface)/40 to-transparent"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-2xl">
            <span className="inline-block text-(--color-secondary-container) font-medium tracking-wider uppercase mb-4">
              Welcome to The Elevated Nomad
            </span>
            <h1 className="display-lg text-white mb-6">
              Where Moroccan Heritage Meets Modern Luxury
            </h1>
            <p className="text-xl text-white/80 mb-8 leading-relaxed">
              Escape to our boutique riad in the heart of Marrakech{"'"}s ancient medina. 
              Experience authentic hospitality with contemporary comfort.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/booking" className="btn-primary text-center">
                Book Your Stay
              </Link>
              <Link href="/rooms" className="btn-secondary text-center">
                Explore Rooms
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-(--color-surface-lowest) py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-(--color-primary) mb-2">15+</div>
              <div className="text-(--color-on-surface-variant)">Luxury Rooms</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-(--color-primary) mb-2">10k+</div>
              <div className="text-(--color-on-surface-variant)">Happy Guests</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-(--color-primary) mb-2">4.9</div>
              <div className="text-(--color-on-surface-variant)">Guest Rating</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-(--color-primary) mb-2">5★</div>
              <div className="text-(--color-on-surface-variant)">Hotel Rating</div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Carousel */}
      <section className="section-padding bg-(--color-surface)">
        <div className="container-custom">
          <div className="text-center mb-16">
            <span className="text-(--color-primary) font-medium tracking-wider uppercase text-sm">
              Experiences
            </span>
            <h2 className="text-4xl font-display font-bold text-(--color-on-surface) mt-2 mb-4">
              Discover the Magic of Morocco
            </h2>
            <p className="text-(--color-on-surface-variant) max-w-2xl mx-auto">
              From rooftop sunsets to traditional hammams, we curate unforgettable experiences that showcase the best of Moroccan culture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {experiences.map((exp, index) => (
              <div 
                key={exp.id} 
                className="group relative overflow-hidden rounded-(--radius-xl)"
              >
                <div className="aspect-3/4 relative">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-(--color-on-surface)/90 via-transparent to-transparent"></div>
                </div>
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="glass rounded-(--radius-lg) p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <h3 className="title-lg text-white mb-2">{exp.title}</h3>
                    <p className="text-white/70 body-md">{exp.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rooms Preview */}
      <section className="section-padding bg-(--color-surface-low)">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="lg:w-1/2">
              <span className="text-(--color-primary) font-medium tracking-wider uppercase text-sm">
                Our Rooms
              </span>
              <h2 className="text-4xl font-display font-bold text-(--color-on-surface) mt-2 mb-6">
                Sanctuary of Calm
              </h2>
              <p className="text-(--color-on-surface-variant) mb-6 leading-relaxed">
                Each of our 15+ rooms tells a story of traditional Moroccan craftsmanship combined with modern comfort. From cozy private rooms to spacious suites, find your perfect retreat.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-(--color-on-surface)">Traditional zellige tilework</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-(--color-on-surface)">Hand-carved cedar furniture</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-(--color-on-surface)">Modern en-suite bathrooms</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <span className="text-(--color-on-surface)">Private rooftop access</span>
                </li>
              </ul>
              <Link href="/rooms" className="btn-primary inline-block">
                View All Rooms
              </Link>
            </div>

            <div className="lg:w-1/2 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-4/5 rounded-(--radius-xl) overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=400&h=500&fit=crop"
                    alt="Room interior"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-square rounded-(--radius-xl) overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop"
                    alt="Bathroom"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative aspect-square rounded-(--radius-xl) overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&h=400&fit=crop"
                    alt="Bedroom"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative aspect-4/5 rounded-(--radius-xl) overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=500&fit=crop"
                    alt="Terrace"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-(--color-primary) relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-6">
            Ready for Your Moroccan Adventure?
          </h2>
          <p className="text-white/80 text-xl mb-8 max-w-2xl mx-auto">
            Book your stay today and discover why The Elevated Nomad is Marrakech{"'"}s most sought-after boutique riad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/booking" className="bg-white text-(--color-primary) px-8 py-4 rounded-(--radius-lg) font-semibold hover:bg-white/90 transition-colors">
              Reserve Now
            </Link>
            <Link href="/rooms" className="border-2 border-white text-white px-8 py-4 rounded-(--radius-lg) font-semibold hover:bg-white/10 transition-colors">
              View Rooms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}