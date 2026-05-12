import ScrollReveal from "@/components/ScrollReveal";
import { useLanguage } from "../../context/LanguageContext";
import HouseCard from "./HouseCard";
import Image from "next/image";
import Link from "next/link";

const houses = [
  {
    name: "Ngadirojo",
    desc: "Ngadirojo House is a traditional Javanese limasan built in 1946 and relocated from Bawak Village, Cawas, Klaten, Central Java, to Tembi in 2007. Combining Javanese architecture with natural tranquility, it is an ideal choice for guests seeking peace and culture.",
    images: [
      "/images/rooms/ngadirojo/ngadirojo.webp",
      "/images/rooms/ngadirojo/ngadirojo1.webp",
      "/images/rooms/ngadirojo/ngadirojo2.webp",
      "/images/rooms/ngadirojo/ngadirojo3.webp",
    ],
    icons: ["/images/icons/bed-gray.png", "/images/icons/swim-gray.png"],
    features: ["King Bed", "Pool View"],
    path: "/rooms/ngadirojo-house",
  },
  {
    name: "Polaman",
    desc: "Polaman House is a traditional Javanese limasan built in 1948 and relocated from Bawak Village, Cawas, Klaten, to Tembi in 2007. It combines the warmth of Javanese architecture with natural landscapes, making it perfect for an authentic and peaceful stay.",
    images: [
      "/images/rooms/polaman/polaman.webp",
      "/images/rooms/polaman/polaman1.webp",
      "/images/rooms/polaman/polaman2.webp",
      "/images/rooms/polaman/polaman3.webp",
    ],
    icons: ["/images/icons/bed-gray.png", "/images/icons/swim-gray.png"],
    features: ["King Bed", "Pool View"],
    path: "/rooms/polaman-house",
  },
  {
    name: "Adikarto",
    desc: "Adikarto House is a traditional Javanese limasan house that brings coolness and comfort in a natural atmosphere. Built in 1960 in Ngadirejo, Tepus, Gunung Kidul Regency, it was relocated to Tembi in 2007 as part of cultural preservation efforts.",
    images: [
      "/images/rooms/adikarto/adikarto.webp",
      "/images/rooms/adikarto/adikarto1.webp",
      "/images/rooms/adikarto/adikarto2.webp",
      "/images/rooms/adikarto/adikarto3.webp",
    ],
    icons: ["/images/icons/bed-gray.png", "/images/icons/mount-gray.png"],
    features: ["King Bed", "Garden View"],
    path: "/rooms/adikarto-house",
  },
];

export default function Accomodation() {
  const { t } = useLanguage();

  const icons = [
    {
      icon: "/images/icons/wifi-green.png",
      text: t.homepage.pavillion.desc[0],
    },
    { icon: "/images/icons/cup-green.png", text: t.homepage.pavillion.desc[1] },
    {
      icon: "/images/icons/music-green.png",
      text: t.homepage.pavillion.desc[2],
    },
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <ScrollReveal animation="fadeUp" duration={800}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h4 className="text-xs font-bold tracking-[0.2em] text-tembi uppercase mb-3">
              {t.homepage.accommodation.label}
            </h4>
            <h2 className="text-5xl font-serif text-gray-900 mb-6">
              {t.homepage.accommodation.title}
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {t.homepage.accommodation.desc}
            </p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-3 gap-8 mb-20 mx-auto max-w-7xl px-4">
          {houses.map((house, index) => (
            <ScrollReveal
              key={index}
              animation="fadeUp"
              delay={index * 150}
              duration={700}
            >
              <HouseCard house={house} />
            </ScrollReveal>
          ))}
        </div>
      </div>
      <div className="bg-stone-50 rounded-lg p-10 md:p-14">
        <div className="grid md:grid-cols-4 gap-12 items-center">
          <div>
            <h3 className="text-5xl font-serif font-medium text-gray-900 leading-[0.75]">
              {t.homepage.pavillion.title[0]} <br className="hidden md:block" />{" "}
              {t.homepage.pavillion.title[1]}
            </h3>
          </div>
          <div className="md:col-span-2">
            <div className="grid grid-cols-3 gap-y-6">
              {icons.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 text-gray-600 text-base text-center"
                >
                  <div className="relative w-16 h-16 shrink-0">
                    <Image
                      src={item.icon}
                      alt={item.text}
                      fill
                      className="object-contain"
                      sizes="64px"
                    />
                  </div>
                  <span className="leading-tight">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center md:text-right md:border-l md:border-gray-200 md:pl-12 flex flex-col items-center md:items-end justify-center">
            <Link
              href="/rooms"
              className="inline-block bg-tembi hover:bg-darktembi text-white py-3 px-8 rounded-sm text-sm font-medium transition-colors whitespace-nowrap"
            >
              {t.homepage.pavillion.button}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
