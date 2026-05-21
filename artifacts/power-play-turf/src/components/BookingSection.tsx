import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { CalendarIcon, Clock, Users, Phone, User, CheckCircle2 } from "lucide-react";
import { MdSportsCricket, MdSportsSoccer, MdSportsTennis } from "react-icons/md";
import { Calendar } from "./ui/calendar";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().min(10, "Please enter a valid 10-digit phone number.").max(12),
  players: z.string().min(1, "Please enter number of players."),
  sport: z.enum(["cricket", "football", "badminton"], {
    required_error: "Please select a sport.",
  }),
  date: z.date({
    required_error: "Please select a date.",
  }),
  time: z.string({
    required_error: "Please select a time slot.",
  }),
});

const timeSlots = [
  "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
  "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
  "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM"
];

export function BookingSection() {
  const [isOpen, setIsOpen] = useState(true);

  // Check if turf is currently open
  useEffect(() => {
    const checkOpenStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      // Mon-Fri: 6AM-10PM (6-22)
      // Sat-Sun: 5AM-11PM (5-23)
      const isWeekend = day === 0 || day === 6;
      const startHour = isWeekend ? 5 : 6;
      const endHour = isWeekend ? 23 : 22;
      
      setIsOpen(hour >= startHour && hour < endHour);
    };
    
    checkOpenStatus();
    const interval = setInterval(checkOpenStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      players: "",
    },
  });

  const selectedSport = form.watch("sport");
  const selectedDate = form.watch("date");
  const selectedTime = form.watch("time");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const formattedDate = format(values.date, "PPP");
    const sportName = values.sport.charAt(0).toUpperCase() + values.sport.slice(1);
    
    const message = `Hi Power Play Turf!%0A%0AI would like to book a slot.%0A%0A*Sport:* ${sportName}%0A*Date:* ${formattedDate}%0A*Time:* ${values.time}%0A*Players:* ${values.players}%0A%0A*Name:* ${values.name}%0A*Phone:* ${values.phone}%0A%0APlease confirm availability.`;
    
    const whatsappUrl = `https://wa.me/917990000000?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

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
              Select your sport, pick a time, and confirm instantly via WhatsApp. No advanced payment required.
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

        <div className="bg-white p-6 md:p-10 rounded-none shadow-2xl border-t-4 border-primary">
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
                        <label className="cursor-pointer relative">
                          <input type="radio" value="cricket" className="sr-only" onChange={field.onChange} checked={field.value === "cricket"} />
                          <div className={cn(
                            "flex flex-col items-center justify-center p-6 border-2 transition-all duration-200 h-full",
                            field.value === "cricket" ? "border-primary bg-primary/5 shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
                          )}>
                            <MdSportsCricket size={48} className={field.value === "cricket" ? "text-primary mb-3" : "text-gray-400 mb-3"} />
                            <span className={cn("font-bold uppercase", field.value === "cricket" ? "text-primary" : "text-gray-600")}>Box Cricket</span>
                          </div>
                        </label>
                        
                        <label className="cursor-pointer relative">
                          <input type="radio" value="football" className="sr-only" onChange={field.onChange} checked={field.value === "football"} />
                          <div className={cn(
                            "flex flex-col items-center justify-center p-6 border-2 transition-all duration-200 h-full",
                            field.value === "football" ? "border-primary bg-primary/5 shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
                          )}>
                            <MdSportsSoccer size={48} className={field.value === "football" ? "text-primary mb-3" : "text-gray-400 mb-3"} />
                            <span className={cn("font-bold uppercase", field.value === "football" ? "text-primary" : "text-gray-600")}>Football</span>
                          </div>
                        </label>
                        
                        <label className="cursor-pointer relative">
                          <input type="radio" value="badminton" className="sr-only" onChange={field.onChange} checked={field.value === "badminton"} />
                          <div className={cn(
                            "flex flex-col items-center justify-center p-6 border-2 transition-all duration-200 h-full",
                            field.value === "badminton" ? "border-primary bg-primary/5 shadow-md" : "border-gray-200 hover:border-gray-300 bg-white"
                          )}>
                            <MdSportsTennis size={48} className={field.value === "badminton" ? "text-primary mb-3" : "text-gray-400 mb-3"} />
                            <span className={cn("font-bold uppercase", field.value === "badminton" ? "text-primary" : "text-gray-600")}>Badminton</span>
                          </div>
                        </label>
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
                                variant={"outline"}
                                className={cn(
                                  "w-full h-14 pl-3 text-left font-normal border-2 border-gray-200 rounded-none text-lg",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-5 w-5 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Step 3: Time */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">3</div>
                    <h3 className="text-xl font-bold uppercase tracking-wide">Select Time</h3>
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
                          {timeSlots.map((time) => (
                            <label key={time} className="cursor-pointer">
                              <input type="radio" value={time} className="sr-only" onChange={field.onChange} checked={field.value === time} />
                              <div className={cn(
                                "py-2 px-1 text-center text-sm font-semibold transition-all duration-200 border",
                                field.value === time 
                                  ? "bg-primary text-white border-primary" 
                                  : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                              )}>
                                {time}
                              </div>
                            </label>
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Step 4: Details & Submit */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-white font-bold">4</div>
                  <h3 className="text-xl font-bold uppercase tracking-wide">Your Details</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-semibold">Full Name</FormLabel>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input placeholder="John Doe" className="pl-10 h-12 rounded-none border-gray-300" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-semibold">Phone Number</FormLabel>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input placeholder="9876543210" className="pl-10 h-12 rounded-none border-gray-300" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="players"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-600 font-semibold">Total Players</FormLabel>
                        <div className="relative">
                          <Users className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input type="number" placeholder="10" className="pl-10 h-12 rounded-none border-gray-300" {...field} />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Summary Panel */}
                <div className="bg-gray-50 border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="w-full md:w-auto">
                    <h4 className="font-bold text-gray-500 uppercase text-sm mb-2">Booking Summary</h4>
                    <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-secondary text-lg">
                          {selectedSport ? selectedSport.charAt(0).toUpperCase() + selectedSport.slice(1) : "---"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <CalendarIcon size={16} />
                        <span className="font-medium">{selectedDate ? format(selectedDate, "MMM d, yyyy") : "---"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <Clock size={16} />
                        <span className="font-medium">{selectedTime || "---"}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    size="lg" 
                    className="w-full md:w-auto h-14 px-8 bg-green-600 hover:bg-green-700 text-white font-bold text-lg uppercase tracking-wider rounded-none shrink-0"
                  >
                    Book via WhatsApp
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
