import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Elevated Nomad | Boutique Riad & Hostel",
  description: "Experience authentic Moroccan hospitality in our curated riad. Book your stay or manage reservations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-[var(--color-outline-variant)]" style={{ borderBottom: '1px solid rgba(189, 201, 200, 0.2)' }}>
          <div className="container-custom">
            <nav className="flex items-center justify-between h-20">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EN</span>
                </div>
                <span className="font-display text-xl font-bold text-[var(--color-on-surface)]">
                  The Elevated Nomad
                </span>
              </Link>
              
              <div className="hidden md:flex items-center gap-8">
                <Link href="/" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-medium">
                  Home
                </Link>
                <Link href="/rooms" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-medium">
                  Rooms
                </Link>
                <Link href="/booking" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-medium">
                  Book Now
                </Link>
                <Link href="/admin" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors font-medium">
                  Admin
                </Link>
              </div>

              <Link href="/booking" className="btn-primary hidden md:inline-flex">
                Reserve Now
              </Link>

              <button className="md:hidden p-2" aria-label="Menu">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </button>
            </nav>
          </div>
        </header>

        <main className="flex-1 pt-20">
          {children}
        </main>

        <footer className="bg-[var(--color-surface-high)] mt-24">
          <div className="container-custom section-padding">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="md:col-span-2">
                <Link href="/" className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[var(--color-primary)] flex items-center justify-center">
                    <span className="text-white font-bold text-lg">EN</span>
                  </div>
                  <span className="font-display text-xl font-bold text-[var(--color-on-surface)]">
                    The Elevated Nomad
                  </span>
                </Link>
                <p className="text-[var(--color-on-surface-variant)] body-md max-w-md">
                  A boutique riad experience in the heart of Morocco. Where traditional hospitality meets modern luxury.
                </p>
              </div>

              <div>
                <h4 className="title-md mb-4 text-[var(--color-on-surface)]">Quick Links</h4>
                <ul className="space-y-3">
                  <li>
                    <Link href="/rooms" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors body-md">
                      Our Rooms
                    </Link>
                  </li>
                  <li>
                    <Link href="/booking" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors body-md">
                      Book Your Stay
                    </Link>
                  </li>
                  <li>
                    <Link href="/admin" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors body-md">
                      Admin Portal
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="title-md mb-4 text-[var(--color-on-surface)]">Contact</h4>
                <ul className="space-y-3 text-[var(--color-on-surface-variant)] body-md">
                  <li>Marrakech, Medina</li>
                  <li>Morocco</li>
                  <li>hello@elevatednomad.com</li>
                  <li>+212 524 123 456</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-[var(--color-outline-variant)] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[var(--color-on-surface-variant)] body-md">
                © 2024 The Elevated Nomad. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
                  Instagram
                </a>
                <a href="#" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-[var(--color-on-surface-variant)] hover:text-[var(--color-primary)] transition-colors">
                  Twitter
                </a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}