"use client";

import { useSearchParams, useRouter } from 'next/navigation';
import { useMemo, useState, Suspense } from 'react';
import { roomData } from '@/data/roomData';
import { differenceInCalendarDays, format, parseISO } from 'date-fns';
import { 
  Check, 
  CheckCircle, 
  XCircle, 
  Lock,
  Loader2 
} from 'lucide-react';

const ADDONS_PRICE = {
  breakfast: 50000,
  extrabed: 150000
};

// Fungsi format mata uang
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

// --- KOMPONEN STEPPER ---
const PaymentStepper = () => (
  <div className="flex items-center justify-center w-full max-w-xl mx-auto mt-8 mb-4 text-sm relative z-10">
    <div className="flex items-center gap-2 text-[#8B8055] font-semibold">
      <div className="bg-[#8B8055] text-white rounded-full p-0.5 w-5 h-5 flex items-center justify-center">
        <Check size={12} strokeWidth={3} />
      </div>
      <span>Booking Details</span>
    </div>
    <div className="w-12 h-[2px] bg-[#8B8055] mx-3"></div>
    <div className="flex items-center gap-2 text-[#8B8055] font-bold">
      <div className="w-6 h-6 rounded-full bg-[#8B8055] text-white flex items-center justify-center text-xs">2</div>
      <span>Payment</span>
    </div>
    <div className="w-12 h-[2px] bg-gray-300 mx-3"></div>
    <div className="flex items-center gap-2 text-gray-400 font-medium">
      <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-400 flex items-center justify-center text-xs font-bold">3</div>
      <span>Confirmation</span>
    </div>
  </div>
);

function PaymentContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [billingInfo, setBillingInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const bookingData = useMemo(() => {
    const roomSlug = searchParams.get('room');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const adults = Number(searchParams.get('adults') || 1);
    const children = Number(searchParams.get('children') || 0);

    // ✅ Mengambil data addons dari URL
    const addonsParam = searchParams.get('addons');
    let addons = { breakfast: 0, extrabed: 0 };

    try {
      if (addonsParam) {
        addons = JSON.parse(addonsParam);
      }
    } catch (e) {
      console.error("Error parsing addons", e);
    }

    const room = roomData.find(r => r.slug === roomSlug);
    
    if (!room || !checkIn || !checkOut) {
      return null;
    }

    const nights = differenceInCalendarDays(parseISO(checkOut), parseISO(checkIn));
    
    // ✅ Perhitungan Biaya
    const basePrice = room.price * nights;
    const breakfastCost = (addons.breakfast * ADDONS_PRICE.breakfast) * nights;
    const extrabedCost = (addons.extrabed * ADDONS_PRICE.extrabed) * nights;
    const totalAddonsCost = breakfastCost + extrabedCost;

    const serviceFee = Math.round((basePrice + totalAddonsCost) * 0.05); // Service fee dari total kamar + addons
    const tourismTax = 30000 * nights;
    
    // Total Akhir
    const total = basePrice + totalAddonsCost + serviceFee + tourismTax;

    return { 
      room, 
      roomSlug,
      checkIn, 
      checkOut, 
      adults, 
      children,
      nights,
      addons,
      addonCosts: { breakfast: breakfastCost, extrabed: extrabedCost },
      basePrice, 
      serviceFee, 
      tourismTax, 
      total 
    };
  }, [searchParams]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    if (!billingInfo.name || !billingInfo.email || !billingInfo.phone) {
      setError('Please fill in all required fields (Name, Email, Phone)');
      return;
    }

    if (!bookingData) {
      setError('Invalid booking data');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          roomSlug: bookingData.roomSlug,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
          adults: bookingData.adults,
          children: bookingData.children,
          addons: bookingData.addons, // ✅ Kirim data addons ke backend
          totalAmount: bookingData.total,
          booker: billingInfo,
        }),
      });

      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        console.error('Failed to parse response as JSON:', parseError);
        throw new Error('Invalid server response. Please try again.');
      }

      if (!response.ok) {
        throw new Error(data?.message || data?.error || 'Payment processing failed');
      }

      if (data.invoiceUrl) {
        // --- PERUBAHAN LOGIKA FLOW ---
        // 1. Buka Xendit di Tab Baru
        const newTab = window.open(data.invoiceUrl, '_blank');
        
        // 2. Redirect halaman ini ke Pending Page
        router.push(`/booking/pending?booking_id=${data.bookingId}`);

        if (!newTab) {
            console.warn("Popup blocked by browser");
            // Fallback jika popup diblokir: redirect di tab yang sama (opsional, 
            // tapi karena kita redirect ke pending page yang ada tombol bayar, ini aman)
        }
      } else {
        throw new Error('Payment URL not received');
      }

    } catch (err: Error | unknown) {
      console.error('Payment error:', err);
      const message = err instanceof Error ? err.message : 'Failed to process payment. Please try again.';
      setError(message);
      setIsProcessing(false);
    }
  };

  if (!bookingData) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-red-600">Invalid Booking Data</h2>
        <button 
          onClick={() => router.push('/booking')}
          className="mt-6 bg-[#8B8055] text-white px-6 py-2 rounded-lg hover:bg-[#766c44]"
        >
          Back to Booking
        </button>
      </div>
    );
  }

  const { room, checkIn, checkOut, adults, children, nights, addons, addonCosts, basePrice, serviceFee, tourismTax, total } = bookingData;

  const cardStyle = "bg-white p-6 rounded-xl shadow-sm border border-gray-100 relative z-10";
  const inputStyle = "w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#8B8055] focus:ring-1 focus:ring-[#8B8055] transition-all text-sm";

  return (
    <main className="min-h-screen bg-[#EFF1F0] font-sans text-gray-800 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-[1400px] bg-[#FAFAF9] shadow-2xl opacity-100"
          style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        ></div>
      </div>

      <div className="relative pt-16 pb-12 z-10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-[#1A202C] mb-3">
            Complete Your Payment
          </h1>
          <PaymentStepper />
        </div>
      </div>

      {error && (
        <div className="container mx-auto px-4 relative z-20 mb-6 max-w-6xl">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-2 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Kolom Kiri - Summary */}
            <div className="lg:col-span-1 flex flex-col gap-6">
              <div className={`${cardStyle} p-0 overflow-hidden`}>
                <div className="relative h-48 w-full">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${room.imageUrl})` }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="text-xl font-bold font-serif">{room.name}</h3>
                        <p className="text-xs opacity-90">{room.tagline}</p>
                    </div>
                </div>

                <div className="p-6">
                    <h2 className="font-bold text-lg font-serif mb-4 text-gray-900">Booking Summary</h2>
                    <div className="space-y-3 text-sm text-gray-600 mb-6">
                        <div className="flex justify-between pb-2 border-b border-dashed border-gray-200">
                            <span>Check-in</span><span className="font-bold text-gray-800">{format(parseISO(checkIn), 'EEE, MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between pb-2 border-b border-dashed border-gray-200">
                            <span>Check-out</span><span className="font-bold text-gray-800">{format(parseISO(checkOut), 'EEE, MMM dd, yyyy')}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Guests</span><span className="font-bold text-gray-800">{adults} Adults{children > 0 ? `, ${children} Children` : ''}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Duration</span><span className="font-bold text-gray-800">{nights} Nights</span>
                        </div>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h4 className="font-bold text-gray-900 mb-3 text-sm">Price Details</h4>
                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Room Price x {nights} nights</span>
                                <span>{formatCurrency(basePrice)}</span>
                            </div>

                            {/* ✅ Detail Addons */}
                            {addons.extrabed > 0 && (
                                <div className="flex justify-between text-gray-700">
                                    <span className="flex items-center gap-1">
                                      Extra Bed <span className="text-xs bg-[#8B8055] text-white px-1.5 rounded-md">{addons.extrabed}x</span>
                                    </span>
                                    <span>{formatCurrency(addonCosts.extrabed)}</span>
                                </div>
                            )}
                            
                            {addons.breakfast > 0 && (
                                <div className="flex justify-between text-gray-700">
                                    <span className="flex items-center gap-1">
                                      Breakfast <span className="text-xs bg-orange-500 text-white px-1.5 rounded-md">{addons.breakfast}x</span>
                                    </span>
                                    <span>{formatCurrency(addonCosts.breakfast)}</span>
                                </div>
                            )}

                            <div className="border-t border-gray-200 my-2"></div>
                            <div className="flex justify-between"><span>Service fee (5%)</span><span>{formatCurrency(serviceFee)}</span></div>
                            <div className="flex justify-between"><span>Tourism tax</span><span>{formatCurrency(tourismTax)}</span></div>
                        </div>
                    </div>
                </div>
              </div>
              
              <div className={cardStyle}>
                  <h4 className="font-bold mb-4 text-lg font-serif">Cancellation Policy</h4>
                  <ul className="space-y-3 text-sm text-gray-600">
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-green-600 flex-shrink-0"/> <span>Free cancellation until 48h before check-in.</span></li>
                      <li className="flex items-start"><CheckCircle className="w-4 h-4 mr-3 mt-0.5 text-orange-500 flex-shrink-0"/> <span>50% refund within 48h.</span></li>
                      <li className="flex items-start"><XCircle className="w-4 h-4 mr-3 mt-0.5 text-red-600 flex-shrink-0"/> <span>No refund for no-shows.</span></li>
                  </ul>
              </div>
            </div>

            {/* Kolom Kanan - Form */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className={cardStyle}>
                <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">Billing Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Full Name *</label>
                    <input type="text" name="name" value={billingInfo.name} onChange={handleInputChange} placeholder="John Doe" className={inputStyle} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Email Address *</label>
                    <input type="email" name="email" value={billingInfo.email} onChange={handleInputChange} placeholder="email@example.com" className={inputStyle} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Phone Number *</label>
                    <input type="tel" name="phone" value={billingInfo.phone} onChange={handleInputChange} placeholder="+62..." className={inputStyle} />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">City</label>
                    <input type="text" name="city" value={billingInfo.city} onChange={handleInputChange} placeholder="Jakarta" className={inputStyle} />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Address</label>
                    <input type="text" name="address" value={billingInfo.address} onChange={handleInputChange} placeholder="Street Address" className={inputStyle} />
                  </div>
                    <div className="col-span-2 md:col-span-1">
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 ml-1">Postal Code</label>
                    <input type="text" name="postalCode" value={billingInfo.postalCode} onChange={handleInputChange} placeholder="12345" className={inputStyle} />
                  </div>
                </div>
              </div>
            </div>
        </div>

        <div className={`mt-8 ${cardStyle} border-t-4 border-t-[#8B8055]`}>
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="text-center md:text-left">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
                    <div className="flex items-baseline gap-2 justify-center md:justify-start">
                      <p className="text-3xl font-bold text-[#8B8055] font-serif">{formatCurrency(total)}</p>
                      <p className="text-xs text-gray-400">Includes taxes</p>
                    </div>
                </div>
                <div className="w-full md:w-auto flex flex-col items-center gap-2">
                    <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className={`w-full md:w-72 bg-[#8B8055] hover:bg-[#766c44] text-white font-bold text-lg py-3.5 rounded-xl shadow-lg shadow-[#8B8055]/30 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 ${isProcessing ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {isProcessing ? (<><Loader2 className="animate-spin" size={20} /> Processing...</>) : ('Confirm & Pay')}
                    </button>
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                        <Lock size={10} />
                        <span>Payments are secured and encrypted</span>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </main>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <PaymentContent />
    </Suspense>
  );
}
