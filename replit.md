# Power Play Turf

Marketing and booking website for a multi-sport turf facility in Laxmipura, Vadodara. Visitors browse sports and amenities, book time slots, and pay online via Razorpay.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm --filter @workspace/power-play-turf run dev` — run the frontend (requires `PORT` and `BASE_PATH` env)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL`, `RAZORPAY_KEY_ID`, `RAZORPAY_KEY_SECRET`

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React 19, Vite 7, Tailwind CSS 4, Framer Motion
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Payments: Razorpay
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle for API)

## Where things live

| Area | Path |
|------|------|
| Site copy, pricing, hours (source of truth) | [`lib/site-config/src/index.ts`](lib/site-config/src/index.ts) |
| Human-readable site brief | [`WEBSITE_DETAILS.md`](WEBSITE_DETAILS.md) |
| Marketing UI | [`artifacts/power-play-turf/src/`](artifacts/power-play-turf/src/) |
| Booking API | [`artifacts/api-server/src/routes/bookings.ts`](artifacts/api-server/src/routes/bookings.ts) |
| OpenAPI contract | [`lib/api-spec/openapi.yaml`](lib/api-spec/openapi.yaml) |
| DB schema | [`lib/db/src/schema/bookings.ts`](lib/db/src/schema/bookings.ts) |

## Architecture decisions

- Business facts (contact, hours, pricing, sports) live in `@workspace/site-config` and are imported by both the API and the React app to avoid copy drift.
- Slot availability and Razorpay orders are server-authoritative; the UI only displays slots returned by the API.
- Evening pricing applies to slots starting at 18:00 or later.
- WhatsApp is for enquiries; paid bookings use Razorpay on the website.

## Product

- Single-page site: hero, sports, amenities, gallery, testimonials, about, contact
- Online booking for cricket, football, and badminton with live slot availability
- Razorpay checkout and instant confirmation reference (`PPT-XXXX`)
- WhatsApp contact form and floating chat button for general questions

## User preferences

- Canonical business details: [`WEBSITE_DETAILS.md`](WEBSITE_DETAILS.md) and [`lib/site-config`](lib/site-config)
- Do not duplicate pricing or hours in components; import from `@/config/site` or `@workspace/site-config`

## Gotchas

- Frontend dev requires `PORT` and `BASE_PATH` (see `vite.config.ts`)
- Run `pnpm --filter @workspace/api-spec run codegen` after changing `openapi.yaml`
- Razorpay keys must be set for booking flows to work end-to-end

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
