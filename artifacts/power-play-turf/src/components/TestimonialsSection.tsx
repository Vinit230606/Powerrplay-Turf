import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const testimonials = [
  {
    text: "I recently visited Power Play Turf and had a great experience. The turf is well-maintained, spacious, and perfect for a fun game with friends. The lighting and facilities are good too. Overall, it's a nice spot to enjoy a match and spend quality time.",
    name: "Kripalsinh",
    role: "Local Guide · 55 reviews",
    stars: 5
  },
  {
    text: "Great badminton coaching and nice kind polite owners!",
    name: "Reni Antony",
    role: "Local Guide · 32 reviews",
    stars: 5
  },
  {
    text: "It's amazing experience, close net with well manner grounds. Parking area is good. There is all cricket stuff available needed to play.",
    name: "Shivam Parmar",
    role: "Local Guide · 12 reviews",
    stars: 5
  },
  {
    text: "Excellent place and they provide the accessories for both football and cricket. Overall I am glad to say that the experience is good.",
    name: "Chandreshwar Thakur",
    role: "Google Review",
    stars: 5
  },
  {
    text: "Nice and affordable turf.",
    name: "Trupal Solanki",
    role: "Google Review",
    stars: 5
  },
  {
    text: "Very good.",
    name: "Ashok Mali",
    role: "Google Review",
    stars: 5
  },
  {
    text: "Good place.",
    name: "Yug Patel",
    role: "Google Review",
    stars: 5
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
          <p className="text-white/50 text-sm uppercase tracking-widest">Real Google Reviews</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((t, index) => (
                <div className="flex-[0_0_100%] min-w-0 px-4 md:px-12" key={index}>
                  <div className="flex flex-col items-center text-center">
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: t.stars }).map((_, i) => (
                        <Star key={i} size={20} className="fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-xl md:text-2xl font-medium leading-relaxed mb-8 italic">
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
