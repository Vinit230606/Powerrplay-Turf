import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import gallery1 from "../assets/images/gallery-1.png";
import gallery2 from "../assets/images/gallery-2.png";
import gallery3 from "../assets/images/gallery-3.png";
import gallery4 from "../assets/images/gallery-4.png";
import gallery5 from "../assets/images/gallery-5.png";
import gallery6 from "../assets/images/gallery-6.png";

const images = [
  { id: 1, src: gallery1, alt: "Cricket batting under floodlights", category: "cricket" },
  { id: 2, src: gallery2, alt: "Football team celebrating", category: "football" },
  { id: 3, src: gallery3, alt: "Badminton smash action", category: "badminton" },
  { id: 4, src: gallery4, alt: "Aerial view of facility", category: "all" },
  { id: 5, src: gallery5, alt: "Corporate event on turf", category: "all" },
  { id: 6, src: gallery6, alt: "Cricket bowling action", category: "cricket" }
];

export function GallerySection() {
  const [filter, setFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredImages = filter === "all" 
    ? images 
    : images.filter(img => img.category === filter || img.category === "all");

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
    }
  };
  
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
            SEE IT TO BELIEVE IT
          </h2>
          <div className="h-1.5 w-24 bg-primary mx-auto mb-8"></div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {["all", "cricket", "football", "badminton"].map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-all ${
                  filter === category 
                    ? "bg-secondary text-white border-secondary" 
                    : "bg-transparent text-secondary border-gray-200 hover:border-secondary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredImages.map((img, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                key={img.id}
                className="relative aspect-square overflow-hidden cursor-pointer group bg-gray-100"
                onClick={() => openLightbox(index)}
              >
                <img 
                  src={img.src} 
                  alt={img.alt} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white opacity-0 group-hover:opacity-100 font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-all duration-300">View</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-16 text-center">
          <a 
            href="https://instagram.com/power_playturf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-lg font-bold text-secondary hover:text-primary transition-colors border-b-2 border-secondary hover:border-primary pb-1 uppercase tracking-widest"
          >
            Follow us @power_playturf
          </a>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
              <X size={32} />
            </button>
            
            <button className="absolute left-4 md:left-10 text-white/50 hover:text-white p-2" onClick={prevImage}>
              <ChevronLeft size={48} />
            </button>
            
            <div className="relative max-w-5xl max-h-[80vh] w-full" onClick={e => e.stopPropagation()}>
              <img 
                src={filteredImages[lightboxIndex].src} 
                alt={filteredImages[lightboxIndex].alt} 
                className="w-full h-full object-contain"
              />
              <p className="text-center text-white/70 mt-4 text-sm uppercase tracking-widest">{filteredImages[lightboxIndex].alt}</p>
            </div>
            
            <button className="absolute right-4 md:right-10 text-white/50 hover:text-white p-2" onClick={nextImage}>
              <ChevronRight size={48} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
