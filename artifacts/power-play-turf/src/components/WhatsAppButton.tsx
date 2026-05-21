import { FaWhatsapp } from "react-icons/fa";
import { CONTACT } from "@/config/site";

export function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[90] flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl hover:scale-110 transition-transform duration-300"
      aria-label="Contact on WhatsApp"
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-75"></div>
      <FaWhatsapp size={36} className="relative z-10" />
    </a>
  );
}
