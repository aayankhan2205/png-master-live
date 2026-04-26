"use client";
export const runtime = 'edge';
import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [img, setImg] = useState<any>(null);

  useEffect(() => {
    async function fetchImage() {
      const res = await fetch(`https://res.cloudinary.com/dic1ahqrn/image/list/png.json`);
      const data = await res.json();
      setImg(data.resources.find((r: any) => r.public_id === slug));
    }
    fetchImage();
  }, [slug]);

  if (!img) return null;

  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      {/* --- STANDARD NAVBAR (Same as Home) --- */}
      <nav style={{ width: '100%', padding: '20px 5%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eee' }}>
        <Link href="/" style={{ fontSize: '24px', fontWeight: 900, color: '#3b82f6', textDecoration: 'none' }}>PNG<span style={{color: '#1e3a8a'}}>WORLD</span></Link>
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none', color: '#1e3a8a', fontWeight: 'bold', fontSize: '13px' }}>HOME</Link>
          <Link href="/resize" style={{ background: '#0f172a', color: 'white', padding: '10px 25px', borderRadius: '50px', fontWeight: 'bold', textDecoration: 'none', fontSize: '13px' }}>RESIZE TOOL</Link>
        </div>
      </nav>

      {/* --- PAGE CONTENT --- */}
      <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
         {/* ... (Keep your image display and download button code here) ... */}
      </div>
    </div>
  );
}