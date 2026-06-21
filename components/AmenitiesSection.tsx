"use client";

import React from "react";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { useHouseContext } from "@/app/context/HouseContext";
import { FACILITY_ICONS } from "@/components/admin/constants/facility-icons";

export function AmenitiesSection() {
  const { t, language } = useLanguage();
  const { services, serviceAdd } = useHouseContext();

  const getGridClass = () => {
    const count = services.length;
    if (count === 0) return "grid grid-cols-1";
    if (count === 1) return "grid grid-cols-1 max-w-sm mx-auto";
    if (count === 2) return "grid grid-cols-1 md:grid-cols-2 max-w-3xl mx-auto";
    if (count === 3) return "grid grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto";
    return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  };

  return (
    <section className="py-20 bg-white text-gray-800">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#1A2B1E] mb-4">
            {t.house.amenities.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            {t.house.amenities.desc}
          </p>
        </div>

        
        {services.length > 0 && (
          <div className={`${getGridClass()} gap-10 mb-20`}>
            {services.map((service, index) => {
              const iconConfig =
                service.getIconConfig?.() ||
                FACILITY_ICONS.find((item) => item.value === service.icon);
              const IconComponent = iconConfig?.icon;

              return (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-20 h-20 bg-[#EAF0E5] rounded-full flex items-center justify-center mb-6 shrink-0">
                    <div className="w-8 h-8 flex items-center justify-center relative">
                      {IconComponent ? (
                        React.createElement(IconComponent, {
                          size: 32,
                          color: "#8B9D68",
                          weight: "fill",
                        })
                      ) : (
                        <div className="relative w-8 h-8 opacity-80">
                          <Image
                            src={
                              service.hasIcon()
                                ? service.getIcon()
                                : "/images/icons/default-amenity.png"
                            }
                            alt={service.getName(language)}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-serif font-bold mb-6 text-[#1A2B1E]">
                    {service.getName(language)}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    {service.getAmenities().map((item, idx) => (
                      <li key={idx} className="text-sm md:text-base font-light">
                        {item.getName(language)}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}
        {serviceAdd.length > 0 && (
          <div className="bg-[#F8F9F7] rounded-4xl p-10 md:p-16">
            <h3 className="text-2xl md:text-5xl font-serif font-bold text-center text-[#1A2B1E] mb-12">
              {t.house.additional.title}
            </h3>

            <div className="flex flex-wrap justify-center gap-8 md:gap-32 text-center">
              {serviceAdd.map((amenity, index) => {
                const iconConfig =
                  amenity.getIconConfig?.() ||
                  FACILITY_ICONS.find((item) => item.value === amenity.icon);
                const IconComponent = iconConfig?.icon;

                return (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-4 group"
                  >
                    <div className="w-10 h-10 flex items-center justify-center relative shrink-0">
                      {IconComponent ? (
                        React.createElement(IconComponent, {
                          size: 36,
                          color: '#8b9660',
                          weight: iconConfig.weight,
                        })
                      ) : (
                        <div className="relative w-10 h-10 opacity-100">
                          <Image
                            src={amenity.getIcon()}
                            alt={amenity.getName(language)}
                            fill
                            className="object-contain"
                          />
                        </div>
                      )}
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      {amenity.getName(language)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
