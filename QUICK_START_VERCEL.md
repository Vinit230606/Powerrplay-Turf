# ⚡ QUICK START - Deploy Power Play Turf to Vercel

**Total time: 30 minutes**

---

## 📋 Have This Ready

1. **PostgreSQL Database**
   - Supabase: https://supabase.com → Create project → Get connection string
   - Railway: https://railway.app → Create PostgreSQL → Get connection string
   - **Note**: Connection string looks like: `postgresql://user:password@host:5432/db`

2. **Razorpay Keys**
   - https://dashboard.razorpay.com → Settings → API Keys
   - Copy **Key ID** (e.g., `rzp_test_xxxxxxxxxx`)
   - Copy **Secret** (keep secret!)

3. **GitHub**
   - This code already pushed to GitHub
   - You have git access

---

## 🚀 Deploy in 5 Steps

### Step 1: Go to Vercel.com
- Sign up (free) or log in
- https://vercel.com

### Step 2: New Project
- Click "Add New..." → "Project"
- Select GitHub repo: `Powerrplay-Turf`
- Click "Import"

### Step 3: Configure Build
- **Framework Preset**: Other
- **Build Command**: Already set correctly ✓
- **Output Directory**: Already set correctly ✓
- Click "Deploy"

### Step 4: Wait for Deployment
- Build takes ~5-10 minutes
- You'll see green checkmark when done

### Step 5: Add Environment Variables
**IMPORTANT: Do this BEFORE testing!**

1. In Vercel Dashboard → Project Settings → Environment Variables
2. Add these 3 variables:

   ```
   Name: DATABASE_URL
   Value: postgresql://user:password@host:5432/db
   
   Name: RAZORPAY_KEY_ID
   Value: rzp_test_xxxxxxxxxx
   
   Name: RAZORPAY_KEY_SECRET
   Value: [your secret key]
   ```

3. Click "Save"
4. Go to Deployments → Latest Deployment
5. Click "Redeploy" (to use new variables)

---

## ✅ Test It Works

1. Wait for redeploy to finish (green checkmark)
2. Click on deployment URL
3. You should see Power Play Turf website
4. Click "Book Now"
5. Select sport, date, time
6. Try booking (it will use Razorpay TEST mode)
7. You should see booking confirmation

---

## 🎯 If Something Fails

**Check Vercel Logs:**
- Deployments → Latest → "Runtime Logs" tab
- Look for error messages

**Common Issues:**

| Error | Fix |
|-------|-----|
| Build fails | Check DATABASE_URL is correct |
| Page shows 404 | Redeploy (Step 5, click Redeploy) |
| API calls fail | Check if RAZORPAY_KEY_ID is set |
| White screen | Check browser console (F12) for errors |

**Contact support:**
- Vercel: https://vercel.com/support
- This project: Ask developer

---

## 💰 Ready for Real Money?

After everything works with TEST keys:

1. Get **live** Razorpay keys from https://dashboard.razorpay.com
2. Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` in Vercel
3. Redeploy
4. Now real payments will work!

---

## 🔗 Your Live URL

After deployment, you'll have a URL like:
```
https://powerplay-turf.vercel.app
```

Share this with customers!

---

**Questions?** Check VERCEL_DEPLOYMENT_STEPS.md for detailed guide.

**Ready?** Let's go! 🚀

