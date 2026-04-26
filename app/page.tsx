"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    async function fetchImages() {
      const cloudName = "dic1ahqrn"; 
      // Cloudinary searches by 'tags'. Default is 'png'.
      const tag = activeQuery || "png";
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setImages(data.resources || []);
      } catch (e) {
        console.error("Cloudinary fetch error:", e);
      }
    }
    fetchImages();
  }, [activeQuery]);

  const handleSearch = () => {
    setActiveQuery(searchInput);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchInput("");
    setActiveQuery("");
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif', color: '#0f172a' }}>
      
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* --- THE GRID LOCK: Forces boxes to be 100% identical --- */
        .grid-layout { 
          display: grid; 
          grid-template-columns: repeat(2, minmax(0, 1fr)); 
          gap: 15px; 
          padding: 20px; 
          max-width: 1200px; 
          margin: 0 auto; 
        }

        .card {
          background: #fff; border-radius: 12px; border: 1px solid #e2e8f0;
          box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); display: flex;
          flex-direction: column; width: 100%; overflow: hidden; transition: transform 0.2s;
          text-decoration: none; color: inherit;
        }
        .card:hover { transform: translateY(-3px); }

        .card-image-box { 
          width: 100%; height: 180px; display: flex; align-items: center; justify-content: center;
          background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%), linear-gradient(-45deg, #f0f0f0 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f0f0f0 75%), linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 15px 15px; background-color: #f8fafc; padding: 15px;
        }
        
        .card-text-box { padding: 12px; width: 100%; display: flex; flex-direction: column; }
        
        .card-title {
          margin: 0 0 8px 0; font-size: 14px; font-weight: 700; color: #0f172a; 
          text-transform: capitalize; white-space: nowrap; overflow: hidden; 
          text-overflow: ellipsis; display: block; width: 100%;
        }

        .card-footer {
          display: flex; justify-content: space-between; align-items: center;
          border-top: 1px solid #f1f5f9; padding-top: 8px; width: 100%;
        }

        /* --- DESKTOP & IPAD (STRICT 3 COLUMNS) --- */
        @media (min-width: 768px) {
          .grid-layout { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; padding: 40px; }
          .card-image-box { height: 260px; }
        }

        /* SLIM BLUE HEADER (Search Results Mode) */
        .blue-header { background-color: #1a73e8; padding: 20px 5%; width: 100%; border-bottom: 1px solid #1557a0; display: flex; flex-direction: column; gap: 15px; align-items: center; justify-content: center;}
        .blue-logo { font-weight: 950; font-size: 22px; color: #fff; cursor: pointer; text-decoration: none;}
        .blue-search-box { width: 100%; max-width: 500px; padding: 12px 20px; font-size: 14px; border-radius: 100px; border: none; outline: none; background-color: #ffffff; color: #0f172a; }
        .blue-text { text-align: center; color: #fff; font-size: 14px; font-weight: 600; opacity: 0.9; }

        @media (min-width: 768px) {
          .blue-header { flex-direction: row; justify-content: space-between; }
          .blue-search-box { max-width: 600px; }
        }
      `}</style>

      {/* --- SLIM BLUE HEADER --- */}
      <div className="blue-header">
        <div className="blue-logo" onClick={clearSearch}>PNGSTOCK</div>
        
        <input 
          type="text" 
          placeholder="Search images (e.g., Tank)..." 
          className="blue-search-box" 
          value={searchInput} 
          onChange={(e) => setSearchInput(e.target.value)} 
          onKeyDown={handleKeyDown} 
        />

        <Link href="/resize" style={{ backgroundColor: '#fdf2f8', color: '#db2777', padding: '10px 20px', borderRadius: '100px', fontWeight: 900, textDecoration: 'none', fontSize: '12px' }}>
          Resize Image
        </Link>
      </div>

      <div className="blue-text" style={{ padding: '10px 0', backgroundColor: '#1557a0', textAlign: 'center', color: '#fff', fontSize: '13px' }}>
        {activeQuery ? `Showing results for "${activeQuery}"` : "Showing all transparent PNGs"}
      </div>

      {/* --- STRICT UNIFORM GRID --- */}
      <div className="grid-layout">
        {images.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
            
            <div className="card-image-box">
              {/* Cloudinary URL auto-sizes the image for the grid */}
              <img 
                src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_400,f_auto/${img.public_id}.png`} 
                alt={img.public_id} 
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
              />
            </div>
            
            <div className="card-text-box">
              <h3 className="card-title">{img.public_id.split('/').pop()}</h3>
              
              <div className="card-footer">
                 <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 800 }}>8k ULTRA HD</span>
                 <span style={{ fontSize: '10px', color: '#3b82f6', fontWeight: 900 }}>GET PNG →</span>
              </div>
            </div>

          </Link>
        ))}
      </div>
    </div>
  );
}