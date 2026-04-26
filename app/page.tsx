"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    async function fetchImages() {
      const cloudName = "dic1ahqrn"; 
      const tag = activeQuery || "png";
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setImages(data.resources || []);
      } catch (e) { console.error(e); }
    }
    fetchImages();
  }, [activeQuery]);

  const handleSearch = () => setActiveQuery(searchInput);
  const handleKeyDown = (e: any) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* Professional Hero Section */
        .hero { 
          position: relative; 
          background: #eef2ff url('/bg-hero.jpg') no-repeat center center / cover; 
          width: 100%; 
          padding: 100px 20px; 
          text-align: center; 
          border-bottom: 1px solid #e2e8f0; 
        }
        
        .hero-title { 
          font-size: 48px; 
          font-weight: 900; 
          color: #0f172a; 
          letter-spacing: -2px;
          text-transform: uppercase;
        }

        .search-container {
          margin-top: 30px;
          position: relative;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .search-box { 
          width: 100%; 
          padding: 18px 30px; 
          border-radius: 100px; 
          border: 1px solid #cbd5e1; 
          outline: none; 
          font-size: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.1);
          color: #000;
          background: #fff;
        }

        /* The Professional Grid */
        .grid-layout { 
          display: grid; 
          grid-template-columns: repeat(2, 1fr); 
          gap: 20px; 
          padding: 40px 20px; 
          max-width: 1200px; 
          margin: 0 auto; 
        }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, 1fr); } }

        .card { 
          background: #fff;
          border: 1px solid #e2e8f0; 
          border-radius: 20px; 
          overflow: hidden; 
          text-decoration: none; 
          color: inherit; 
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
        }
        .card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }

        .checkerboard { 
          height: 250px; 
          display: flex; 
          align-items: center; 
          justify-content: center; 
          background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); 
          background-size: 15px 15px; 
          background-color: #fff; 
          padding: 20px; 
        }

        .card-info {
          padding: 15px 20px;
          background: #fff;
          border-top: 1px solid #f1f5f9;
        }

        .card-title {
          font-size: 14px;
          font-weight: 700;
          color: #334155;
          margin-bottom: 8px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
      `}</style>

      {/* --- HERO --- */}
      <div className="hero">
        <h1 className="hero-title">PNG WORLDS</h1>
        <div className="search-container">
          <input 
            className="search-box" 
            placeholder="Search thousands of PNGs..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>

      {/* --- GRID --- */}
      <div className="grid-layout">
        {images.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
            <div className="checkerboard">
              <img 
                src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_500,f_auto/${img.public_id}.png`} 
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
              />
            </div>
            <div className="card-info">
              {/* This cleans the name from "udtwws..." to something readable */}
              <div className="card-title">{img.public_id.split('/').pop()}</div>
              <div className="card-footer">
                <span style={{ color: '#94a3b8' }}>8K ULTRA HD</span>
                <span style={{ color: '#2563eb' }}>DOWNLOAD →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {images.length === 0 && (
        <div style={{ textAlign: 'center', padding: '100px', color: '#94a3b8' }}>
          No images found. Make sure to tag your images as "png" in Cloudinary!
        </div>
      )}
    </div>
  );
}