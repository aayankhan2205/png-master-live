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
        const found = data.resources.find((r: any) => r.public_id === slug);
        setImg(found);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchImage();
  }, [slug]);

  // MAGIC FUNCTION: Forces the browser to download instead of opening a tab
  const forceDownload = async (isResized: boolean) => {
    let url = `https://res.cloudinary.com/dic1ahqrn/image/upload/fl_attachment/${img.public_id}.png`;
    
    if (isResized && (w || h)) {
      url = `https://res.cloudinary.com/dic1ahqrn/image/upload/w_${w || img.width},h_${h || img.height},c_limit/fl_attachment/${img.public_id}.png`;
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `pngworlds-${slug}${isResized ? '-resized' : ''}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      // Fallback if fetch is blocked
      window.open(url, '_blank');
    }
  };

  if (loading) return <div style={{padding:'100px', textAlign:'center', fontWeight:'bold'}}>Loading...</div>;
  if (!img) return <div style={{padding:'100px', textAlign:'center', fontWeight:'bold'}}>Image not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      <div style={{ marginBottom: '30px', fontSize: '14px' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>HOME</Link>
        <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
        <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{img.public_id}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="desktop-grid">
        <style>{`
          @media (min-width: 1024px) { .desktop-grid { grid-template-columns: 2fr 1fr !important; } }
        `}</style>

        <div>
          <div className="checkerboard" style={{ border: '1px solid #e2e8f0', borderRadius: '24px', padding: '40px', display: 'flex', justifyContent: 'center', minHeight: '450px' }}>
            <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} style={{ maxHeight: '450px', maxWidth: '100%', objectFit: 'contain' }} />
          </div>

          <h1 style={{ fontSize: '32px', fontWeight: 900, marginTop: '30px', marginBottom: '20px' }}>
            {img.public_id.split('/').pop()} Transparent PNG
          </h1>

          <button 
            onClick={() => forceDownload(false)}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', padding: '22px', borderRadius: '16px', fontWeight: '900', fontSize: '20px', border: 'none', cursor: 'pointer' }}
          >
            📥 DOWNLOAD ORIGINAL PNG
          </button>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '15px' }}>📐 ONLINE RESIZE PNG</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" placeholder="W" value={w} onChange={e => setW(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
              <input type="number" placeholder="H" value={h} onChange={e => setH(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }} />
            </div>
            <button 
              onClick={() => forceDownload(true)}
              style={{ width: '100%', marginTop: '15px', padding: '12px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}
            >
              Resize & Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}