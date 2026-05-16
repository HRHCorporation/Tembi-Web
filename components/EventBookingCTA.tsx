import Link from 'next/link';
import { formatRupiah } from '@/lib/format-currency';
import { Calendar, Phone, Mail } from 'lucide-react';

interface EventBookingCTAProps {
  eventName: string;
  price: number;
  date: string;
}

export default function EventBookingCTA({ eventName, price, date }: EventBookingCTAProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:px-10 md:py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 font-serif mb-2">
            Ready to Join?
          </h3>
          <div className="flex items-center gap-2 text-gray-600">
            <Calendar size={18} className="text-[#8B9D68]" />
            <span>{formatDate(date)}</span>
          </div>
        </div>

        <div className="mt-6 md:mt-0 text-left md:text-right">
          <div className="text-3xl font-bold text-[#8B9D68]">
            {formatRupiah(price)}
          </div>
          <p className="text-gray-400 text-sm mt-1">per person</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Book Now Button */}
        <Link
          href="/booking"
          className="flex items-center justify-center gap-2 w-full bg-[#8B9D68] hover:bg-[#738354] text-white text-lg font-bold py-4 rounded-lg shadow-sm transition-all duration-300"
        >
          <Calendar size={20} />
          Book Now
        </Link>

        {/* Contact Button */}
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full bg-white hover:bg-gray-50 text-[#8B9D68] border-2 border-[#8B9D68] text-lg font-bold py-4 rounded-lg transition-all duration-300"
        >
          <Phone size={20} />
          Contact Us
        </a>
      </div>

      {/* Additional Info */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-[#8B9D68]" />
            <span>+62 812-3456-7890</span>
          </div>
          <div className="hidden sm:block text-gray-300">|</div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-[#8B9D68]" />
            <span>events@tembi.com</span>
          </div>
        </div>
      </div>
    </section>
  );
}
