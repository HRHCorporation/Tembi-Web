import Image from "next/image";
import { Check } from "lucide-react";
import React from "react";

type MenuCardProps = {
  icon: React.ComponentType<any> | string;
  title: string;
  subtitle: string;
  items: string[];
  className?: string;
};

const MenuCard = ({
  icon: IconOrPath,
  title,
  subtitle,
  items,
  className = "",
}: MenuCardProps) => {
  const isIconComponent = typeof IconOrPath !== "string";
  return (
    <div
      className={`group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl h-full flex flex-col ${className}`}
    >
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#96A66D]">
        {isIconComponent ? (
          <React.Fragment>
            {React.createElement(IconOrPath as React.ComponentType<any>, {
              size: 32,
              color: "#ffffff",
              weight: "fill",
            })}
          </React.Fragment>
        ) : (
          <div className="relative h-8 w-8">
            <Image
              src={
                (IconOrPath as string).startsWith("/images") ||
                (IconOrPath as string).startsWith("http")
                  ? (IconOrPath as string)
                  : `/images/icons/${(IconOrPath as string).replace("Icon", "").toLowerCase()}.png`
              }
              alt={title}
              fill
              sizes="32px"
              className="object-contain brightness-0 invert"
            />
          </div>
        )}
      </div>

      <div className="mb-6 text-center">
        <h3 className="mb-1 font-serif text-2xl font-bold text-[#4A3B32]">
          {title}
        </h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>

      <ul className="space-y-3 grow">
        {items.map((item, index) => (
          <li
            key={`item-${index}-${item.substring(0, 10)}`}
            className="flex items-start gap-3 text-gray-600"
          >
            <Check
              className="mt-0.5 h-4 w-4 shrink-0 text-[#96A66D]"
              strokeWidth={3}
            />
            <span className="text-sm font-medium leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuCard;
