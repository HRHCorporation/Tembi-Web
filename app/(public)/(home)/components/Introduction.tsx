import ScrollReveal from "@/components/ScrollReveal";
import Image from "next/image";
import { useLanguage } from "../../context/LanguageContext";

export default function Introduction() {
  const { t } = useLanguage();

  return (
    <section className="py-20 px-10 bg-stone-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <ScrollReveal animation="slideLeft" duration={800}>
          <div className="text-center md:text-left">
            <h3 className="text-6xl font-serif font-thin mb-10 drop-shadow-2xl">
              {t.homepage.intro.title}
            </h3>
            <p className="text-gray-600 mb-6">{t.homepage.intro.p1}</p>
            <p className="text-gray-600 mb-10">{t.homepage.intro.p2}</p>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <h4 className="text-3xl font-bold text-tembi">2000</h4>
                <p className="text-gray-500 text-sm mt-1">
                  {t.homepage.intro.stats.founded}
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-tembi">500+</h4>
                <p className="text-gray-500 text-sm mt-1">
                  {t.homepage.intro.stats.artifacts}
                </p>
              </div>
              <div>
                <h4 className="text-3xl font-bold text-tembi">9</h4>
                <p className="text-gray-500 text-sm mt-1">
                  {t.homepage.intro.stats.house}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal animation="slideRight" duration={800}>
          <div className="relative h-100 md:h-125">
            <Image
              src="/images/homepage/content1.webp"
              alt="Living museum architecture"
              fill
              sizes="64"
              className="rounded-lg object-cover"
            />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
