"use client";

// 1. THIS IS THE MAGIC LINE CLOUDFLARE IS ASKING FOR 👇
export const runtime = 'edge'; 

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [img, setImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImage() {
      try {
        // REPLACE dic1ahqrn WITH YOUR REAL CLOUD NAME IF IT CHANGED
        const res = await fetch(`https://res.cloudinary.com/dic1ahqrn/image/list/png.json`);
        const data = await res.json();
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

  if (loading) return <div style={{padding:'50px', textAlign:'center', fontFamily:'sans-serif'}}>Loading PNG...</div>;
  if (!img) return <div style={{padding:'50px', textAlign:'center', fontFamily:'sans-serif'}}>Image not found</div>;

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <Link href="/" style={{ color: '#1a73e8', textDecoration: 'none', fontWeight: 'bold' }}>← Back to Home</Link>
      
      <div style={{ 
        border: '1px solid #eee', borderRadius: '20px', padding: '40px', marginTop: '20px', textAlign: 'center', 
        backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)', 
        backgroundSize: '20px 20px' 
      }}>
        <img 
          src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} 
          style={{ maxHeight: '400px', maxWidth: '100%', objectFit: 'contain' }} 
        />
      </div>

      <h1 style={{ marginTop: '30px', fontSize: '28px', fontWeight: '900', textTransform: 'capitalize' }}>
        {img.public_id.split('/').pop()} Transparent PNG
      </h1>

      <a 
        href={`https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`}
        style={{ display: 'block', background: '#1a73e8', color: '#fff', textAlign: 'center', padding: '20px', borderRadius: '15px', fontWeight: '900', textDecoration: 'none', marginTop: '20px' }}
      >
        DOWNLOAD ORIGINAL PNG
      </a>
    </div>
  );
}