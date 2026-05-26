import Image from 'next/image';
import { Eye, Home } from 'lucide-react';
import { formatCurrency } from '@/lib/format-currency';
import { ADDONS_PRICE } from '@/lib/constants/booking';
import type { Room } from '@/types/room';

interface BookingSummaryProps {
  selectedRoom: Room | undefined;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  numberOfNights: number;
  breakfast: number;
  extrabed: number;
  totalPrice: number;
  isFormValid: boolean;
  isChecking: boolean;
  onProceed: () => void;
}

export default function BookingSummary({
  selectedRoom,
  checkIn,
  checkOut,
  adults,
  children,
  numberOfNights,
  breakfast,
  extrabed,
  totalPrice,
  isFormValid,
  isChecking,
  onProceed
}: BookingSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-fit sticky top-28">
        <div className="flex items-center gap-2 mb-6 text-tembi border-b border-gray-100 pb-4">
          <Eye className="w-5 h-5" />
          <h3 className="text-lg font-serif font-bold">Room Preview</h3>
        </div>

        <div className="relative h-48 w-full bg-gray-50 rounded-xl mb-6 overflow-hidden shadow-sm border border-gray-100">
          {selectedRoom ? (
            <>
              <Image
                src={
                  selectedRoom.imageUrl ||
                  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000&auto=format&fit=crop'
                }
                alt={selectedRoom.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
                <p className="text-white font-bold text-lg leading-tight">
                  {selectedRoom.name}
                </p>
                <p className="text-gray-200 text-xs mt-1 opacity-90 line-clamp-1">
                  {selectedRoom.tagline}
                </p>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 border-2 border-dashed border-gray-200 rounded-xl">
              <Home className="w-8 h-8 mb-2 opacity-50" />
              <span className="text-xs font-medium">Select a room to preview</span>
            </div>
          )}
        </div>

        <div className="space-y-3 text-sm text-gray-600 mb-6">
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Check-in</span>
            <span className="font-semibold text-gray-900">{checkIn || '-'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Check-out</span>
            <span className="font-semibold text-gray-900">{checkOut || '-'}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Guests</span>
            <span className="font-semibold text-gray-900">
              {adults} Adult, {children} Child
            </span>
          </div>
          <div className="flex justify-between py-1 border-b border-gray-50">
            <span>Nights</span>
            <span className="font-semibold text-gray-900">{numberOfNights} Night(s)</span>
          </div>
          <div className="flex justify-between py-1">
            <span>Room</span>
            <span
              className={`font-semibold text-right ${selectedRoom ? 'text-gray-900' : 'text-orange-500'}`}
            >
              {selectedRoom?.name || 'Not selected'}
            </span>
          </div>
        </div>

        {(breakfast > 0 || extrabed > 0) && (
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h5 className="font-bold text-gray-900 mb-3 text-xs uppercase tracking-wider">
              Selected Services
            </h5>
            <div className="space-y-2">
              {breakfast > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <span className="font-bold text-tembi">{breakfast}x</span> Breakfast
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(breakfast * ADDONS_PRICE.breakfast * (numberOfNights || 1))}
                  </span>
                </div>
              )}
              {extrabed > 0 && (
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600 flex items-center gap-2">
                    <span className="font-bold text-tembi">{extrabed}x</span> Extra Bed
                  </span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(extrabed * ADDONS_PRICE.extrabed * (numberOfNights || 1))}
                  </span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Total Price */}
        <div className="flex justify-between items-end mb-6">
          <div>
            <p className="text-xs text-gray-500 mb-1">Total Payment</p>
            <p className="font-bold text-2xl text-tembi">{formatCurrency(totalPrice)}</p>
          </div>
        </div>

        {/* BUTTON ACTION (Redirect to Payment Page) */}
        <button
          onClick={onProceed}
          disabled={!isFormValid || isChecking}
          className={`w-full block text-center py-4 rounded-xl font-bold text-white transition-all transform
                ${
                  isFormValid && !isChecking
                    ? 'bg-tembi hover:bg-darktembi shadow-lg shadow-tembi/30 active:scale-95 cursor-pointer'
                    : 'bg-gray-300 cursor-not-allowed pointer-events-none'
                }`}
        >
          {isChecking ? 'Checking Availability...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
}
