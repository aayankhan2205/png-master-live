"use client";

// Required for Cloudflare Pages dynamic routes
export const runtime = 'edge';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';

export default function PngPage({ params }: { params: Promise<{ slug: string }> }) {
  // 1. Unwrap the slug (public_id)
  const { slug } = use(params);
  
  const [img, setImg] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImage() {
      try {
        const cloudName = "dic1ahqrn"; 
        const url = `https://res.cloudinary.com/${cloudName}/image/list/png.json`;
        
        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error("Could not connect to Cloudinary. Make sure 'Resource List' is enabled in Cloudinary Security settings.");
        }

        const data = await res.json();
        
        // Find the specific image that matches the URL slug
        const found = data.resources.find((r: any) => r.public_id === slug);
        
        if (found) {
          setImg(found);
        } else {
          setError("Image not found in your Cloudinary library.");
        }
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImage();
  }, [slug]);

  // --- LOADING STATE ---
  if (loading) return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#64748b' }}>Loading Image Details...</div>
    </div>
  );

  // --- ERROR STATE ---
  if (error) return (
    <div style={{ padding: '100px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <div style={{ color: '#ef4444', fontWeight: 'bold', marginBottom: '20px' }}>❌ Error: {error}</div>
      <Link href="/" style={{ color: '#2563eb', textDecoration: 'underline' }}>Back to Homepage</Link>
    </div>
  );

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Breadcrumbs */}
      <div style={{ marginBottom: '30px', fontSize: '14px' }}>
        <Link href="/" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: 'bold' }}>HOME</Link>
        <span style={{ color: '#94a3b8', margin: '0 10px' }}>/</span>
        <span style={{ color: '#64748b', textTransform: 'uppercase' }}>{img.public_id}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }} className="detail-grid">
        <style>{`
          @media (min-width: 1024px) {
            .detail-grid { grid-template-columns: 2fr 1fr !important; }
          }
        `}</style>

        {/* LEFT COLUMN: IMAGE */}
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
            <h3 style={{ fontSize: '12px', fontWeight: 900, marginBottom: '10px' }}>ⓘ LICENSE</h3>
            <p style={{ fontSize: '12px', color: '#64748b', lineHeight: '1.5' }}>Free for personal and commercial use with attribution to PNGWORLD.</p>
          </div>

          <div style={{ height: '300px', backgroundColor: '#f1f5f9', border: '2px dashed #e2e8f0', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '12px', fontWeight: 'bold' }}>
            ADVERTISEMENT
          </div>
        </div>
      </div>
    </div>
  );
}