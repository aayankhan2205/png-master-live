"use client";

// MUST BE HERE FOR CLOUDFLARE
export const runtime = 'edge';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  
  const [img, setImg] = useState<any>(null);
  const [relatedImages, setRelatedImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

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

        const related = data.resources.filter((r: any) => r.public_id !== slug).slice(0, 4);
        setRelatedImages(related);
      } catch (e: any) { 
        console.error(e); 
      } finally { 
        setLoading(false); 
      }
    }
    fetchImage();
  }, [slug]);

  const silentDownload = async (isResized: boolean) => {
    if (!img || downloading) return;
    setDownloading(true);

    let url = `https://res.cloudinary.com/dic1ahqrn/image/upload/f_png/${img.public_id}.png`;
    if (isResized && (w || h)) {
      url = `https://res.cloudinary.com/dic1ahqrn/image/upload/w_${w || 500},h_${h || 500},c_fit/f_png/${img.public_id}.png`;
    }

    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${img.public_id.split('/').pop()}${isResized ? '-resized' : ''}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      window.open(url, '_blank');
    } finally {
      setDownloading(false);
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>Loading...</div>;
  if (!img) return <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>Image not found</div>;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif', color: '#0f172a' }}>
      
      <style>{`
        .ad-horizontal { width: 100%; height: 120px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 800; letter-spacing: 2px; font-size: 12px; margin-bottom: 25px; }
        .ad-vertical { width: 100%; height: 600px; background: #f8fafc; border: 2px dashed #cbd5e1; border-radius: 12px; display: flex; align-items: center; justify-content: center; color: #94a3b8; font-weight: 800; letter-spacing: 2px; font-size: 12px; margin-bottom: 25px; }
        .detail-grid { display: grid; grid-template-columns: 1fr; gap: 30px; }
        @media (min-width: 1024px) { .detail-grid { grid-template-columns: 2fr 1fr; } }
        .checkerboard { height: 320px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f1f5f9 25%, transparent 25%), linear-gradient(-45deg, #f1f5f9 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f1f5f9 75%), linear-gradient(-45deg, transparent 75%, #f1f5f9 75%); background-size: 15px 15px; background-color: #fff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 20px; margin-bottom: 25px; }
        .main-img { max-height: 280px; max-width: 100%; object-fit: contain; filter: drop-shadow(0 10px 15px rgba(0,0,0,0.1)); }
        .related-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 15px; margin-top: 20px; }
        @media (min-width: 768px) { .related-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); } }
        .r-card { border: 1px solid #e2e8f0; border-radius: 15px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.2s; background: #fff;}
        .r-card:hover { transform: translateY(-3px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .r-checker { height: 150px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 10px 10px; padding: 10px; }
      `}</style>

      <div style={{ marginBottom: '20px', fontSize: '12px', fontWeight: 'bold' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none' }}>HOME</Link>
        <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
        <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{img.public_id.split('/').pop()}</span>
      </div>

      <div className="detail-grid">
        <div>
          <div className="ad-horizontal">ADVERTISEMENT SLOT (TOP)</div>
          
          <div className="checkerboard">
            <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/f_auto,q_auto/${img.public_id}.png`} alt={img.public_id} className="main-img" />
          </div>

          <h1 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '20px', textTransform: 'capitalize' }}>
            {img.public_id.split('/').pop()} Transparent PNG
          </h1>

          <button 
            onClick={() => silentDownload(false)}
            disabled={downloading}
            style={{ width: '100%', backgroundColor: '#2563eb', color: '#fff', padding: '18px', borderRadius: '16px', fontWeight: '900', fontSize: '18px', border: 'none', cursor: 'pointer', marginBottom: '20px', opacity: downloading ? 0.7 : 1 }}
          >
            {downloading ? "PROCESSING..." : "📥 DOWNLOAD ORIGINAL PNG"}
          </button>

          <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '13px', fontWeight: 900, marginBottom: '15px' }}>📐 ONLINE RESIZE & DOWNLOAD</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="number" placeholder="Width (px)" value={w} onChange={e => setW(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
              <input type="number" placeholder="Height (px)" value={h} onChange={e => setH(e.target.value)} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none' }} />
              <button onClick={() => silentDownload(true)} disabled={downloading} style={{ backgroundColor: '#0f172a', color: '#fff', padding: '0 25px', borderRadius: '8px', fontWeight: 'bold', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                {downloading ? "Wait..." : "Resize"}
              </button>
            </div>
          </div>

          <div className="ad-horizontal">ADVERTISEMENT SLOT (BOTTOM)</div>
        </div>

        <div>
          <div className="ad-vertical">SIDEBAR AD SLOT</div>
          <div style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '20px' }}>
            <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '10px' }}>ⓘ LICENSE</h3>
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.6' }}>Free for personal and commercial use. No attribution required.</p>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '50px', borderTop: '2px solid #f1f5f9', paddingTop: '40px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '10px' }}>Related PNG Images</h2>
        <div className="related-grid">
          {relatedImages.map((relImg) => (
            <Link key={relImg.public_id} href={`/png/${relImg.public_id}`} className="r-card">
              <div className="r-checker">
                <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_300,f_auto/${relImg.public_id}.png`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
              </div>
              <div style={{ padding: '12px', fontSize: '12px', fontWeight: 'bold', color: '#334155', borderTop: '1px solid #f1f5f9' }}>
                {relImg.public_id.split('/').pop()}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}