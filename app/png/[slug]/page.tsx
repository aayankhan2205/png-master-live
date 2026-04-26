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
      } catch (e) {
        console.error(e);
      }
    }
    fetchImage();
  }, [slug]);

  if (!img) return <div className="p-20 text-center font-bold">Loading Image...</div>;

  return (
    <div className="max-w-6xl mx-auto p-8 bg-white min-h-screen font-sans text-gray-800">
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>
        <Link href="/" style={{ fontWeight: 900, color: '#1a73e8', textDecoration: 'none' }}>← BACK TO HOME</Link>
        <span style={{ fontWeight: 900 }}>PNGSTOCK</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        
        {/* IMAGE BOX */}
        <div style={{ 
          border: '1px solid #e2e8f0', borderRadius: '20px', padding: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px',
          backgroundImage: 'linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%)',
          backgroundSize: '20px 20px', backgroundColor: '#fff'
        }}>
          <img 
            src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} 
            alt={img.public_id} 
            style={{ maxHeight: '400px', objectFit: 'contain' }} 
          />
        </div>

        {/* INFO & DOWNLOAD */}
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '20px', textTransform: 'capitalize' }}>
            {img.public_id.split('/').pop()} Transparent PNG
          </h1>

          {/* Info Table */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '12px', overflow: 'hidden', marginBottom: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', borderBottom: '1px solid #e2e8f0' }}>
              <span style={{ color: '#64748b', fontWeight: 'bold' }}>Format</span>
              <span style={{ fontWeight: 'bold' }}>PNG (Transparent)</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
              <span style={{ color: '#64748b', fontWeight: 'bold' }}>Public ID</span>
              <span style={{ fontWeight: 'bold' }}>{img.public_id}</span>
            </div>
          </div>

          {/* Download Button */}
          <a 
            href={`https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`}
            style={{ display: 'block', width: '100%', backgroundColor: '#1a73e8', color: '#fff', textAlign: 'center', padding: '20px', borderRadius: '12px', fontWeight: '900', fontSize: '18px', textDecoration: 'none' }}
          >
            📥 DOWNLOAD ORIGINAL PNG
          </a>
        </div>
      </div>
    </div>
  );
}