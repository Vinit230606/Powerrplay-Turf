import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "Sports", id: "sports" },
    { name: "Book Now", id: "book" },
    { name: "Gallery", id: "gallery" },
    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? "bg-secondary py-4 shadow-lg" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => { e.preventDefault(); scrollTo('home'); }}
          className="text-2xl md:text-3xl font-heading font-black tracking-tight text-primary uppercase"
        >
          POWER PLAY TURF
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
              className="text-sm font-semibold text-white/90 hover:text-accent transition-colors uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
          <Button 
            onClick={() => scrollTo('book')}
            className="bg-primary hover:bg-primary/90 text-white font-bold tracking-wide uppercase px-6"
          >
            Book a Slot
          </Button>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-secondary border-t border-white/10 shadow-2xl md:hidden"
        >
          <div className="flex flex-col p-4">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => { e.preventDefault(); scrollTo(link.id); }}
                className="py-4 text-base font-semibold text-white border-b border-white/5 uppercase tracking-wider"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-6 pb-2">
              <Button 
                onClick={() => scrollTo('book')}
                className="w-full bg-primary hover:bg-primary/90 text-white font-bold tracking-wide uppercase h-14 text-lg"
              >
                Book a Slot
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
}
