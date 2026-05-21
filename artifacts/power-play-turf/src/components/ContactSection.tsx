import { MapPin, Phone, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { CONTACT, OPERATING_HOURS, buildWhatsAppContactUrl } from "@/config/site";

export function ContactSection() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const message = String(formData.get("message") ?? "");
    window.open(buildWhatsAppContactUrl(name, message), "_blank");
  };

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
            FIND US. REACH US. <span className="text-primary">PLAY WITH US.</span>
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-gray-600">Have a question for bulk booking or tournaments? Reach out to us.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white shadow-xl overflow-hidden border border-gray-100">
          
          {/* Contact Info & Form */}
          <div className="p-8 md:p-12">
            <h3 className="text-2xl font-bold uppercase tracking-wide text-secondary mb-8">Get In Touch</h3>
            
            <form onSubmit={handleSubmit} className="space-y-4 mb-12">
              <Input name="name" placeholder="Your Name" required className="h-12 rounded-none border-gray-300 focus-visible:ring-primary" />
              <Input name="phone" placeholder="Phone Number" required className="h-12 rounded-none border-gray-300 focus-visible:ring-primary" />
              <Textarea name="message" placeholder="How can we help?" required className="min-h-[120px] rounded-none border-gray-300 focus-visible:ring-primary" />
              <Button type="submit" className="w-full h-12 bg-secondary hover:bg-secondary/90 text-white font-bold uppercase tracking-wider rounded-none">
                Send Message via WhatsApp
              </Button>
            </form>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary uppercase mb-1">Location</h4>
                  <p className="text-gray-600">{CONTACT.address.line1},<br />{CONTACT.address.line2}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary uppercase mb-1">Call Us</h4>
                  <a href={`tel:${CONTACT.phoneE164}`} className="text-gray-600 hover:text-primary transition-colors">{CONTACT.phoneDisplay}</a>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Clock className="text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="font-bold text-secondary uppercase mb-1">Hours</h4>
                  <p className="text-gray-600">{OPERATING_HOURS.weekday.label}<br />{OPERATING_HOURS.weekend.label}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[400px] lg:h-auto relative">
            <iframe 
              src={CONTACT.maps.embedUrl} 
              className="absolute inset-0 w-full h-full border-0" 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Power Play Turf Location Map"
            ></iframe>
            
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-full px-6">
              <a 
                href={CONTACT.maps.directionsUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-white h-14 font-bold uppercase tracking-wider shadow-lg transition-colors"
              >
                Get Directions
              </a>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
