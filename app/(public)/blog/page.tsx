'use client';

import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/app/(public)/context/LanguageContext';
import { BlogCard } from '@/components/BlogCard';
import Image from 'next/image';
import ScrollReveal from "@/components/ScrollReveal";

interface BlogPost {
  id: string;
  slug: string;
  title_ind?: string;
  title_eng?: string;
  title?: string;
  description_ind?: string;
  description_eng?: string;
  excerpt?: string;
  category: string;
  date: string;
  thumbnail?: string;
  imageUrl?: string;
}

export default function BlogPage() {
  const { t, language } = useLanguage();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const response = await fetch('/api/public/blogs');
        const result = await response.json();

        if (result.success) {
          setBlogPosts(result.data);
        } else {
          // Fallback to static data
          setBlogPosts(fallbackBlogPosts);
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        // Fallback to static data
        setBlogPosts(fallbackBlogPosts);
      } finally {
        setLoading(false);
      }
    }

    fetchBlogs();
  }, []);

  const fallbackBlogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "tips-memilih-venue-pernikahan",
      title: "Tips Memilih Venue Pernikahan",
      excerpt: "Pelajari cara memilih tempat terbaik untuk acara spesial Anda agar momen sakral menjadi tak terlupakan...",
      category: "Tips",
      date: "01 Mei 2026",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "2",
      slug: "arsitektur-rumah-budaya-tembi",
      title: "Mengenal Arsitektur Rumah Budaya Tembi",
      excerpt: "Jelajahi keunikan desain tradisional Jawa yang tetap terjaga dan penuh filosofi di setiap sudutnya...",
      category: "Budaya",
      date: "28 April 2026",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: "3",
      slug: "kuliner-tradisional-wajib-dicoba",
      title: "Kuliner Tradisional yang Wajib Dicoba",
      excerpt: "Sajian autentik dari dapur Tembi yang membawa Anda bernostalgia dengan cita rasa masa lalu...",
      category: "Kuliner",
      date: "15 April 2026",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <main className="w-full min-h-screen bg-white">
      {/* HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2000&auto=format&fit=crop"
            alt="Blog Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-24">
          <div className="max-w-3xl flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-3 border border-white/30 bg-white/10 backdrop-blur-sm px-5 py-2 rounded-full mb-8">
              <Image
                src="/images/icons/book-white.png"
                alt="Blog"
                width={16}
                height={16}
                className="w-4 h-4 object-contain brightness-0 invert"
              />
              <span className="text-sm font-medium tracking-wide text-white">Blog & Stories</span>
            </div>

            <h1 className="font-serif text-6xl font-bold text-white mb-6 leading-none drop-shadow-lg">
              Tembi <br /> Stories
            </h1>

            <p className="font-serif italic text-lg text-gray-200 mb-6 tracking-wide">
              Discover the Heritage, Culture & Inspiration
            </p>

            <p className="text-base text-gray-300 leading-relaxed max-w-xl">
              Temukan inspirasi seputar budaya Jawa, keindahan arsitektur, dan tips spesial untuk momen berharga Anda
            </p>
          </div>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <a href="#blog-content" className="animate-bounce cursor-pointer p-2 block">
              <Image
                src="/images/icons/arrow-down-white.png"
                alt="Scroll Down"
                width={16}
                height={16}
                className="brightness-0 invert drop-shadow-md"
              />
            </a>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section id="blog-content" className="py-24 px-6 sm:px-12 lg:px-24 max-w-[1400px] mx-auto bg-white">
        <ScrollReveal animation="fadeUp" duration={800}>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 mb-4">
              <Image
                src="/images/icons/book-black.png"
                alt="icon"
                width={16}
                height={16}
                className="w-4 h-4"
              />
              <span className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                Our Stories
              </span>
            </div>

            <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Latest <span className="text-[#8F9E75]">Articles</span>
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed">
              Explore stories, insights, and inspiration from Tembi Cultural House
            </p>
          </div>
        </ScrollReveal>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B9D68]"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {blogPosts.map((post, idx) => (
              <ScrollReveal key={post.id} animation="fadeUp" delay={idx * 150} duration={800}>
                <BlogCard
                  post={{
                    id: post.id,
                    slug: post.slug,
                    title: language === 'id'
                      ? (post.title_ind || post.title || '')
                      : (post.title_eng || post.title || ''),
                    excerpt: language === 'id'
                      ? (post.description_ind || post.excerpt || '')
                      : (post.description_eng || post.excerpt || ''),
                    category: post.category,
                    date: post.date,
                    imageUrl: post.thumbnail || post.imageUrl || ''
                  }}
                  readMoreText={t.nav.readMore || "BACA SELENGKAPNYA"}
                />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
