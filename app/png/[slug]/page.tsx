"use client";
import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [img, setImg] = useState<any>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(`https://res.cloudinary.com/dic1ahqrn/image/list/png.json`);
        const data = await res.json();
        const found = data.resources.find((r: any) => r.public_id === slug);
        setImg(found);
      } catch (e) { console.error(e); }
    }
    fetchImage();
  }, [slug]);

  if (!img) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 min-h-screen font-sans">
      <Link href="/" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 'bold' }}>← Back</Link>
      <div style={{ border: '1px solid #eee', borderRadius: '20px', padding: '40px', marginTop: '20px', textAlign: 'center', backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)', backgroundSize: '20px 20px' }}>
        <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} style={{ maxHeight: '400px', objectFit: 'contain' }} />
      </div>
      <h1 style={{ marginTop: '30px', fontSize: '24px', fontWeight: '900' }}>{img.public_id.split('/').pop()} PNG</h1>
      <a 
        href={`https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`}
        style={{ display: 'block', background: '#1a73e8', color: '#fff', textAlign: 'center', padding: '20px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', marginTop: '20px' }}
      >
        DOWNLOAD PNG
      </a>
    </div>
  );
}