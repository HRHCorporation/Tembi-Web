import Link from 'next/link';
import { formatRupiah } from '@/lib/format-currency';

interface RoomBookingCTAProps {
  roomName: string;
  price: number;
  nightText: string;
  bookingText: string;
}

export default function RoomBookingCTA({ roomName, price, nightText, bookingText }: RoomBookingCTAProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:px-10 md:py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif self-start md:self-auto">
          {roomName}
        </h3>
        <div className="mt-6 md:mt-0 text-left md:text-right">
          <div className="text-3xl font-bold text-[#8B9D68]">
            {formatRupiah(price)}
          </div>
          <p className="text-gray-400 text-sm mt-1">{nightText}</p>
        </div>
      </div>

      <Link
        href="/booking"
        className="block w-full bg-[#8B9D68] hover:bg-[#738354] text-white text-lg font-bold py-4 rounded-lg shadow-sm transition-all duration-300 text-center"
      >
        {bookingText}
      </Link>
    </section>
  );
}
