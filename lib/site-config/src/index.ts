export type SportId = "cricket" | "football" | "badminton";

export type SportPricing = { day: number; evening: number };

export const SITE = {
  name: "Power Play Turf",
  tagline: "Your Game. Your Ground. Vadodara.",
  heroBadge: "Vadodara's Premier Sports Destination",
  heroSubtitle: "Premium Cricket · Football · Badminton Turf in Laxmipura, Vadodara",
  seo: {
    title: "Power Play Turf | Cricket, Football & Badminton in Vadodara",
    description:
      "Book premium box cricket, 5-a-side football, and badminton courts in Laxmipura, Vadodara. Floodlit turf, online booking, and instant confirmation at Power Play Turf.",
    keywords:
      "Power Play Turf, turf booking Vadodara, box cricket Vadodara, football turf Laxmipura, badminton court Vadodara",
  },
} as const;

export const CONTACT = {
  phoneE164: "+919558923855",
  phoneDisplay: "+91 95589 23855",
  whatsappNumber: "919558923855",
  whatsappUrl: "https://wa.me/919558923855",
  address: {
    line1: "Laxmipura Rd, Opposite Shree Harifarm",
    line2: "Laxmipura, Vadodara, Gujarat 390023",
    short: "Laxmipura Rd, Opp. Shree Harifarm, Vadodara, Gujarat 390023",
  },
  maps: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.9634289052024!2d73.1541!3d22.3175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sPower+Play+Turf!5e0!3m2!1sen!2sin!4v1684000000000!5m2!1sen!2sin",
    directionsUrl: "https://maps.google.com/?q=22.3175,73.1541",
  },
} as const;

export const SOCIAL = {
  instagram: {
    handle: "power_playturf",
    url: "https://instagram.com/power_playturf",
  },
} as const;

/** Last bookable slot starts at closeHour - 1; facility open through closeHour. */
export const OPERATING_HOURS = {
  weekday: { openHour: 6, closeHour: 22, label: "Mon–Fri: 6 AM – 10 PM" },
  weekend: { openHour: 5, closeHour: 23, label: "Sat–Sun: 5 AM – 11 PM" },
  summary: "Open 7 days — 6 AM–10 PM weekdays, 5 AM–11 PM weekends",
} as const;

export const EVENING_HOUR_THRESHOLD = 18;

export const PRICING: Record<SportId, SportPricing> = {
  cricket: { day: 800, evening: 1100 },
  football: { day: 900, evening: 1200 },
  badminton: { day: 300, evening: 400 },
};

export const SPORTS: Array<{
  id: SportId;
  name: string;
  footerName: string;
  description: string;
}> = [
  {
    id: "cricket",
    name: "Box Cricket",
    footerName: "Box Cricket",
    description:
      "Premium artificial turf with professional netting and powerful floodlights for the perfect night game.",
  },
  {
    id: "football",
    name: "5/7-a-side Football",
    footerName: "5-a-side Football",
    description:
      "FIFA-quality astroturf. Fast-paced, high-energy games on a surface built for performance and safety.",
  },
  {
    id: "badminton",
    name: "Pro Badminton",
    footerName: "Badminton",
    description:
      "Synthetic wooden-finish indoor courts with anti-glare lighting and shock-absorbing flooring.",
  },
];

export function isWeekendDay(day: number): boolean {
  return day === 0 || day === 6;
}

export function getHoursForDate(date: Date): { openHour: number; closeHour: number } {
  return isWeekendDay(date.getDay())
    ? OPERATING_HOURS.weekend
    : OPERATING_HOURS.weekday;
}

export function getSlotCountForDate(date: Date): number {
  const { openHour, closeHour } = getHoursForDate(date);
  return closeHour - openHour;
}

export function getMaxDailySlotCount(): number {
  return Math.max(
    OPERATING_HOURS.weekday.closeHour - OPERATING_HOURS.weekday.openHour,
    OPERATING_HOURS.weekend.closeHour - OPERATING_HOURS.weekend.openHour,
  );
}

export function isFacilityOpen(now: Date = new Date()): boolean {
  const hour = now.getHours();
  const { openHour, closeHour } = getHoursForDate(now);
  return hour >= openHour && hour < closeHour;
}

export function getPrice(sport: string, timeSlot: string): number {
  const hour = parseInt(timeSlot.split(":")[0]!, 10);
  const isEvening = hour >= EVENING_HOUR_THRESHOLD;
  const prices = PRICING[sport as SportId];
  if (!prices) throw new Error("Invalid sport");
  return isEvening ? prices.evening : prices.day;
}

export function formatPriceFrom(sport: SportId): string {
  const { day } = PRICING[sport];
  return `From ₹${day}/hr`;
}

export function formatPriceRange(sport: SportId): string {
  const { day, evening } = PRICING[sport];
  return `₹${day}–₹${evening}/hr`;
}

export function generateSlots(dateStr: string): string[] {
  const date = new Date(dateStr);
  const { openHour, closeHour } = getHoursForDate(date);
  const slots: string[] = [];
  for (let h = openHour; h < closeHour; h++) {
    slots.push(`${String(h).padStart(2, "0")}:00`);
  }
  return slots;
}

export function to12h(time24: string): string {
  const [hStr, mStr] = time24.split(":");
  const h = parseInt(hStr!, 10);
  const suffix = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${String(h12).padStart(2, "0")}:${mStr} ${suffix}`;
}

export function buildWhatsAppContactUrl(name: string, message: string): string {
  const text = `Hi, this is ${name}. %0A${message}`;
  return `${CONTACT.whatsappUrl}?text=${text}`;
}
