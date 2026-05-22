# 🗄️ Database Setup Instructions

To get your production database ready for Power Play Turf, follow these steps:

### 1. Provision a PostgreSQL Database
You can use any PostgreSQL provider. Highly recommended for Vercel:
- **Supabase**: [supabase.com](https://supabase.com)
- **Railway**: [railway.app](https://railway.app)
- **Neon**: [neon.tech](https://neon.tech)

**Note**: If using Supabase, use the **Transaction Mode** connection string (usually on port 6543) for best performance with serverless functions.

### 2. Set the Environment Variable
Once you have your connection string, add it to your environment:
- **Locally**: Add to your `.env` file: `DATABASE_URL=your_connection_string`
- **Vercel**: Add it in the Vercel Dashboard under **Project Settings > Environment Variables**.

### 3. Push the Schema
Run the following command from the root of this project to create the necessary tables in your database:

```bash
pnpm --filter @workspace/db run push
```

This will use `drizzle-kit` to sync the schema defined in the code with your live database.

### 4. Verify Tables
You should now have a `bookings` table in your database with the following columns:
- `id` (serial, primary key)
- `sport` (text)
- `date` (text)
- `time_slot` (text)
- `name` (text)
- `phone` (text)
- `players` (integer)
- `amount_paise` (integer)
- `razorpay_order_id` (text, unique)
- `razorpay_payment_id` (text)
- `status` (text, default 'pending')
- `created_at` (timestamp)

---
**Status**: Ready for Schema Push 🟢
