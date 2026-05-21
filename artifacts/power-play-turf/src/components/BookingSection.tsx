import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Users, Phone, User, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { MdSportsCricket, MdSportsSoccer, MdSportsTennis } from "react-icons/md";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { useGetSlots, useCreateBookingOrder, useVerifyPayment } from "@workspace/api-client-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number.").max(12),
  players: z.coerce.number().min(1, "Please enter number of players."),
  sport: z.enum(["cricket", "football", "badminton"], {
    required_error: "Please select a sport.",
  }),
  date: z.date({ required_error: "Please select a date." }),
  timeSlot: z.string({ required_error: "Please select a time slot." }),
});

type FormValues = z.infer<typeof formSchema>;

type Confirmation = {
  bookingRef: string;
  sport: string;
  date: string;
  time: string;
  name: string;
};

export function BookingSection() {
  const [isOpen, setIsOpen] = useState(true);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    const check = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      const isWeekend = day === 0 || day === 6;
      setIsOpen(hour >= (isWeekend ? 5 : 6) && hour < (isWeekend ? 23 : 22));
    };
    check();
    const interval = setInterval(check, 60000);
    return () => clearInterval(interval);
  }, []);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", phone: "", players: 1 },
  });

  const selectedSport = form.watch("sport");
  const selectedDate = form.watch("date");
  const selectedTimeSlot = form.watch("timeSlot");

  const dateStr = selectedDate ? format(selectedDate, "yyyy-MM-dd") : "";

  const { data: slots, isLoading: slotsLoading } = useGetSlots(
    { sport: selectedSport, date: dateStr },
    { query: { enabled: !!selectedSport && !!dateStr } }
  );

  const createOrder = useCreateBookingOrder();
  const verifyPayment = useVerifyPayment();

  const selectedSlotInfo = slots?.find((s) => s.time === selectedTimeSlot);

  const onSubmit = async (values: FormValues) => {
    setPaymentError(null);

    let orderData: Awaited<ReturnType<typeof createOrder.mutateAsync>>;
    try {
      orderData = await createOrder.mutateAsync({
        data: {
          sport: values.sport,
          date: format(values.date, "yyyy-MM-dd"),
          timeSlot: values.timeSlot,
          name: values.name,
          phone: values.phone,
          players: values.players,
        },
      });
    } catch (err: unknown) {
      const msg =
        (err as { data?: { error?: string } })?.data?.error ??
        "Could not create booking. Please try again.";
      setPaymentError(msg);
      return;
    }

    setIsProcessingPayment(true);

    const rzp = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.amountPaise,
      currency: orderData.currency,
      name: "Power Play Turf",
      description: `${values.sport.charAt(0).toUpperCase() + values.sport.slice(1)} — ${format(values.date, "d MMM yyyy")} at ${selectedSlotInfo?.label ?? values.timeSlot}`,
      order_id: orderData.razorpayOrderId,
      prefill: { name: values.name, contact: values.phone },
      theme: { color: "#1A7A3C" },
      handler: async (response) => {
        try {
          const result = await verifyPayment.mutateAsync({
            data: {
              bookingId: orderData.bookingId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            },
          });
          setConfirmation({
            bookingRef: result.bookingRef,
            sport: values.sport.charAt(0).toUpperCase() + values.sport.slice(1),
            date: format(values.date, "EEEE, d MMMM yyyy"),
            time: selectedSlotInfo?.label ?? values.timeSlot,
            name: values.name,
          });
        } catch {
          setPaymentError("Payment received but verification failed. Please contact us on WhatsApp with your payment ID.");
        } finally {
          setIsProcessingPayment(false);
        }
      },
      modal: {
        ondismiss: () => setIsProcessingPayment(false),
      },
    });

    rzp.open();
  };

  if (confirmation) {
    return (
      <section id="book" className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border-t-4 border-primary shadow-2xl p-10 text-center"
          >
            <CheckCircle2 size={72} className="text-primary mx-auto mb-6" />
            <h2 className="text-3xl font-black uppercase tracking-tight text-secondary mb-2">
              Booking Confirmed!
            </h2>
            <p className="text-gray-500 mb-8">Your slot is locked in. See you on the turf.</p>

            <div className="bg-gray-50 border border-gray-200 p-6 mb-8 text-left space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Booking Ref</span>
                <span className="font-black text-primary text-lg">{confirmation.bookingRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Sport</span>
                <span className="font-bold text-secondary">{confirmation.sport}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Date</span>
                <span className="font-bold text-secondary">{confirmation.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Time</span>
                <span className="font-bold text-secondary">{confirmation.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Name</span>
                <span className="font-bold text-secondary">{confirmation.name}</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6">
              For any queries, reach us on WhatsApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919558923855"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 hover:bg-[#1ebe5d] transition-colors"
              >
                Contact on WhatsApp
              </a>
              <Button
                variant="outline"
                className="rounded-none font-bold uppercase"
                onClick={() => {
                  setConfirmation(null);
                  form.reset();
                }}
              >
                Book Another Slot
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="book" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-5xl font-black text-secondary uppercase tracking-tight mb-4">
              BOOK A SLOT.<br />SHOW UP.<br />
              <span className="text-primary">PLAY HARD.</span>
            </h2>
            <p className="text-lg text-secondary/70 font-medium">
              Select your sport, pick a slot, and pay securely online. Booking confirmed instantly.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100">
            <div className="relative flex h-4 w-4">
              {isOpen && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>}
              <span className={cn("relative inline-flex rounded-full h-4 w-4", isOpen ? "bg-green-500" : "bg-red-500")}></span>
            </div>
            <span className="font-bold text-secondary uppercase tracking-wide">
              {isOpen ? "Turf is Live" : "Currently Closed"}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 md:p-10 shadow-2xl border-t-4 border-primary">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">

              {/* Step 1: Sport */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">1</div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">Select Sport</h3>
                </div>
                <FormField
                  control={form.control}
                  name="sport"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {([
                          { value: "cricket",   label: "Box Cricket",  Icon: MdSportsCricket },
                          { value: "football",  label: "Football",     Icon: MdSportsSoccer },
                          { value: "badminton", label: "Badminton",    Icon: MdSportsTennis },
                        ] as const).map(({ value, label, Icon }) => (
                          <label key={value} className="cursor-pointer" data-testid={`sport-${value}`}>
                            <input type="radio" value={value} className="sr-only" onChange={() => { field.onChange(value); form.setValue("timeSlot", ""); }} checked={field.value === value} />
                            <div className={cn(
                              "flex flex-col items-center justify-center p-6 border-2 transition-all duration-200 h-full",
                              field.value === value ? "border-primary bg-primary/5 shadow-md" : "border-gray-200 hover:border-gray-300"
                            )}>
                              <Icon size={48} className={field.value === value ? "text-primary mb-3" : "text-gray-400 mb-3"} />
                              <span className={cn("font-bold uppercase", field.value === value ? "text-primary" : "text-gray-600")}>{label}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Step 2: Date */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">2</div>
                    <h3 className="text-xl font-bold uppercase tracking-wide">Select Date</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                data-testid="button-date-picker"
                                className={cn("w-full h-14 pl-3 text-left font-normal border-2 border-gray-200 rounded-none text-lg", !field.value && "text-muted-foreground")}
                              >
                                {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                                <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={(d) => { field.onChange(d); form.setValue("timeSlot", ""); }}
                              disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Step 3: Time Slot */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">3</div>
                    <h3 className="text-xl font-bold uppercase tracking-wide">Select Time</h3>
                  </div>
                  <FormField
                    control={form.control}
                    name="timeSlot"
                    render={({ field }) => (
                      <FormItem>
                        {!selectedSport || !selectedDate ? (
                          <p className="text-gray-400 text-sm italic py-4">Select a sport and date first to see available slots.</p>
                        ) : slotsLoading ? (
                          <div className="flex items-center gap-2 text-gray-400 py-4">
                            <Loader2 size={18} className="animate-spin" />
                            <span className="text-sm">Loading slots...</span>
                          </div>
                        ) : (
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[260px] overflow-y-auto pr-2">
                            {slots?.map((slot) => (
                              <label key={slot.time} className={cn("cursor-pointer", !slot.available && "cursor-not-allowed opacity-50")} data-testid={`slot-${slot.time}`}>
                                <input
                                  type="radio"
                                  value={slot.time}
                                  className="sr-only"
                                  disabled={!slot.available}
                                  onChange={field.onChange}
                                  checked={field.value === slot.time}
                                />
                                <div className={cn(
                                  "py-2 px-1 text-center text-xs font-semibold transition-all duration-150 border",
                                  !slot.available
                                    ? "bg-red-50 text-red-300 border-red-100"
                                    : field.value === slot.time
                                      ? "bg-primary text-white border-primary"
                                      : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                                )}>
                                  <div>{slot.label}</div>
                                  {slot.available && <div className="text-[10px] opacity-70">₹{slot.priceRupees}</div>}
                                  {!slot.available && <div className="text-[10px]">Booked</div>}
                                </div>
                              </label>
                            ))}
                          </div>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Step 4: Details */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">4</div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">Your Details</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <FormField control={form.control} name="name" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">Full Name</FormLabel>
                      <div className="relative">
                        <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input data-testid="input-name" placeholder="John Doe" className="pl-10 h-12 rounded-none border-gray-300" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="phone" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">Phone Number</FormLabel>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input data-testid="input-phone" placeholder="9876543210" className="pl-10 h-12 rounded-none border-gray-300" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                  <FormField control={form.control} name="players" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-600 font-semibold">Total Players</FormLabel>
                      <div className="relative">
                        <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input data-testid="input-players" type="number" min={1} placeholder="10" className="pl-10 h-12 rounded-none border-gray-300" {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )} />
                </div>

                {/* Summary + Pay */}
                {paymentError && (
                  <div className="flex items-start gap-3 bg-red-50 border border-red-200 p-4 mb-6 text-red-700">
                    <AlertCircle size={20} className="shrink-0 mt-0.5" />
                    <p className="text-sm font-medium">{paymentError}</p>
                  </div>
                )}

                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="w-full md:w-auto">
                    <h4 className="font-bold text-gray-500 uppercase text-sm mb-2">Booking Summary</h4>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                      <span className="font-bold text-secondary text-lg">
                        {selectedSport ? selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1) : "---"}
                      </span>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon size={16} />
                        <span className="font-medium">{selectedDate ? format(selectedDate, "MMM d, yyyy") : "---"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="font-medium">{selectedSlotInfo?.label ?? (selectedTimeSlot || "---")}</span>
                      </div>
                      {selectedSlotInfo && (
                        <span className="font-black text-primary text-xl">₹{selectedSlotInfo.priceRupees}</span>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    data-testid="button-book-pay"
                    disabled={createOrder.isPending || isProcessingPayment}
                    className="w-full md:w-auto h-14 px-8 bg-primary hover:bg-primary/90 text-white font-bold text-lg uppercase tracking-wider rounded-none shrink-0"
                  >
                    {(createOrder.isPending || isProcessingPayment) ? (
                      <><Loader2 size={20} className="animate-spin mr-2" /> Processing...</>
                    ) : (
                      "Book & Pay Now"
                    )}
                  </Button>
                </div>
              </div>

            </form>
          </Form>
        </div>
      </div>
    </section>
  );
}
