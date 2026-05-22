'use client';

import React from 'react';
import Link from 'next/link';

interface BlogCardProps {
  post: {
    id: string;
    slug: string;
    title: string;
    excerpt: string;
    category: string;
    date: string;
    imageUrl: string;
  };
  readMoreText: string;
}

export const BlogCard = ({ post, readMoreText }: BlogCardProps) => {
  return (
    <Link href={`/blog/${post.slug}`} className="group">
      {/* Container: Background terang, border halus, shadow lembut */}
      <article className="h-full bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-500 flex flex-col shadow-sm hover:-translate-y-2">
        
        {/* Container Gambar */}
        <div className="w-full h-56 overflow-hidden relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>

        {/* Konten Teks */}
        <div className="p-8 flex flex-col flex-grow">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-400 text-[11px] font-medium tracking-wider uppercase">{post.date}</span>
          </div>

          {/* Judul: Menggunakan Serif agar elegan */}
          <h2 className="text-2xl font-bold mb-4 text-[#2d3436] group-hover:text-[#8da077] transition-colors leading-tight font-serif">
            {post.title}
          </h2>

          <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
            {post.excerpt}
          </p>

          {/* Tombol: Hijau Zaitun Solid seperti tombol "Book Now" */}
          <div className="mt-auto w-full py-3 bg-[#8da077] text-white text-center rounded-lg font-bold text-xs tracking-[0.2em] uppercase transition-all duration-300 group-hover:bg-[#7a8c66] shadow-sm">
            {readMoreText}
          </div>
        </div>
      </article>
    </Link>
  );
};