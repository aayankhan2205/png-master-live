"use client";
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
        const res = await fetch(`https://res.cloudinary.com/dic1ahqrn/image/list/png.json`);
        const data = await res.json();
        const found = data.resources.find((r: any) => r.public_id === slug);
        setImg(found);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchImage();
  }, [slug]);

  if (loading) return <div style={{padding:'100px', textAlign:'center', fontWeight:'bold'}}>Loading...</div>;
  if (!img) return <div style={{padding:'100px', textAlign:'center', fontWeight:'bold'}}>Image not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* 1. Breadcrumbs */}
      <div style={{ marginBottom: '30px', fontSize: '14px' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>HOME</Link>
        <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
        <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{img.public_id}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="desktop-grid">
        <style>{`
          @media (min-width: 1024px) {
            .desktop-grid { grid-template-columns: 2fr 1fr !important; }
          }
        `}</style>

        {/* LEFT COLUMN: IMAGE & INFO */}
        <div>
          <div className="checkerboard" style={{ border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'center', minHeight: '450px', boxShadow: '0 10px 30px rgba(0,0,0,0.02)' }}>
            <img 
              src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} 
              alt={img.public_id} 
              style={{ maxHeight: '450px', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 900, marginTop: '30px', marginBottom: '20px', color: '#0f172a' }}>
            {img.public_id.split('/').pop()} Transparent PNG
          </h1>

          {/* Info Table */}
          <div style={{ border: '1px solid #e2e8f0', borderRadius: '16px', overflow: 'hidden', marginBottom: '30px', background: '#fff' }}>
            <div style={{ backgroundColor: '#f8fafc', padding: '12px 20px', borderBottom: '1px solid #e2e8f0', fontWeight: 'bold', fontSize: '12px', color: '#2563eb' }}>PNG INFO</div>
            <div style={{ padding: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                <span style={{ color: '#64748b' }}>Format</span>
                <span style={{ fontWeight: 'bold' }}>PNG (HD)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Background</span>
                <span style={{ fontWeight: 'bold' }}>Fully Transparent</span>
              </div>
            </div>
          </div>

          <a 
            href={`https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`}
            style={{ display: 'block', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', padding: '22px', borderRadius: '16px', fontWeight: '900', fontSize: '20px', textDecoration: 'none', boxShadow: '0 10px 20px rgba(37,99,235,0.2)' }}
          >
            📥 DOWNLOAD ORIGINAL PNG
          </a>
        </div>

          {/* RIGHT COLUMN: SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '15px', color: '#0f172a' }}>📐 ONLINE RESIZE PNG</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="number" 
                id="userWidth"
                placeholder="Width" 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
              />
              <input 
                type="number" 
                id="userHeight"
                placeholder="Height" 
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} 
              />
            </div>
            <button 
              onClick={() => {
                const w = (document.getElementById('userWidth') as HTMLInputElement).value;
                const h = (document.getElementById('userHeight') as HTMLInputElement).value;
                const resizeUrl = `https://res.cloudinary.com/dic1ahqrn/image/upload/w_${w || 500},h_${h || 500},c_pad/f_auto/${img.public_id}.png`;
                window.open(resizeUrl, '_blank');
              }}
              style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Resize & Download
            </button>
          </div>
          <div style={{ height: '300px', backgroundColor: '#f1f5f9', border: '2px dashed #e2e8f0', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>
            ADVERTISEMENT
          </div>

        </div>
      </div>
    </div>
  );
}