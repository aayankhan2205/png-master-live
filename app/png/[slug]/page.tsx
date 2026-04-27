"use client";
export const runtime = 'edge';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const [img, setImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [w, setW] = useState("");
  const [h, setH] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const res = await fetch(`https://res.cloudinary.com/dic1ahqrn/image/list/png.json`);
        const data = await res.json();
        setImg(data.resources.find((r: any) => r.public_id === slug));
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchImage();
  }, [slug]);

  // NEW STRATEGY: Forces a new tab to open for the download
  const handleDownload = (isResized: boolean) => {
    if (!img) return;
    let url = `https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`;
    
    if (isResized && (w || h)) {
      url = `https://res.cloudinary.com/dic1ahqrn/image/upload/w_${w || 500},h_${h || 500},c_limit/fl_attachment/${img.public_id}.png`;
    }
    
    // This forces the new window/tab
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (loading) return <div style={{padding:'100px', textAlign:'center', fontWeight:'bold'}}>Loading...</div>;
  if (!img) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ marginBottom: '30px' }}><Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>← HOME</Link></div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="desktop-grid">
        <style>{`@media (min-width: 1024px) { .desktop-grid { grid-template-columns: 2fr 1fr !important; } }`}</style>

        <div>
          <div className="checkerboard" style={{ border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'center', minHeight: '450px', backgroundColor: '#fff' }}>
            <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} alt={img.public_id} style={{ maxHeight: '450px', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: 900, marginTop: '30px' }}>{img.public_id.split('/').pop()} Transparent PNG</h1>
          
          {/* Main Button with New Tab strategy */}
          <button 
            onClick={() => handleDownload(false)}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', padding: '22px', borderRadius: '16px', fontWeight: '900', fontSize: '20px', border: 'none', cursor: 'pointer', marginTop: '20px' }}
          >
            📥 DOWNLOAD ORIGINAL PNG
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, marginBottom: '15px' }}>📐 ONLINE RESIZE PNG</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" placeholder="W" value={w} onChange={e => setW(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <input type="number" placeholder="H" value={h} onChange={e => setH(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            </div>
            <button onClick={() => handleDownload(true)} style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
              Resize & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}