# Power Play Turf — Website Details (canonical)

Source of truth for business copy and booking rules: [`lib/site-config/src/index.ts`](lib/site-config/src/index.ts).  
Frontend re-exports: [`artifacts/power-play-turf/src/config/site.ts`](artifacts/power-play-turf/src/config/site.ts).

No separate external brief was provided; this document records the aligned site facts and gaps that were fixed.

## Brand

| Field | Value |
|-------|-------|
| Name | Power Play Turf |
| Tagline | Your Game. Your Ground. Vadodara. |
| Location | Laxmipura Rd, Opposite Shree Harifarm, Laxmipura, Vadodara, Gujarat 390023 |

## Contact

| Channel | Value |
|---------|-------|
| Phone / WhatsApp | +91 95589 23855 |
| WhatsApp link | https://wa.me/919558923855 |
| Instagram | [@power_playturf](https://instagram.com/power_playturf) |

## Sports and pricing (₹/hour)

Evening slots start at **6:00 PM** (hour ≥ 18).

| Sport | Day | Evening |
|-------|-----|---------|
| Box Cricket | 800 | 1100 |
| 5/7-a-side Football | 900 | 1200 |
| Pro Badminton | 300 | 400 |

## Operating hours (bookable slots)

| Schedule | Hours | Bookable slots |
|----------|-------|----------------|
| Mon–Fri | 6 AM – 10 PM | 06:00 … 21:00 |
| Sat–Sun | 5 AM – 11 PM | 05:00 … 22:00 |

## Booking flow

1. Choose sport, date, and time on the website  
2. Pay via Razorpay checkout  
3. Receive instant confirmation (`PPT-XXXX` reference)  

WhatsApp is used for general enquiries and the contact form, not for locking paid slots.

## Gap report (resolved)

| Issue | Was | Now |
|-------|-----|-----|
| Football card price | ₹1000/hr display | ₹900 day (API-aligned `From ₹900/hr`) |
| Contact hours | 6–10 / 5–11 PM only | Matches API slot windows |
| Why Us hours | “5 AM – 11 PM” every day | Weekday/weekend summary from config |
| Stats | “16 Hours Daily” | Max bookable hours from config (18) |
| How to book step 3 | WhatsApp lock-in | Online pay + instant confirmation |
| Why Us easy booking | WhatsApp confirm | Online booking copy |
| SEO meta | “built on Replit” | Vadodara-focused description |
| API vs UI pricing/hours | Duplicated, divergent | Single `@workspace/site-config` package |
