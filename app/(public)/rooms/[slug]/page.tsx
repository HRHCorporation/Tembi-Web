"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { ArrowLeft, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { useHouseContext } from "@/app/context/HouseContext";
import { FACILITY_ICONS } from "@/components/admin/constants/facility-icons";

export default function RoomDetail() {
  const params = useParams();
  const slug = params.slug as string;
  const { houseSlug, refreshHouseSlug } = useHouseContext();
  const { t, language } = useLanguage();

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const galleries = houseSlug?.galleries ?? [];

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goPrev = useCallback(
    () =>
      setLightboxIndex((i) => (i - 1 + galleries.length) % galleries.length),
    [galleries.length],
  );

  const goNext = useCallback(
    () => setLightboxIndex((i) => (i + 1) % galleries.length),
    [galleries.length],
  );

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
      else if (e.key === "Escape") closeLightbox();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxOpen, goPrev, goNext, closeLightbox]);

  useEffect(() => {
    if (slug) {
      refreshHouseSlug(slug);
    }
  }, [slug, refreshHouseSlug]);

  return (
    <main className="bg-[#F8F9FA] min-h-screen pb-20">
      <section className="relative h-[60vh] min-h-125 w-full">
        <Image
          src={houseSlug?.imagebanner || "/images/homepage/content3.webp"}
          alt={houseSlug?.getTitle(language) || "House Banner"}
          fill
          className="object-cover"
          priority
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />

        <Link
          href="/rooms"
          className="absolute top-24 left-6 z-20 text-white hover:text-gray-200 flex items-center gap-2 transition-colors"
        >
          <ArrowLeft size={24} />
          <span className="font-medium">{t.houseDetail.back}</span>
        </Link>

        <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
          <div className="container mx-auto px-4 md:px-10">
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span className="bg-[#8B9D68] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                {houseSlug?.tiers_name || "Room Type"}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2 drop-shadow-md">
              {houseSlug?.getTitle(language) || "House Name"}
            </h1>
            <p className="text-gray-300 text-lg font-light tracking-wide">
              {houseSlug?.getSubtitle(language) || "House Tagline"}
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-10 py-12 space-y-8">
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
                {houseSlug?.getTitle(language) || "House Name"}
              </h2>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-gray-500 text-sm font-medium">
                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 opacity-80">
                    <Image
                      src="/images/icons/bed-green.png"
                      alt="Bed Size"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{houseSlug?.mattress_name}</span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 opacity-80">
                    <Image
                      src="/images/icons/group-green.png"
                      alt="Guests Capacity"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>
                    {houseSlug?.number_guest} {t.houseDetail.guest}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative w-5 h-5 opacity-80">
                    <Image
                      src="/images/icons/corner-green.png"
                      alt="Room Size"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{houseSlug?.spacious_room} m²</span>
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 text-left md:text-right self-stretch md:self-auto flex md:flex-col justify-between items-baseline md:justify-start">
              <div className="text-3xl font-bold text-[#8B9D68]">
                {houseSlug?.getFormattedPrice()}
              </div>
              <p className="text-gray-400 text-sm mt-1 ml-2 md:ml-0">
                {t.houseDetail.night}
              </p>
            </div>
          </div>

          <div
            className="space-y-6 text-gray-600 leading-relaxed mb-10 text-justify md:text-left"
            dangerouslySetInnerHTML={{
              __html: houseSlug?.getDescription(language) || "",
            }}
          />

          <hr className="border-gray-100 mb-10" />

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-6 font-serif">
              {t.houseDetail.facilities}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {houseSlug?.facilities.map((amenity, index) => {
                const iconConfig = amenity.getIconConfig();
                const IconComponent = iconConfig?.icon;

                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-4 bg-[#F8F9FA] rounded-lg"
                  >
                    <div className="w-5 h-5 flex items-center justify-center shrink-0">
                      {IconComponent ? (
                        <IconComponent
                          size={20}
                          color="#8B9D68"
                          weight="fill"
                        />
                      ) : (
                        <div className="relative w-5 h-5 opacity-80">
                          <Image
                            src={amenity.getIcon()}
                            alt={amenity.getName(language)}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <span className="text-gray-600 text-sm font-medium">
                      {amenity.getName(language)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <div className="flex justify-between items-end mb-8">
            <h3 className="text-2xl font-bold text-gray-800 font-serif">
              {t.houseDetail.gallery}
            </h3>
            <button
              onClick={() => openLightbox(0)}
              className="text-[#8B9D68] font-semibold hover:underline cursor-pointer text-sm"
            >
              {t.houseDetail.viewall}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleries.map((imageSrc, index) => {
              const isFirst = index === 0;
              return (
                <div
                  key={index}
                  onClick={() => openLightbox(index)}
                  className={`relative rounded-xl overflow-hidden group shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer
										${isFirst ? "sm:col-span-2 sm:row-span-2" : ""}
									`}
                >
                  <Image
                    src={imageSrc.image || "/images/homepage/content3.webp"}
                    alt={`${houseSlug?.getTitle(language)} room ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
              );
            })}
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 md:p-10">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 font-serif">
            {t.houseDetail.policy.title}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">
                Check-in & Check-out
              </h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                {houseSlug?.policies?.CHECKIN_CHECKOUT?.map((policy, index) => {
                  const iconConfig = FACILITY_ICONS.find(
                    (item) => item.value === policy.icon,
                  );
                  const IconComponent = iconConfig?.icon;

                  return (
                    <li key={index} className="flex items-center gap-3">
                      <div className="w-4 h-4 flex items-center justify-center shrink-0">
                        {IconComponent ? (
                          <IconComponent
                            size={16}
                            color="#8B9D68"
                            weight="fill"
                          />
                        ) : (
                          <div className="relative w-4 h-4 opacity-70">
                            <Image
                              src={`/images/icons/${policy.icon}`}
                              alt={policy.getName(language)}
                              fill
                              className="object-contain"
                            />
                          </div>
                        )}
                      </div>
                      <span>{policy.getName(language)}</span>
                    </li>
                  );
                })}
                <li className="flex items-center gap-3">
                  <div className="relative w-4 h-4 opacity-70 shrink-0">
                    <Image
                      src="/images/icons/id-green.png"
                      alt="id"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>{t.houseDetail.policy.id}</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">
                {t.houseDetail.policy.cancelPolicy}
              </h4>
              <ul className="space-y-4 text-gray-600 text-sm">
                {houseSlug?.policies?.CANCELLATION_POLICY?.map(
                  (policy, index) => {
                    const iconConfig = FACILITY_ICONS.find(
                      (item) => item.value === policy.icon,
                    );
                    const IconComponent = iconConfig?.icon;

                    return (
                      <li key={index} className="flex items-center gap-3">
                        <div className="w-4 h-4 flex items-center justify-center shrink-0">
                          {IconComponent ? (
                            <IconComponent
                              size={16}
                              color="#8B9D68"
                              weight="fill"
                            />
                          ) : (
                            <div className="relative w-4 h-4">
                              <Image
                                src={`/images/icons/${policy.icon}`}
                                alt={policy.getName(language)}
                                fill
                                className="object-contain"
                              />
                            </div>
                          )}
                        </div>
                        <span>{policy.getName(language)}</span>
                      </li>
                    );
                  },
                )}
              </ul>
            </div>
          </div>

          <hr className="border-gray-100 mb-8" />

          <div>
            <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wider">
              {t.houseDetail.houseRules.title}
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-4 md:gap-8 text-gray-600 text-sm">
              {houseSlug?.house_rules?.map((rule, index) => {
                const iconConfig = FACILITY_ICONS.find(
                  (item) => item.value === rule.icon,
                );
                const IconComponent = iconConfig?.icon;

                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 flex items-center justify-center shrink-0">
                      {IconComponent ? (
                        <IconComponent
                          size={16}
                          color="#8B9D68"
                          weight="fill"
                        />
                      ) : (
                        <div className="relative w-4 h-4 opacity-60">
                          <Image
                            src={`/images/icons/${rule.icon}`}
                            alt={rule.getName(language)}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <span>{rule.getName(language)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:px-10 md:py-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800 font-serif">
                {houseSlug?.getTitle(language) || "House Name"}
              </h3>
              <p className="text-gray-400 text-xs mt-1 hidden sm:block">
                {t.houseDetail.houseRules.title} & {t.houseDetail.policy.title}
                apply.
              </p>
            </div>
            <div className="flex sm:flex-col justify-between items-baseline sm:items-end border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100">
              <div className="text-2xl md:text-3xl font-bold text-[#8B9D68]">
                {houseSlug?.getFormattedPrice()}
              </div>
              <p className="text-gray-400 text-sm sm:mt-1">
                {t.houseDetail.night}
              </p>
            </div>
          </div>
        </section>
      </div>

      {lightboxOpen && galleries.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-black/65 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <div
            className="flex items-center justify-between px-6 py-3 shrink-0 border-b border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white font-medium text-sm">
              {houseSlug?.getTitle(language) || "Room Gallery"}
            </span>
            <button
              onClick={closeLightbox}
              className="text-white hover:text-gray-300 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          <div className="relative flex-1 flex items-center justify-center min-h-0 py-4">
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
            >
              <ChevronLeft size={30} />
            </button>

            <div
              className="relative h-full w-full max-w-2xl mx-16"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={lightboxIndex}
                src={
                  galleries[lightboxIndex]?.image ||
                  "/images/homepage/content3.webp"
                }
                alt={`${houseSlug?.getTitle(language)} ${lightboxIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition-colors z-10"
            >
              <ChevronRight size={30} />
            </button>
          </div>

          <div
            className="flex items-center justify-end px-6 py-2 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-gray-400 text-sm">
              {lightboxIndex + 1}/{galleries.length}
            </span>
          </div>

          <div
            className="flex justify-center gap-2 px-6 pb-4 overflow-x-auto shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {galleries.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className={`relative shrink-0 w-24 h-16 rounded overflow-hidden border-2 transition-all ${
                  i === lightboxIndex
                    ? "border-white opacity-100"
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                <Image
                  src={img.image || "/images/homepage/content3.webp"}
                  alt={`thumb ${i + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
