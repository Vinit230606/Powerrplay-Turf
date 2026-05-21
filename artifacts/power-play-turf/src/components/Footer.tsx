import { Instagram, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  const scrollTo = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-secondary pt-20 pb-10 text-white/80 border-t-4 border-primary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          
          <div className="lg:col-span-1">
            <a href="#home" onClick={(e) => scrollTo('home', e)} className="text-2xl font-heading font-black tracking-tight text-white uppercase mb-4 inline-block">
              POWER PLAY <span className="text-primary">TURF</span>
            </a>
            <p className="mb-6 font-medium italic">"Your Game. Your Ground. Vadodara."</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/power_playturf" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors text-white">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Sports', 'Gallery', 'About', 'Contact'].map(link => (
                <li key={link}>
                  <a 
                    href={`#${link.toLowerCase()}`} 
                    onClick={(e) => scrollTo(link.toLowerCase(), e)}
                    className="hover:text-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6">Sports</h4>
            <ul className="space-y-3">
              <li><a href="#book" onClick={(e) => scrollTo('book', e)} className="hover:text-primary transition-colors">Box Cricket</a></li>
              <li><a href="#book" onClick={(e) => scrollTo('book', e)} className="hover:text-primary transition-colors">5-a-side Football</a></li>
              <li><a href="#book" onClick={(e) => scrollTo('book', e)} className="hover:text-primary transition-colors">Badminton</a></li>
              <li><a href="#contact" onClick={(e) => scrollTo('contact', e)} className="hover:text-primary transition-colors">Corporate Booking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white uppercase tracking-wider mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={20} className="text-primary shrink-0 mt-0.5" />
                <span>Laxmipura Rd, Opp. Shree Harifarm, Vadodara, Gujarat 390023</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={20} className="text-primary shrink-0" />
                <a href="tel:+919558923855" className="hover:text-white transition-colors">+91 95589 23855</a>
              </li>
            </ul>
          </div>
          
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} Power Play Turf. All rights reserved.</p>
          <p>Designed for the Love of Sport</p>
        </div>
      </div>
    </footer>
  );
}
