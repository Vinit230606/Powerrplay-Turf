import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getMaxDailySlotCount } from "@/config/site";

function Counter({ end, suffix = "", duration = 2 }: { end: number, suffix?: string, duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime: number;
      let animationFrame: number;

      const animate = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        
        // Easing function (easeOutExpo)
        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        
        setCount(Math.floor(easeOut * end));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
    return;
  }, [end, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export function StatsSection() {
  const stats = [
    { value: 3, label: "Premium Sports" },
    { value: 500, suffix: "+", label: "Matches Played" },
    { value: 7, label: "Days a Week" },
    { value: getMaxDailySlotCount(), label: "Hours of Play" }
  ];

  return (
    <section className="bg-primary py-16 border-y-4 border-accent">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-black text-accent font-heading mb-2 drop-shadow-md">
                <Counter end={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-sm md:text-base font-bold text-white uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
