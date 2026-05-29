'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Calendar, Share2, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { toast } from 'sonner';

interface Blog {
  id: number;
  title_ind: string;
  title_eng: string;
  description_ind: string;
  description_eng: string;
  thumbnail: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

interface BlogDetailData {
  detail: Blog;
  latest: Blog[];
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const { language } = useLanguage();

  const [data, setData] = useState<BlogDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBlogDetail() {
      try {
        setLoading(true);
        const response = await fetch(`/api/public/blogs/${slug}`);
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        } else {
          setError(result.message || 'Blog not found');
        }
      } catch (err) {
        console.error('Error fetching blog detail:', err);
        setError('Failed to load blog');
      } finally {
        setLoading(false);
      }
    }

    fetchBlogDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fdfcf7] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8da077]"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-[#fdfcf7] flex flex-col items-center justify-center p-6 text-[#2d3436]">
        <h1 className="text-xl font-serif mb-4 text-[#8da077]">
          {language === 'id' ? 'Artikel Tidak Ditemukan' : 'Article Not Found'}
        </h1>
        <Link href="/blog" className="font-bold flex items-center gap-2 text-[#8da077] hover:opacity-70 transition-opacity">
          <ArrowLeft size={18} /> {language === 'id' ? 'Kembali ke Blog' : 'Back to Blog'}
        </Link>
      </div>
    );
  }

  const post = data.detail;
  const title = language === 'id' ? post.title_ind : post.title_eng;
  const content = language === 'id' ? post.description_ind : post.description_eng;
  const formattedDate = new Date(post.created_at).toLocaleDateString(language === 'id' ? 'id-ID' : 'en-US', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = title || 'Tembi Blog';

    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          console.error('Error sharing:', err);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast.success(
          language === 'id' 
            ? 'Tautan artikel berhasil disalin!' 
            : 'Article link successfully copied!'
        );
      } catch (err) {
        console.error('Failed to copy to clipboard:', err);
        toast.error(
          language === 'id'
            ? 'Gagal menyalin tautan'
            : 'Failed to copy link'
        );
      }
    }
  };

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
            <span>{formattedDate}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-serif leading-tight mb-8 tracking-tight text-[#2d3436]">
            {title}
          </h1>
        </div>
      </div>

      {/* Featured Image */}
      <div className="container mx-auto px-6 mb-16">
        <div className="max-w-5xl mx-auto w-full h-[35vh] md:h-[50vh] rounded-2xl overflow-hidden shadow-2xl shadow-gray-200/50">
          <img
            src={post.thumbnail}
            alt={title}
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
              {language === 'id' ? 'Diterbitkan:' : 'Published:'} {formattedDate}
            </div>
            <button 
              onClick={handleShare}
              className="flex items-center gap-2 text-[#8da077] text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-70 transition-opacity"
            >
              <Share2 size={14} /> {language === 'id' ? 'Bagikan' : 'Share'}
            </button>
          </div>

          {/* Konten Artikel */}
          <article className="prose prose-stone max-w-none mb-24">
            <div
              className="text-[#4a4a4a] leading-loose text-lg font-normal tracking-wide text-justify md:text-left"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>

          {/* Artikel Lainnya */}
          {data.latest.length > 0 && (
            <div className="pt-16 border-t border-gray-200">
              <h2 className="text-2xl font-serif font-bold mb-10 text-[#2d3436]">
                {language === 'id' ? 'Baca Artikel Lainnya' : 'Read Other Articles'}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {data.latest.slice(0, 4).map((other) => (
                  <Link key={other.slug} href={`/blog/${other.slug}`} className="group">
                    <div className="flex flex-col gap-5">
                      <div className="aspect-video rounded-xl overflow-hidden shadow-md">
                        <img
                          src={other.thumbnail}
                          alt={language === 'id' ? other.title_ind : other.title_eng}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-xl group-hover:text-[#8da077] transition-colors leading-snug text-[#2d3436]">
                          {language === 'id' ? other.title_ind : other.title_eng}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
