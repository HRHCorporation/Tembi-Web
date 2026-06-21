import Image from 'next/image';

interface EventGalleryProps {
  eventName: string;
  galleryImages: string[];
}

export default function EventGallery({ eventName, galleryImages }: EventGalleryProps) {
  return (
    <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
      <div className="flex justify-between items-end mb-8">
        <h3 className="text-2xl font-bold text-gray-800 font-serif">Event Gallery</h3>
      </div>

      {(() => {
        const total = Math.min(galleryImages?.length ?? 0, 10);
        const useLegacyLayout = total <= 5;
        return (
          <div className={`grid gap-4 auto-rows-[200px] ${useLegacyLayout ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4' : 'grid-cols-3'}`}>
            {galleryImages?.slice(0, 10).map((imageSrc, index) => {
              const isFirstLegacy = useLegacyLayout && index === 0;
              const isLastCentered = !useLegacyLayout && index === total - 1 && total % 3 === 1;
              return (
                <div
                  key={index}
                  className={`relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300
                    ${isFirstLegacy ? 'sm:col-span-2 sm:row-span-2' : ''}
                    ${isLastCentered ? 'col-start-2' : ''}
                  `}
                >
                  <Image
                    src={imageSrc}
                    alt={`${eventName} image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              );
            })}
          </div>
        );
      })()}
    </section>
  );
}
