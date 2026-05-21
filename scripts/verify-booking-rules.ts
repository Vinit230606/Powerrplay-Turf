import {
  generateSlots,
  getPrice,
  PRICING,
  getMaxDailySlotCount,
} from "../lib/site-config/src/index.ts";

function assert(condition: boolean, message: string): void {
  if (!condition) throw new Error(message);
}

const weekdaySlots = generateSlots("2026-05-21");
assert(weekdaySlots[0] === "06:00", "weekday first slot");
assert(weekdaySlots.at(-1) === "21:00", "weekday last slot");
assert(weekdaySlots.length === 16, "weekday slot count");

const weekendSlots = generateSlots("2026-05-23");
assert(weekendSlots[0] === "05:00", "weekend first slot");
assert(weekendSlots.at(-1) === "22:00", "weekend last slot");
assert(weekendSlots.length === 18, "weekend slot count");

assert(getPrice("cricket", "10:00") === PRICING.cricket.day, "cricket day price");
assert(getPrice("cricket", "18:00") === PRICING.cricket.evening, "cricket evening price");
assert(getPrice("football", "12:00") === 900, "football day price");
assert(getPrice("football", "19:00") === 1200, "football evening price");
assert(getPrice("badminton", "14:00") === 300, "badminton day price");
assert(getPrice("badminton", "20:00") === 400, "badminton evening price");
assert(getMaxDailySlotCount() === 18, "max daily hours");

console.log("All booking rule checks passed.");
