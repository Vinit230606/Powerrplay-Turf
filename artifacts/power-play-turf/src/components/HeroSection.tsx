import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import heroImg from "../assets/images/hero.png";

export function HeroSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="relative h-[100dvh] min-h-[600px] w-full flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-secondary/70 mix-blend-multiply z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/40 to-transparent z-10" />
        <motion.img
          src={heroImg}
          alt="Power Play Turf at night"
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
        />
      </div>

      <div className="relative z-20 container mx-auto px-4 md:px-6 text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-accent font-bold tracking-widest uppercase text-sm mb-6 backdrop-blur-sm">
            Vadodara's Premier Sports Destination
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white uppercase tracking-tight leading-[1.1] mb-6 drop-shadow-2xl">
            YOUR GAME.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-green-400">YOUR GROUND.</span><br />
            VADODARA.
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto font-medium mb-10 drop-shadow-lg">
            Premium Cricket · Football · Badminton Turf in Laxmipura, Vadodara
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              onClick={() => scrollTo('book')}
              size="lg"
              className="w-full sm:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg uppercase tracking-wider rounded-none"
            >
              Book a Slot
            </Button>
            <Button 
              onClick={() => scrollTo('sports')}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-14 px-8 bg-transparent hover:bg-white/10 text-white border-2 border-white font-bold text-lg uppercase tracking-wider rounded-none"
            >
              Explore Sports
            </Button>
          </div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 cursor-pointer text-white/50 hover:text-white transition-colors"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={() => scrollTo('sports')}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <span className="text-xs font-bold uppercase tracking-widest mb-2">Scroll</span>
          <ChevronDown size={24} />
        </motion.div>
      </motion.div>
    </section>
  );
}
