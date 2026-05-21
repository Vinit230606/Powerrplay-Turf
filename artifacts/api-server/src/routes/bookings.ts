import { Router, type IRouter } from "express";
import { createHmac } from "crypto";
import Razorpay from "razorpay";
import { eq, and } from "drizzle-orm";
import { db, bookingsTable } from "@workspace/db";
import {
  GetSlotsQueryParams,
  CreateBookingOrderBody,
  VerifyPaymentBody,
} from "@workspace/api-zod";
import {
  PRICING,
  generateSlots,
  getPrice,
  to12h,
} from "@workspace/site-config";

const router: IRouter = Router();

const razorpay = new Razorpay({
  key_id: process.env["RAZORPAY_KEY_ID"]!,
  key_secret: process.env["RAZORPAY_KEY_SECRET"]!,
});

router.get("/bookings/slots", async (req, res): Promise<void> => {
  const parsed = GetSlotsQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { sport, date } = parsed.data;

  if (!PRICING[sport as keyof typeof PRICING]) {
    res.status(400).json({ error: "Invalid sport" });
    return;
  }

  const confirmedBookings = await db
    .select({ timeSlot: bookingsTable.timeSlot })
    .from(bookingsTable)
    .where(
      and(
        eq(bookingsTable.sport, sport),
        eq(bookingsTable.date, date),
        eq(bookingsTable.status, "confirmed")
      )
    );

  const bookedSlots = new Set(confirmedBookings.map((b) => b.timeSlot));
  const slots = generateSlots(date);

  const result = slots.map((time) => ({
    time,
    label: to12h(time),
    available: !bookedSlots.has(time),
    priceRupees: getPrice(sport, time),
  }));

  res.json(result);
});

router.post("/bookings/order", async (req, res): Promise<void> => {
  const parsed = CreateBookingOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { sport, date, timeSlot, name, phone, players } = parsed.data;

  if (!PRICING[sport as keyof typeof PRICING]) {
    res.status(400).json({ error: "Invalid sport" });
    return;
  }

  const existing = await db
    .select({ id: bookingsTable.id })
    .from(bookingsTable)
    .where(
      and(
        eq(bookingsTable.sport, sport),
        eq(bookingsTable.date, date),
        eq(bookingsTable.timeSlot, timeSlot),
        eq(bookingsTable.status, "confirmed")
      )
    );

  if (existing.length > 0) {
    res.status(409).json({ error: "This slot is already booked. Please choose another time." });
    return;
  }

  const priceRupees = getPrice(sport, timeSlot);
  const amountPaise = priceRupees * 100;

  const order = await razorpay.orders.create({
    amount: amountPaise,
    currency: "INR",
    receipt: `ppt_${Date.now()}`,
  });

  const [booking] = await db
    .insert(bookingsTable)
    .values({
      sport,
      date,
      timeSlot,
      name,
      phone,
      players,
      amountPaise,
      razorpayOrderId: order.id,
      status: "pending",
    })
    .returning();

  req.log.info({ bookingId: booking!.id, orderId: order.id }, "Booking order created");

  res.status(201).json({
    razorpayOrderId: order.id,
    amountPaise,
    currency: "INR",
    keyId: process.env["RAZORPAY_KEY_ID"]!,
    bookingId: booking!.id,
  });
});

router.post("/bookings/verify", async (req, res): Promise<void> => {
  const parsed = VerifyPaymentBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const { bookingId, razorpayOrderId, razorpayPaymentId, razorpaySignature } = parsed.data;

  const expectedSignature = createHmac("sha256", process.env["RAZORPAY_KEY_SECRET"]!)
    .update(`${razorpayOrderId}|${razorpayPaymentId}`)
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    req.log.warn({ bookingId }, "Payment signature verification failed");
    res.status(400).json({ error: "Invalid payment signature. Please contact support." });
    return;
  }

  const [updated] = await db
    .update(bookingsTable)
    .set({ status: "confirmed", razorpayPaymentId })
    .where(eq(bookingsTable.id, bookingId))
    .returning();

  if (!updated) {
    res.status(400).json({ error: "Booking not found" });
    return;
  }

  req.log.info({ bookingId, razorpayPaymentId }, "Booking confirmed");

  res.json({
    success: true,
    bookingId,
    bookingRef: `PPT-${String(bookingId).padStart(4, "0")}`,
  });
});

export default router;
