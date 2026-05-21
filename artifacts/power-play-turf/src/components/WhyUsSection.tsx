import { motion } from "framer-motion";
import { ShieldCheck, Zap, CalendarCheck, Layers, CreditCard, Clock } from "lucide-react";
import { OPERATING_HOURS } from "@/config/site";

const usps = [
  {
    icon: Layers,
    title: "Premium Turf Surface",
    description: "Shock-absorbing, FIFA & ICC grade artificial grass that prevents injuries and plays perfectly."
  },
  {
    icon: Zap,
    title: "Floodlit Courts",
    description: "Stadium-grade LED lighting ensures perfect visibility for those high-intensity night games."
  },
  {
    icon: CalendarCheck,
    title: "Easy Booking",
    description: "Check live availability, pay online, and get instant booking confirmation on the website."
  },
  {
    icon: ShieldCheck,
    title: "Safe & Secure",
    description: "CCTV surveillance, clean changing rooms, and first aid always on standby."
  },
  {
    icon: CreditCard,
    title: "Affordable Pricing",
    description: "Premium facilities shouldn't cost a fortune. Honest rates for every sport."
  },
  {
    icon: Clock,
    title: "Open 7 Days",
    description: `Early morning practice or late night matches — ${OPERATING_HOURS.summary.replace("Open 7 days — ", "")}.`
  }
];

export function WhyUsSection() {
  return (
    <section className="py-24 bg-secondary text-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4"
          >
            WHY POWER PLAY TURF?
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "6rem" }}
            viewport={{ once: true }}
            className="h-1.5 bg-primary mx-auto mb-6"
          ></motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {usps.map((usp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 hover:bg-white/10 transition-colors"
            >
              <div className="h-14 w-14 bg-primary/20 flex items-center justify-center mb-6 text-primary">
                <usp.icon size={28} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide mb-3">{usp.title}</h3>
              <p className="text-white/60 leading-relaxed">{usp.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
