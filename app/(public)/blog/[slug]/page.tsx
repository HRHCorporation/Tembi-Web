'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Share2, ArrowLeft } from 'lucide-react';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;

  const postDetails: Record<string, { title: string; date: string; category: string; imageUrl: string; content: string[] }> = {
    "tips-memilih-venue-pernikahan": {
      title: "Tips Memilih Venue Pernikahan yang Sempurna",
      date: "01 Mei 2026",
      category: "Tips & Trick",
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop",
      content: [
        "Memilih tempat pernikahan adalah salah satu keputusan terbesar dalam perencanaan acara Anda. Venue bukan sekadar latar belakang, melainkan elemen yang menentukan atmosfer seluruh momen sakral tersebut.",
        "Di Tembi, kami menyediakan perpaduan antara keasrian alam dan arsitektur tradisional yang memberikan kesan hangat dan intim bagi setiap tamu yang hadir.",
        "Pastikan Anda mempertimbangkan aksesibilitas dan fasilitas pendukung seperti ruang transit pengantin dan area parkir yang memadai untuk kenyamanan bersama."
      ]
    },
    "arsitektur-rumah-budaya-tembi": {
      title: "Mengenal Arsitektur Rumah Budaya Tembi",
      date: "28 April 2026",
      category: "Budaya",
      imageUrl: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
      content: [
        "Rumah Budaya Tembi berdiri sebagai penjaga warisan leluhur. Arsitektur Jawa yang kental dengan penggunaan material kayu jati memberikan filosofi kekuatan dan ketenangan.",
        "Setiap bangunan di kompleks ini dirancang dengan memperhatikan sirkulasi udara alami, mencerminkan kearifan lokal dalam merespon iklim tropis.",
        "Menjelajahi Tembi adalah perjalanan melintasi waktu, di mana setiap ukiran memiliki cerita dan setiap sudut menyimpan sejarah yang patut dipelajari."
      ]
    },
    "kuliner-tradisional-wajib-dicoba": {
      title: "Sajian Autentik: Kuliner Tradisional Tembi",
      date: "15 April 2026",
      category: "Kuliner",
      imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
      content: [
        "Dapur Tembi dikenal dengan resep-resep warisan yang tetap dijaga keasliannya. Kami percaya bahwa rasa adalah bahasa budaya yang paling universal.",
        "Setiap suapan adalah penghormatan bagi kekayaan tanah Jawa yang agraris dan penuh syukur bagi para penikmat masakan nusantara."
      ]
    }
  };

  const post = postDetails[slug];

  const otherPosts = Object.keys(postDetails)
    .filter(key => key !== slug)
    .map(key => ({ slug: key, ...postDetails[key] }));

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fdfcf7] flex flex-col items-center justify-center p-6 text-[#2d3436]">
        <h1 className="text-xl font-serif mb-4 text-[#8da077]">Artikel Tidak Ditemukan</h1>
        <Link href="/blog" className="font-bold flex items-center gap-2 text-[#8da077] hover:opacity-70 transition-opacity">
          <ArrowLeft size={18} /> Kembali ke Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fdfcf7] text-[#2d3436] pb-20 font-sans">
      
      {/* Navigation Header */}
      <div className="container mx-auto px-6 pt-32 mb-10">
        <Link href="/blog" className="inline-flex items-center gap-2 text-[#8da077] hover:opacity-70 transition-opacity mb-6">
          <div className="w-7 h-7 rounded-full border border-[#8da077] flex items-center justify-center">
            <ChevronLeft size={14} />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Blog</span>
        </Link>

        <div className="max-w-4xl text-left">
          <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">
            <span>{post.date}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-8 tracking-tight text-[#2d3436]">
            {post.title}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-5xl mx-auto w-full h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          
          {/* Metadata Bar */}
          <div className="flex items-center justify-between py-5 border-y border-gray-100 mb-10">
            <div className="flex items-center gap-2 text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Calendar size={14} className="text-[#8da077]" />
              Diterbitkan: {post.date}
            </div>
            <button className="flex items-center gap-2 text-[#8da077] text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity">
              <Share2 size={14} /> Bagikan
            </button>
          </div>

          {/* Konten Artikel */}
          <article className="prose prose-stone max-w-none mb-24">
            {post.content.map((paragraph, index) => (
              <p 
                key={index} 
                className="text-[#4a4a4a] leading-[2] text-lg font-normal mb-8 tracking-wide text-justify md:text-left"
              >
                {paragraph}
              </p>
            ))}
          </article>

          {/* Artikel Lainnya */}
          <div className="pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-serif font-bold mb-10 text-[#2d3436]">Baca Artikel Lainnya</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {otherPosts.map((other) => (
                <Link key={other.slug} href={`/blog/${other.slug}`} className="group">
                  <div className="flex flex-col gap-5">
                    <div className="aspect-[16/10] rounded-xl overflow-hidden shadow-md">
                      <img
                        src={other.imageUrl}
                        alt={other.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-xl group-hover:text-[#8da077] transition-colors leading-snug text-[#2d3436]">
                        {other.title}
                      </h4>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
