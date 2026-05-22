import Link from 'next/link';
import Image from 'next/image';
import { Calendar, MapPin, Users } from 'lucide-react';
import { formatCurrency } from '@/lib/format-currency';

interface Event {
  id: number;
  slug: string;
  title: string;
  shortDesc: string;
  imageUrl: string;
  date: string;
  location: string;
  capacity: number;
  category: string;
}

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/event/${event.slug}`}>
      <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-700"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 flex-1 flex flex-col">
          <h3 className="text-xl font-serif font-bold text-gray-800 mb-2 group-hover:text-[#8B9D68] transition-colors">
            {event.title}
          </h3>

          <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-1">
            {event.shortDesc}
          </p>

          {/* Event Details */}
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-[#8B9D68]" />
              <span>{formatDate(event.date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-[#8B9D68]" />
              <span>{event.location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={16} className="text-[#8B9D68]" />
              <span>Max {event.capacity} participants</span>
            </div>
          </div>

          {/* Button */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <span className="text-[#8B9D68] font-semibold text-sm group-hover:underline flex items-center gap-2">
              Learn More
              <svg
                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
