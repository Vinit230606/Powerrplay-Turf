import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { MdSportsCricket, MdSportsSoccer, MdSportsTennis } from "react-icons/md";
import cricketImg from "../assets/images/cricket.png";
import footballImg from "../assets/images/football.png";
import badmintonImg from "../assets/images/badminton.png";

const sports = [
  {
    id: "cricket",
    name: "Box Cricket",
    description: "Premium artificial turf with professional netting and powerful floodlights for the perfect night game.",
    price: "From ₹800/hr",
    icon: MdSportsCricket,
    image: cricketImg,
    color: "from-green-500/20 to-primary/80"
  },
  {
    id: "football",
    name: "5/7-a-side Football",
    description: "FIFA-quality astroturf. Fast-paced, high-energy games on a surface built for performance and safety.",
    price: "From ₹1000/hr",
    icon: MdSportsSoccer,
    image: footballImg,
    color: "from-blue-500/20 to-blue-900/80"
  },
  {
    id: "badminton",
    name: "Pro Badminton",
    description: "Synthetic wooden-finish indoor courts with anti-glare lighting and shock-absorbing flooring.",
    price: "From ₹300/hr",
    icon: MdSportsTennis,
    image: badmintonImg,
    color: "from-amber-500/20 to-accent/80"
  }
];

export function SportsSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="sports" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
            Three Sports.<br />One Turf.<br />
            <span className="text-primary">Infinite Possibilities.</span>
          </h2>
          <div className="h-1.5 w-24 bg-accent mx-auto mb-6"></div>
          <p className="text-lg text-secondary/70 font-medium">
            Whether you're organizing a corporate tournament or a weekend game with friends, our premium surfaces are ready for action.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sports.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-white overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-primary/50"
            >
              <div className="relative h-64 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-t ${sport.color} mix-blend-multiply z-10 transition-opacity duration-300 group-hover:opacity-80`}></div>
                <img 
                  src={sport.image} 
                  alt={sport.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20 bg-secondary/90 backdrop-blur text-white p-3 rounded-none shadow-lg">
                  <sport.icon size={32} className="text-accent" />
                </div>
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <h3 className="text-2xl font-bold text-secondary uppercase mb-3">{sport.name}</h3>
                <p className="text-secondary/70 flex-grow mb-6">{sport.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                  <span className="font-bold text-lg text-primary">{sport.price}</span>
                  <button 
                    onClick={() => scrollTo('book')}
                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-secondary group-hover:text-primary transition-colors"
                  >
                    Book Slot <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
              
              {/* Animated bottom border on hover */}
              <div className="absolute bottom-0 left-0 h-1 bg-primary w-0 group-hover:w-full transition-all duration-500 ease-out"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
