import Image from 'next/image';
import { formatRupiah } from '@/lib/format-currency';

// Helper Function Icon Amenities
const getAmenityIcon = (amenity: string) => {
  const lower = amenity.toLowerCase();

  // Tentukan path default
  let iconPath = '/images/icons/star.png';

  // Logika mapping icon
  if (lower.includes('wifi')) iconPath = '/images/icons/wifi-green.png';
  else if (lower.includes('air') || lower.includes('snow')) iconPath = '/images/icons/snow-green.png';
  else if (lower.includes('bath') || lower.includes('mandi')) iconPath = '/images/icons/bathub-green.png';
  else if (lower.includes('rice') || lower.includes('taman') || lower.includes('garden') || lower.includes('sawah')) iconPath = '/images/icons/leaf-green.png';
  else if (lower.includes('bar') || lower.includes('mini')) iconPath = '/images/icons/minibar-green.png';
  else if (lower.includes('terrace') || lower.includes('teras')) iconPath = '/images/icons/terrace-green.png';
  else if (lower.includes('pool') || lower.includes('kolam')) iconPath = '/images/icons/swim-green.png';

  return (
    <Image
      src={iconPath}
      alt={amenity}
      width={20}
      height={20}
      className="object-contain"
    />
  );
};

interface RoomInfoProps {
  name: string;
  bed: string;
  guests: string | number;
  size: string;
  price: number;
  longDescription: string[];
  amenities: string[];
  guestText: string;
  nightText: string;
  facilitiesText: string;
}

export default function RoomInfo({
  name,
  bed,
  guests,
  size,
  price,
  longDescription,
  amenities,
  guestText,
  nightText,
  facilitiesText
}: RoomInfoProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">

      {/* HEADER ROW DALAM CARD: Judul Hitam & Harga */}
      <div className="flex flex-col md:flex-row justify-between items-start mb-8">
        <div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
            {name}
          </h2>

          {/* Icons Specs */}
          <div className="flex items-center gap-6 text-gray-500 text-sm font-medium">

            {/* Bed Icon */}
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 opacity-80">
                <Image
                  src="/images/icons/bed-green.png"
                  alt="Bed Size"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{bed}</span>
            </div>

            {/* Guests Icon */}
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 opacity-80">
                <Image
                  src="/images/icons/group-green.png"
                  alt="Guests Capacity"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{guests} {guestText}</span>
            </div>

            {/* Size Icon */}
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 opacity-80">
                <Image
                  src="/images/icons/corner-green.png"
                  alt="Room Size"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{size}</span>
            </div>

          </div>
        </div>

        {/* Harga */}
        <div className="mt-6 md:mt-0 text-left md:text-right">
          <div className="text-3xl font-bold text-[#8B9D68]">
            {formatRupiah(price)}
          </div>
          <p className="text-gray-400 text-sm mt-1">{nightText}</p>
        </div>
      </div>

      {/* DESCRIPTION */}
      <div className="space-y-6 text-gray-600 leading-relaxed mb-10 text-justify md:text-left">
        {longDescription.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>

      {/* SEPARATOR */}
      <hr className="border-gray-100 mb-10" />

      {/* AMENITIES GRID */}
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">
          {facilitiesText}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {amenities.map((amenity, index) => (
            <div key={index} className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg">
              <div className="text-[#8B9D68] opacity-80">
                {getAmenityIcon(amenity)}
              </div>
              <span className="text-gray-600 text-sm font-medium">{amenity}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
