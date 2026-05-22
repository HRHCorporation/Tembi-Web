import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export interface PageHeroProps {
  backgroundImage: string;
  title: string | string[];
  subtitle?: string;
  description?: string;
  badge?: string;
  badgeColor?: string;
  height?: 'sm' | 'md' | 'lg' | 'full';
  overlay?: 'gradient-dark' | 'gradient-green' | 'solid-dark';
  textColor?: 'white' | 'gray';
  backButton?: {
    show: boolean;
    href: string;
    text: string;
  };
  children?: React.ReactNode;
}

const heightClasses = {
  sm: 'h-[400px]',
  md: 'h-[60vh] min-h-[500px]',
  lg: 'h-[70vh] min-h-[600px]',
  full: 'h-screen',
};

const overlayClasses = {
  'gradient-dark': 'bg-gradient-to-t from-black/90 via-black/40 to-transparent',
  'gradient-green': 'bg-gradient-to-b from-[#3A4D39]/90 via-[#3A4D39]/60 to-transparent',
  'solid-dark': 'bg-black/60',
};

export default function PageHero({
  backgroundImage,
  title,
  subtitle,
  description,
  badge,
  badgeColor = 'bg-[#8B9D68]',
  height = 'md',
  overlay = 'gradient-dark',
  textColor = 'white',
  backButton,
  children,
}: PageHeroProps) {
  const titleArray = Array.isArray(title) ? title : [title];
  const textColorClass = textColor === 'white' ? 'text-white' : 'text-gray-800';

  return (
    <section className={`relative ${heightClasses[height]} w-full`}>
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClasses[overlay]}`} />

      {/* Back Button */}
      {backButton?.show && (
        <Link
          href={backButton.href}
          className={`absolute top-24 left-6 z-20 ${textColorClass} hover:text-gray-200 flex items-center gap-2 transition-colors`}
        >
          <ArrowLeft size={24} />
          <span className="font-medium">{backButton.text}</span>
        </Link>
      )}

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full z-20 pb-12">
        <div className="container mx-auto px-4 md:px-10">
          {/* Badge */}
          {badge && (
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <span
                className={`${badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider`}
              >
                {badge}
              </span>
            </div>
          )}

          {/* Subtitle (small label) */}
          {subtitle && (
            <p className={`text-sm ${textColorClass} opacity-80 mb-2 uppercase tracking-widest`}>
              {subtitle}
            </p>
          )}

          {/* Title */}
          <h1
            className={`text-4xl md:text-5xl font-serif font-bold ${textColorClass} mb-2 drop-shadow-md`}
          >
            {titleArray.map((line, idx) => (
              <span key={idx}>
                {line}
                {idx < titleArray.length - 1 && <br />}
              </span>
            ))}
          </h1>

          {/* Description */}
          {description && (
            <p
              className={`${textColor === 'white' ? 'text-gray-300' : 'text-gray-600'} text-lg font-light tracking-wide max-w-2xl`}
            >
              {description}
            </p>
          )}

          {/* Custom Children */}
          {children}
        </div>
      </div>
    </section>
  );
}
