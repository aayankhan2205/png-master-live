"use client";

export const runtime = 'edge';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [img, setImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Resize State
  const [w, setW] = useState("");
  const [h, setH] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const cloudName = "dic1ahqrn"; 
        const url = `https://res.cloudinary.com/${cloudName}/image/list/png.json`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Connection failed");
        const data = await res.json();
        const found = data.resources.find((r: any) => r.public_id === slug);
        if (found) setImg(found); else setError("Not found");
      } catch (e: any) { setError(e.message); } finally { setLoading(false); }
    }
    fetchImage();
  }, [slug]);

  // NEW STRATEGY: Opens Resize Action in a New Window
  const handleResizeDownload = () => {
    if (!img) return;
    const resizeUrl = `https://res.cloudinary.com/dic1ahqrn/image/upload/w_${w || 500},h_${h || 500},c_limit/fl_attachment/${img.public_id}.png`;
    
    // Forces new tab
    window.open(resizeUrl, '_blank');
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading...</div>;
  if (error) return <div style={{ padding: '100px', textAlign: 'center' }}>Error: {error}</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ marginBottom: '30px', fontSize: '14px' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>HOME</Link>
        <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
        <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{img.public_id}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="detail-grid">
        <style>{`
          @media (min-width: 1024px) { .detail-grid { grid-template-columns: 2fr 1fr !important; } }
        `}</style>

        {/* --- LEFT COLUMN --- */}
        <div>
          <div className="checkerboard" style={{ border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'center', minHeight: '450px', backgroundColor: '#fff' }}>
            <img 
              src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} 
              alt={img.public_id} 
              style={{ maxHeight: '450px', maxWidth: '100%', objectFit: 'contain' }} 
            />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 900, marginTop: '30px', marginBottom: '20px' }}>
            {img.public_id.split('/').pop()} Transparent PNG
          </h1>

          {/* NEW STRATEGY: target="_blank" added to force new window */}
          <a 
            href={`https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'block', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', padding: '22px', borderRadius: '16px', fontWeight: '900', fontSize: '20px', textDecoration: 'none' }}
          >
            📥 DOWNLOAD ORIGINAL PNG
          </a>
        </div>

        {/* --- RIGHT COLUMN (SIDEBAR) --- */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, marginBottom: '15px', color: '#0f172a', letterSpacing: '0.5px' }}>📐 ONLINE RESIZE PNG</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input 
                type="number" placeholder="W" value={w} onChange={(e) => setW(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} 
              />
              <input 
                type="number" placeholder="H" value={h} onChange={(e) => setH(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} 
              />
            </div>
            <button 
              onClick={handleResizeDownload}
              style={{ width: '100%', marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              Resize & Download
            </button>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '10px' }}>ⓘ LICENSE</h3>
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>Free for personal & commercial use.</p>
          </div>

          <div style={{ height: '300px', backgroundColor: '#f1f5f9', border: '2px dashed #e2e8f0', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>
            ADVERTISEMENT
          </div>

        </div>
      </div>
    </div>
  );
}