import Image from 'next/image';

interface RoomGalleryProps {
  roomName: string;
  galleryImages: string[];
  galleryTitle: string;
  viewAllText: string;
}

export default function RoomGallery({ roomName, galleryImages, galleryTitle, viewAllText }: RoomGalleryProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-2xl font-bold text-gray-800 font-serif">{galleryTitle}</h3>
        <button className="text-[#8B9D68] font-semibold hover:underline cursor-pointer text-sm">
          {viewAllText}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
        {galleryImages?.map((imageSrc, index) => {
          // Cek apakah ini gambar pertama
          const isFirst = index === 0;

          return (
            <div
              key={index}
              className={`relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300
                    ${isFirst ? 'sm:col-span-2 sm:row-span-2' : ''}
                  `}
            >
              <Image
                src={imageSrc}
                alt={`${roomName} room ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay tipis */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          );
        })}
      </div>
    </section>
  );
}
