import Image from 'next/image';
import { Calendar, Clock, MapPin, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { formatRupiah } from '@/lib/format-currency';

interface EventInfoProps {
  name: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  price: number;
  category: string;
  description: string[];
  included: string[];
  requirements: string[];
}

export default function EventInfo({
  name,
  date,
  time,
  location,
  capacity,
  price,
  category,
  description,
  included,
  requirements
}: EventInfoProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
            {name}
          </h2>

          {/* Event Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-[#8B9D68]" />
              <span>{formatDate(date)}</span>
            </div>

            <div className="flex items-center gap-2">
              <Clock size={18} className="text-[#8B9D68]" />
              <span>{time}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-[#8B9D68]" />
              <span>{location}</span>
            </div>

            <div className="flex items-center gap-2">
              <Users size={18} className="text-[#8B9D68]" />
              <span>Max {capacity} participants</span>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="mt-6 md:mt-0 text-left md:text-right">
          <div className="text-3xl font-bold text-[#8B9D68]">
            {formatRupiah(price)}
          </div>
          <p className="text-gray-400 text-sm mt-1">per person</p>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-4 text-gray-600 leading-relaxed mb-10">
        {description.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* Separator */}
      <hr className="border-gray-100 mb-10" />

      {/* What's Included */}
      <div className="mb-10">
        <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif flex items-center gap-2">
          <CheckCircle className="text-[#8B9D68]" size={24} />
          What's Included
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {included.map((item, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
              <CheckCircle size={20} className="text-[#8B9D68] mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Separator */}
      <hr className="border-gray-100 mb-10" />

      {/* Requirements */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif flex items-center gap-2">
          <AlertCircle className="text-orange-500" size={24} />
          Important Information
        </h3>
        <div className="space-y-3">
          {requirements.map((requirement, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
              <AlertCircle size={20} className="text-orange-500 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 text-sm">{requirement}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
