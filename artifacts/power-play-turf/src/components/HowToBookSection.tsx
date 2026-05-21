import { Trophy, SearchCheck, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export function HowToBookSection() {
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const steps = [
    {
      num: "01",
      icon: Trophy,
      title: "Choose Sport",
      desc: "Select Cricket, Football, or Badminton."
    },
    {
      num: "02",
      icon: SearchCheck,
      title: "Pick Slot",
      desc: "Find an available date and time."
    },
    {
      num: "03",
      icon: MessageCircle,
      title: "Confirm & Play",
      desc: "Send your details via WhatsApp to lock it in."
    }
  ];

  return (
    <section className="py-24 bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
            3 STEPS TO THE PITCH
          </h2>
          <div className="h-1.5 w-24 bg-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto mb-16 relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-[15%] right-[15%] h-0.5 bg-gray-200 -z-10 -translate-y-8"></div>
          
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white border-4 border-gray-100 rounded-full flex items-center justify-center relative mb-6 shadow-lg z-10 group hover:border-primary transition-colors duration-300">
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center font-bold text-sm">
                  {step.num}
                </span>
                <step.icon size={40} className="text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-wide text-secondary mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={() => scrollTo('book')}
            size="lg"
            className="h-16 px-10 bg-primary hover:bg-primary/90 text-white font-black text-xl uppercase tracking-widest rounded-none shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          >
            Book Your Slot Now
          </Button>
        </div>
      </div>
    </section>
  );
}
