'use client';

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail } from 'lucide-react';

export default function Footer() {
  // Data Social Media
  const socialMedia = [
    { name: "Facebook", icon: "/images/icons/facebook-white.png", href: "https://www.facebook.com/tembi.rumahbudaya.75" },
    { name: "Instagram", icon: "/images/icons/instagram-white.png", href: "https://www.instagram.com/tembi.historicalhome" },
    { name: "TikTok", icon: "/images/icons/tiktok-white.png", href: "https://www.tiktok.com/@tembi.historicalhome" },
    // { name: "YouTube", icon: "/images/icons/youtube-white.png", href: "#" },
  ];

  return (
    <footer className="bg-[#0F1623] text-gray-300 pt-16 pb-8 font-sans">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        
        <div>
          <h4 className="text-xl font-serif font-bold text-tembi mb-6">
            Tembi Historical Home
          </h4>
          <p className="text-sm text-gray-400 leading-relaxed mb-8">
            A sanctuary where Javanese heritage meets luxury hospitality, 
            creating unforgettable cultural experiences.
          </p>
          <div className="flex space-x-5">
            {socialMedia.map((social) => (
              <Link 
                key={social.name} 
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-75 transition"
              >
                <div className="relative w-5 h-5">
                  <Image 
                    src={social.icon} 
                    alt={social.name} 
                    fill 
                    className="object-contain" 
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-white mb-6">Contact Info</h4>
          <ul className="space-y-4 text-sm text-gray-400">
            <li className="flex items-start">
              <MapPin size={18} className="mr-3 mt-0.5 flex-shrink-0 text-white" />
              <span className="leading-relaxed">Jl. Parangtritis No.Km 8.4, Tembi, Timbulharjo, Kec. Sewon, Kabupaten Bantul, Daerah Istimewa Yogyakarta 55186</span>
            </li>
            <li className="flex items-center">
              <Phone size={18} className="mr-3 text-white" />
              <span>+62 822-2514-2729</span>
            </li>
            <li className="flex items-center">
              <Mail size={18} className="mr-3 text-white" />
              <span>rumahbudayatembi@gmail.com</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="border-t border-gray-800 mt-16 pt-8 text-center text-sm text-gray-500">
        <p>
          &copy; <span suppressHydrationWarning>{new Date().getFullYear()}</span> Tembi Rumah Budaya. All rights reserved.
          <span className="mx-2">|</span> 
          <a href="#" className="hover:text-gray-300">Privacy Policy</a> 
          <span className="mx-2">|</span> 
          <a href="#" className="hover:text-gray-300">Terms of Service</a>
        </p>
      </div>
    </footer>
  );
}