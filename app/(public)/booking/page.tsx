"use client";

export const dynamic = "force-dynamic";

import { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/app/(public)/context/LanguageContext";
import { differenceInCalendarDays, parseISO } from "date-fns";
import { Calendar } from "lucide-react";
import CustomAlert from "@/components/CustomAlert";
import BookingStepper from "@/components/BookingStepper";
import DateSelector from "@/components/DateSelector";
import GuestSelector from "@/components/GuestSelector";
import AddonsSection from "@/components/AddonsSection";
import RoomSelector from "@/components/RoomSelector";
import BookingSummary from "@/components/BookingSummary";
import SpecialRequests from "@/components/SpecialRequests";
import { ADDONS_PRICE, ADDON_LIMITS } from "@/lib/constants/booking";

function BookingContent() {
  const { t } = useLanguage();
  const rooms = t.house.item || [];
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRoomSlug = searchParams.get("room");

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [adults, setAdults] = useState(0);
  const [children, setChildren] = useState(0);
  const [selectedRoomId, setSelectedRoomId] = useState<number | null>();

  const [specialRequests, setSpecialRequests] = useState("");
  const [addons, setAddons] = useState({
    breakfast: 0,
    extrabed: 0,
  });

  const [isChecking, setIsChecking] = useState(false);
  const [alertState, setAlertState] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    type: "success" | "error" | "info";
  }>({
    isOpen: false,
    title: "",
    message: "",
    type: "error",
  });

  useEffect(() => {
    if (initialRoomSlug && rooms.length > 0) {
      const initialRoom = rooms.find((r: any) => r.slug === initialRoomSlug);
      if (initialRoom) setSelectedRoomId(initialRoom.id);
    }
  }, [initialRoomSlug, rooms]);

  const selectedRoom = useMemo(
    () => rooms.find((room: any) => room.id === selectedRoomId),
    [selectedRoomId, rooms],
  );

  const numberOfNights = useMemo(() => {
    if (checkIn && checkOut) {
      const start = parseISO(checkIn);
      const end = parseISO(checkOut);
      const nights = differenceInCalendarDays(end, start);
      return nights > 0 ? nights : 0;
    }
    return 0;
  }, [checkIn, checkOut]);

  const totalPrice = useMemo(() => {
    let total = 0;
    const nights = numberOfNights || 1;
    if (selectedRoom && numberOfNights > 0) {
      total += selectedRoom.price * numberOfNights;
    }
    if (addons.breakfast > 0)
      total += addons.breakfast * ADDONS_PRICE.breakfast * nights;
    if (addons.extrabed > 0)
      total += addons.extrabed * ADDONS_PRICE.extrabed * nights;

    return total;
  }, [selectedRoom, numberOfNights, addons]);

  const handleAddonUpdate = (
    type: "breakfast" | "extrabed",
    change: number,
  ) => {
    setAddons((prev) => {
      const newValue = prev[type] + change;
      if (newValue < ADDON_LIMITS.min || newValue > ADDON_LIMITS.max) return prev;
      return { ...prev, [type]: newValue };
    });
  };

  const isFormValid = Boolean(
    selectedRoom && checkIn && checkOut && numberOfNights > 0,
  );

  const handleCheckAndProceed = async () => {
    if (!selectedRoom || !checkIn || !checkOut) return;

    setIsChecking(true);

    try {
      const res = await fetch(
        `/api/availability?roomSlug=${selectedRoom.slug}&checkIn=${checkIn}&checkOut=${checkOut}`,
      );
      const data = await res.json();

      if (data.available) {
        const params = new URLSearchParams({
          room: selectedRoom.slug,
          checkIn,
          checkOut,
          adults: adults.toString(),
          children: children.toString(),
          total: totalPrice.toString(),
          addons: JSON.stringify(addons),
          specialRequests,
        });

        router.push(`/payment?${params.toString()}`);
      } else {
        setAlertState({
          isOpen: true,
          title: "Kamar Tidak Tersedia",
          message: `Maaf, ${data.message}`,
          type: "error",
        });
      }
    } catch (error) {
      console.error(error);
      setAlertState({
        isOpen: true,
        title: "Terjadi Kesalahan",
        message: "Gagal mengecek ketersediaan server.",
        type: "error",
      });
    } finally {
      setIsChecking(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#EFF1F0] font-sans text-gray-800 pb-20 pt-28">
      <CustomAlert
        isOpen={alertState.isOpen}
        title={alertState.title}
        message={alertState.message}
        type={alertState.type}
        onClose={() => setAlertState((prev) => ({ ...prev, isOpen: false }))}
      />

      {/* === HERO SECTION === */}
      <div
        className="relative w-full h-[500px] flex flex-col items-center justify-center text-center px-4 bg-cover bg-center mb-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1604999333679-b86d54738315?q=80&w=2000&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#3A4D39]/90 via-[#3A4D39]/60 to-[#EFF1F0]"></div>

        <div className="relative z-10 max-w-4xl mt-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-4 drop-shadow-lg">
            Book Your Stay at <br /> Tembi Cultural House
          </h1>
          <p className="text-gray-100 text-base md:text-xl max-w-2xl mx-auto font-light drop-shadow-md leading-relaxed">
            Experience authentic Indonesian culture in comfort and tradition.
            Immerse yourself in Javanese heritage while enjoying modern
            amenities.
          </p>
        </div>
      </div>

      {/* === STEPPER SECTION === */}
      <div className="container mx-auto px-4">
        <BookingStepper />
      </div>

      {/* === MAIN CONTENT CONTAINER === */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 px-4 md:px-8 items-start">
        {/* LEFT COLUMN: Inputs */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <Calendar className="w-5 h-5 text-tembi" />
            <h3 className="text-xl font-bold font-serif text-gray-900">
              Booking Details
            </h3>
          </div>

          <DateSelector
            checkIn={checkIn}
            checkOut={checkOut}
            onCheckInChange={setCheckIn}
            onCheckOutChange={setCheckOut}
          />

          <GuestSelector
            adults={adults}
            children={children}
            onAdultsChange={setAdults}
            onChildrenChange={setChildren}
          />

          <AddonsSection
            breakfast={addons.breakfast}
            extrabed={addons.extrabed}
            onUpdate={handleAddonUpdate}
          />

          <RoomSelector
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onRoomSelect={setSelectedRoomId}
          />

          <SpecialRequests value={specialRequests} onChange={setSpecialRequests} />
        </div>

        {/* RIGHT COLUMN: Summary */}
        <BookingSummary
          selectedRoom={selectedRoom}
          checkIn={checkIn}
          checkOut={checkOut}
          adults={adults}
          children={children}
          numberOfNights={numberOfNights}
          breakfast={addons.breakfast}
          extrabed={addons.extrabed}
          totalPrice={totalPrice}
          isFormValid={isFormValid}
          isChecking={isChecking}
          onProceed={handleCheckAndProceed}
        />
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#EFF1F0]">
          <div className="text-tembi font-serif animate-pulse">
            Loading Booking System...
          </div>
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
