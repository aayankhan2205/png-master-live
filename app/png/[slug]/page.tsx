"use client";

export const runtime = 'edge';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [img, setImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false); // New state to prevent double clicks

  // Resize State
  const [w, setW] = useState("");
  const [h, setH] = useState("");

  useEffect(() => {
    async function fetchImage() {
      try {
        const cloudName = "dic1ahqrn"; 
        const url = `https://res.cloudinary.com/${cloudName}/image/list/png.json`;
        const res = await fetch(url);
        const data = await res.json();
        const found = data.resources.find((r: any) => r.public_id === slug);
        setImg(found);
      } catch (e: any) { console.error(e); } finally { setLoading(false); }
    }
    fetchImage();
  }, [slug]);

  // --- THE MAGIC NO-BLINK DOWNLOAD FUNCTION ---
  const silentDownload = async (isResized: boolean) => {
    if (!img || downloading) return;
    setDownloading(true);

    // 1. Build the correct Cloudinary URL
    let url = `https://res.cloudinary.com/dic1ahqrn/image/upload/f_png/${img.public_id}.png`;
    if (isResized && (w || h)) {
      url = `https://res.cloudinary.com/dic1ahqrn/image/upload/w_${w || 500},h_${h || 500},c_fill/f_png/${img.public_id}.png`;
    }

    try {
      // 2. Fetch the image data as a Blob (Silent background request)
      const response = await fetch(url);
      const blob = await response.blob();
      
      // 3. Create a local temporary link to trigger the "Save" dialog
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${img.public_id.split('/').pop()}${isResized ? '-resized' : ''}.png`;
      
      // 4. Click it and clean up
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
      // Fallback: only open in new tab if background fetch fails
      window.open(url, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading...</div>;

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

          <button 
            onClick={() => silentDownload(false)}
            disabled={downloading}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', textAlign: 'center', padding: '22px', borderRadius: '16px', fontWeight: '900', fontSize: '20px', border: 'none', cursor: 'pointer', opacity: downloading ? 0.7 : 1 }}
          >
            {downloading ? "PROCESSING..." : "📥 DOWNLOAD ORIGINAL PNG"}
          </button>
        </div>

        {/* SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '20px', padding: '25px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, marginBottom: '15px' }}>📐 ONLINE RESIZE PNG</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" placeholder="W" value={w} onChange={e => setW(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
              <input type="number" placeholder="H" value={h} onChange={e => setH(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }} />
            </div>
            <button 
              onClick={() => silentDownload(true)}
              disabled={downloading}
              style={{ width: '100%', marginTop: '15px', padding: '15px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '12px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
            >
              {downloading ? "WAIT..." : "Resize & Download"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}