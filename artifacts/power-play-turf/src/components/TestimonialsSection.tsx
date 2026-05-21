import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "Best turf in Vadodara! The surface is world-class and floodlights make evening games incredible.",
    name: "Raj Patel",
    role: "Weekend Cricket Team"
  },
  {
    text: "Booked for our office team outing — smooth booking, amazing facility. Everyone had a blast!",
    name: "Priya Shah",
    role: "Corporate Group"
  },
  {
    text: "My go-to for badminton practice. Courts are well-maintained, staff is friendly.",
    name: "Arjun Mehta",
    role: "Badminton Player"
  },
  {
    text: "Perfect 5-a-side football venue. Turf quality is fantastic and pricing is very fair.",
    name: "Rohan Desai",
    role: "Football Team"
  }
];

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    
    // Auto-play
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [emblaApi, onSelect]);

  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none flex items-center justify-center">
        <Quote size={400} className="text-white transform -translate-y-12" />
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4 text-accent"
          >
            WHAT PLAYERS SAY
          </motion.h2>
          <div className="flex justify-center gap-1">
            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={24} className="fill-primary text-primary" />)}
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, index) => (
                <div className="flex-[0_0_100%] min-w-0 px-4 md:px-12" key={index}>
                  <div className="flex flex-col items-center text-center">
                    <p className="text-xl md:text-3xl font-medium leading-relaxed mb-8 italic">
                      "{t.text}"
                    </p>
                    <div className="h-1 w-12 bg-primary mb-6"></div>
                    <h4 className="text-xl font-bold uppercase tracking-widest">{t.name}</h4>
                    <p className="text-white/60">{t.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center gap-3 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === selectedIndex ? "bg-accent scale-125" : "bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
