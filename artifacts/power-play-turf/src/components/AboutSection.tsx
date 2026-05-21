import { motion } from "framer-motion";
import { Award, Zap, Shield, Waves } from "lucide-react";

export function AboutSection() {
  const amenities = [
    { name: "Floodlit Courts", icon: Zap },
    { name: "Premium Turf", icon: Waves },
    { name: "Parking", icon: Shield }, // using shield as generic icon if precise not available or stick to generic
    { name: "Changing Rooms", icon: Award },
    { name: "Drinking Water", icon: Waves },
    { name: "CCTV", icon: Shield },
    { name: "Equipment Rental", icon: Award },
    { name: "First Aid", icon: Shield },
  ];

  return (
    <section id="about" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-6">
              WHERE CHAMPIONS TRAIN AND FRIENDS PLAY.
            </h2>
            <div className="h-1.5 w-24 bg-primary mb-8"></div>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p>
                Power Play Turf was born from a simple belief — sport should be accessible to everyone in Vadodara. 
                Located in the heart of Laxmipura, we've built a world-class multi-sport facility where weekend warriors, 
                school teams, corporate groups, and serious athletes all feel at home.
              </p>
              <p>
                We don't just rent out grass; we provide an experience. From FIFA-certified astroturf to stadium-grade 
                floodlights, every inch of our facility is designed for performance, safety, and the pure joy of the game.
              </p>
            </div>
            
            <div className="mt-10 flex items-center gap-4 bg-gray-50 p-4 border-l-4 border-accent">
              <div className="font-bold text-secondary uppercase tracking-wider text-sm">
                Proudly listed on
              </div>
              <div className="bg-white px-4 py-2 font-black text-blue-800 italic shadow-sm">
                CricHeroes
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-secondary text-white p-8 md:p-12 shadow-2xl relative"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -z-0"></div>
            
            <h3 className="text-2xl font-bold uppercase tracking-wider mb-8 relative z-10">Facility Highlights</h3>
            
            <div className="grid grid-cols-2 gap-x-4 gap-y-6 relative z-10">
              {amenities.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-primary"><item.icon size={20} /></div>
                  <span className="font-medium tracking-wide text-sm sm:text-base">{item.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center relative z-10">
              <div>
                <div className="text-4xl font-black text-accent mb-1">3</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Sport Zones</div>
              </div>
              <div className="h-12 w-px bg-white/10"></div>
              <div>
                <div className="text-4xl font-black text-accent mb-1">10k+</div>
                <div className="text-xs uppercase tracking-widest text-white/60">Sq Ft Area</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
