# ✅ Deployment Checklist - Power Play Turf

## Code Changes Applied ✓

- [x] Environment variable defaults added to `vite.config.ts`
- [x] API base URL initialization in `main.tsx`
- [x] Backend env validation in `index.ts`
- [x] Preinstall script fixed for Windows
- [x] `vercel.json` configured for monorepo
- [x] `.env.example` documentation complete
- [x] `.vercelignore` created
- [x] `.pnpmrc` configured

---

## Before Deploying to Vercel

### Infrastructure Setup
- [ ] **Database**: PostgreSQL set up (Supabase, Railway, or similar)
  - [ ] Connection string copied (with pooling if available)
  - [ ] Database name: `powerplay_turf` (or custom)
  - [ ] Test connection locally: `psql $DATABASE_URL`

- [ ] **Razorpay Account**: Created and configured
  - [ ] API Key ID obtained (starts with `rzp_test_` or `rzp_live_`)
  - [ ] API Key Secret obtained (keep secret!)
  - [ ] Test payments verified locally (if using test keys)

### Code Review
- [ ] No hardcoded secrets in code
- [ ] `.env.local` and `.env` files in `.gitignore`
- [ ] All `process.env.*` accessed with defaults
- [ ] API endpoint correctly resolves in frontend
- [ ] Database migrations (if any) documented

### Vercel Setup
- [ ] Vercel account created
- [ ] GitHub repo connected to Vercel
- [ ] Project created in Vercel dashboard
- [ ] Build settings verified
  - [ ] Install Command: `pnpm install --frozen-lockfile`
  - [ ] Build Command: `pnpm run build`
  - [ ] Output Directory: `artifacts/power-play-turf/dist/public`

---

## Deployment Steps

1. **Set Environment Variables in Vercel Dashboard**
   ```
   DATABASE_URL = postgresql://...
   RAZORPAY_KEY_ID = rzp_test_xxxxx or rzp_live_xxxxx
   RAZORPAY_KEY_SECRET = your_secret_key
   NODE_ENV = production
   LOG_LEVEL = info
   ```

2. **Trigger Deployment**
   ```bash
   git push origin main
   # OR manually click "Deploy" in Vercel dashboard
   ```

3. **Monitor Build**
   - [ ] Build succeeds (green checkmark)
   - [ ] No warnings about missing env vars
   - [ ] Runtime: ~5-10 minutes for first build

4. **Test Deployed Application**
   - [ ] Homepage loads
   - [ ] All images/assets display correctly
   - [ ] Sports cards visible
   - [ ] "Book Now" button clickable
   - [ ] Slot availability API works
   - [ ] Razorpay payment opens (test with test keys first)
   - [ ] Booking confirmation appears after payment

---

## Post-Deployment Verification

- [ ] Check Vercel logs for errors
  ```bash
  vercel logs -f [your-domain]
  ```

- [ ] Test API endpoints directly:
  - [ ] `/api/health` returns 200
  - [ ] `/api/bookings/slots` returns available slots
  - [ ] Database connection works (check logs)

- [ ] Frontend connects to backend correctly
  - [ ] Network tab shows API calls to correct URL
  - [ ] No CORS errors in browser console

- [ ] Monitor first few bookings
  - [ ] Payment processing works
  - [ ] Booking records saved to database
  - [ ] Confirmation references generated (`PPT-XXXX`)

---

## Security Checklist

- [ ] Razorpay secret key is NOT visible in frontend code
- [ ] Database password is NOT committed to git
- [ ] All secrets are stored as Vercel Environment Variables (not `.env.local`)
- [ ] HTTPS enabled (automatic on Vercel)
- [ ] CORS configured correctly (should match deployed domain)
- [ ] Production Razorpay keys used (if going live)

---

## Performance Optimization

- [ ] First request takes <5s (cold start normal)
- [ ] Subsequent requests <1s
- [ ] Database connection pooling enabled
- [ ] API responses return `Cache-Control: no-cache` headers
- [ ] Frontend assets are minified and cached

---

## Rollback Plan

If deployment fails:

1. **Check Vercel Logs**
   ```bash
   vercel logs -f
   ```

2. **Common Issues & Fixes**
   - Build fails → Check NODE_ENV, VITE_API_URL
   - Runtime fails → Check DATABASE_URL, RAZORPAY keys
   - 404 errors → Check vercel.json routes

3. **Rollback to Previous**
   ```bash
   vercel rollback
   ```

4. **Re-deploy After Fix**
   ```bash
   git push origin main
   ```

---

## Monitoring & Alerts

- [ ] Set up error tracking (Sentry, LogRocket, etc.)
- [ ] Monitor database connection pool
- [ ] Track payment success/failure rates
- [ ] Set up uptime monitoring
- [ ] Configure email alerts for deployment failures

---

## Documentation & Team Handoff

- [ ] Deployment URL saved
- [ ] Environment variables documented (with masked secrets)
- [ ] Rollback procedure documented
- [ ] Team members have Vercel access
- [ ] Contact info for database provider support

---

## First 48 Hours Post-Launch

- [ ] Monitor errors closely
- [ ] Check real payment processing (test with small amounts)
- [ ] Verify booking data appears in database
- [ ] Test customer support workflows (WhatsApp contact form)
- [ ] Collect feedback from initial users

---

**Status**: 🟢 Ready for Deployment
**Last Updated**: May 21, 2026
**Deployed By**: [Your Name]
**Deployment Date**: [Date]
**Deployment URL**: [Your URL]

