"use client";


import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [img, setImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We are no longer using Supabase to fetch, we are using the Cloudinary List API
    async function fetchImage() {
      try {
        const res = await fetch(`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/list/png.json`);
        const data = await res.json();
        // Find the image that matches our slug
        const found = data.resources.find((r: any) => r.public_id === slug);
        setImg(found);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [slug]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!img) return <div className="p-20 text-center">Image not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-10 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-bold capitalize mb-6">{img.public_id}</h1>
      <div className="bg-zinc-900 rounded-3xl p-12 flex justify-center mb-10">
        <img 
          src={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/f_auto,q_auto/${img.public_id}.png`} 
          alt={img.public_id} 
          className="max-h-[500px]" 
        />
      </div>
      <a 
        href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_NAME}/image/upload/fl_attachment/${img.public_id}.png`}
        className="block w-full bg-white text-black text-center py-5 rounded-2xl font-black text-2xl"
      >
        DOWNLOAD PNG
      </a>
    </div>
  );
}