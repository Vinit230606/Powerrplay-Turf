# 🚀 Vercel Deployment Guide - Power Play Turf

## Prerequisites
- ✅ Vercel account (sign up free at vercel.com)
- ✅ GitHub repository with this code
- ✅ PostgreSQL database (on Railway, Supabase, or similar)
- ✅ Razorpay account with test/live keys

---

## Step 1: Prepare Database

### Option A: Use Supabase (Recommended for Vercel)
1. Go to https://supabase.com
2. Create new project
3. In Project Settings → Database → Connection Pooling → Enable "Session"
4. Copy the **Connection String** (with pooling)
5. Save as `DATABASE_URL` for later

### Option B: Use Railway
1. Go to https://railway.app
2. Create PostgreSQL database
3. Copy connection string from "Public Domain" section
4. Save as `DATABASE_URL` for later

---

## Step 2: Get Razorpay Keys

1. Go to https://dashboard.razorpay.com/#/app/keys
2. Get **Key ID** (public, starts with `rzp_test_` or `rzp_live_`)
3. Get **Key Secret** (secret, keep safe!)
4. Save both for later

---

## Step 3: Deploy to Vercel

### Method 1: Via CLI (Recommended)

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Navigate to project root
cd /path/to/powerplay-turf

# 3. Deploy
vercel --prod

# 4. During deployment, add environment variables:
# When prompted, enter:
# - DATABASE_URL: [your PostgreSQL URL]
# - RAZORPAY_KEY_ID: [your key ID]
# - RAZORPAY_KEY_SECRET: [your key secret]
```

### Method 2: Via GitHub (Easier)

1. Push code to GitHub:
   ```bash
   git push origin main
   ```

2. Go to https://vercel.com/new

3. Select "Import Git Repository"

4. Find and select your repo

5. Click "Deploy"

6. After deployment starts, go to Project Settings → Environment Variables

7. Add these variables:
   ```
   DATABASE_URL = postgresql://...
   RAZORPAY_KEY_ID = rzp_test_xxxxxx
   RAZORPAY_KEY_SECRET = xxxxxxx
   ```

8. Re-deploy from the Deployments tab

---

## Step 4: Configure Environment Variables

### In Vercel Dashboard:

1. Go to your project → Settings → Environment Variables

2. Add these variables:

   | Variable | Value | Type |
   |----------|-------|------|
   | `DATABASE_URL` | `postgresql://user:pass@host/db?sslmode=require` | Secret |
   | `RAZORPAY_KEY_ID` | `rzp_test_xxxxx` or `rzp_live_xxxxx` | Public |
   | `RAZORPAY_KEY_SECRET` | Your secret key | Secret |
   | `NODE_ENV` | `production` | Public |
   | `LOG_LEVEL` | `info` | Public |
   | `PORT` | `3000` | Public |
   | `BASE_PATH` | `/` | Public |

3. **Important**: Make sure "Include in Source Files" is checked

4. Redeploy: Deployments → [Latest] → Redeploy

---

## Step 5: Test Deployment

1. Wait for deployment to complete (look for "Production" status)

2. Visit your deployed URL

3. Test the website:
   - ✅ Load homepage
   - ✅ View sports cards
   - ✅ Click "Book Now"
   - ✅ Try booking a slot
   - ✅ Complete Razorpay payment

4. Check logs if issues:
   ```bash
   vercel logs [deployment-url]
   ```

---

## Common Issues & Fixes

### Issue: 404 on API calls
- **Cause**: `VITE_API_URL` not set or incorrect
- **Fix**: Check Environment Variables, ensure it's empty (for same-origin) or set to API domain

### Issue: Database connection fails
- **Cause**: Wrong connection string or firewall
- **Fix**: 
  - Verify `DATABASE_URL` is correct
  - Add Vercel IP to database firewall (if needed)
  - Test locally: `psql $DATABASE_URL`

### Issue: Payment fails
- **Cause**: Wrong Razorpay keys
- **Fix**: 
  - Verify keys are not reversed (KEY_ID vs KEY_SECRET)
  - Use test keys (`rzp_test_*`) first

### Issue: Build fails with "PORT not found"
- **Fix**: Already fixed in code! Should work now.

### Issue: Slow first request
- **Cause**: Cold start (normal for serverless)
- **Fix**: No action needed, second request is faster

---

## Monitoring & Maintenance

### View Logs
```bash
vercel logs -f
```

### Check Deployment Status
```bash
vercel list
```

### Rollback to Previous Version
```bash
vercel rollback
```

### Add Custom Domain
1. Vercel Dashboard → Settings → Domains
2. Add your domain
3. Update DNS records (Vercel provides instructions)

---

## Production Checklist

- [ ] Database is PostgreSQL with connection pooling
- [ ] All environment variables are set (DATABASE_URL, RAZORPAY keys)
- [ ] Using Razorpay LIVE keys (not test keys)
- [ ] Custom domain configured (if applicable)
- [ ] HTTPS is enabled (automatic on Vercel)
- [ ] Tested booking flow end-to-end
- [ ] Checked error logs in Vercel Dashboard
- [ ] Set up monitoring/alerts (optional)

---

## Support

- **Vercel Docs**: https://vercel.com/docs
- **Razorpay Integration**: https://razorpay.com/docs/payments/
- **PostgreSQL on Vercel**: https://vercel.com/docs/storage/postgres

