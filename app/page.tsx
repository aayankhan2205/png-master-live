"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [allImages, setAllImages] = useState<any[]>([]); // Store everything
  const [filteredImages, setFilteredImages] = useState<any[]>([]); // Store search results
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);

  // 1. Fetch all images tagged 'png' once when the page loads
  useEffect(() => {
    async function fetchImages() {
      const cloudName = "dic1ahqrn"; 
      const url = `https://res.cloudinary.com/${cloudName}/image/list/png.json`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setAllImages(data.resources || []);
        setFilteredImages(data.resources || []); // Show all images by default
      } catch (e) {
        console.error("Cloudinary fetch error:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  // 2. MAGIC SEARCH: Filters the list as you type or click search
  const handleSearch = () => {
    const results = allImages.filter((img) => 
      img.public_id.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredImages(results);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .hero { position: relative; background: #eef2ff url('/bg-hero.jpg') no-repeat center center / cover; width: 100%; padding: 100px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; }
        .hero-title { font-size: 48px; font-weight: 900; color: #0f172a; letter-spacing: -2px; text-transform: uppercase; }
        
        /* THE SEARCH BOX AREA */
        .search-container { margin-top: 30px; position: relative; max-width: 600px; margin-left: auto; margin-right: auto; display: flex; align-items: center; }
        .search-box { width: 100%; padding: 18px 60px 18px 30px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; font-size: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); color: #000; background: #fff; transition: 0.3s; }
        .search-box:focus { border-color: #2563eb; box-shadow: 0 10px 25px rgba(37,99,235,0.1); }
        .search-btn { position: absolute; right: 10px; background: #2563eb; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 18px; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        .search-btn:hover { background: #1d4ed8; transform: scale(1.05); }

        /* GRID STYLES */
        .grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, 1fr); } }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; transition: all 0.3s ease; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .checkerboard { height: 250px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 20px; }
        .card-info { padding: 15px 20px; border-top: 1px solid #f1f5f9; }
        .card-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-footer { display: flex; justify-content: space-between; font-size: 10px; font-weight: 900; color: #94a3b8; }
      `}</style>

      <div className="hero">
        <h1 className="hero-title">PNG WORLD</h1>
        <div className="search-container">
          <input 
            className="search-box" 
            placeholder="Search thousands of PNGs..." 
            value={searchInput}
            onChange={(e) => {
                setSearchInput(e.target.value);
                // Optional: Instant search as you type
                const results = allImages.filter((img) => 
                    img.public_id.toLowerCase().includes(e.target.value.toLowerCase())
                );
                setFilteredImages(results);
            }}
            onKeyDown={handleKeyDown}
          />
          <button className="search-btn" onClick={handleSearch}>🔍</button>
        </div>
      </div>

      {loading ? (
        <div style={{textAlign:'center', padding:'100px', fontWeight:'bold', color:'#64748b'}}>Loading Library...</div>
      ) : (
        <div className="grid-layout">
          {filteredImages.map((img) => (
            <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
              <div className="checkerboard">
                <img 
                  src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_500,f_auto/${img.public_id}.png`} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                />
              </div>
              <div className="card-info">
                <div className="card-title">{img.public_id.split('/').pop()}</div>
                <div className="card-footer">
                  <span>8K ULTRA HD</span>
                  <span style={{ color: '#2563eb' }}>GET PNG →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {!loading && filteredImages.length === 0 && (
        <div style={{ textAlign: 'center', padding: '100px', color: '#94a3b8' }}>
          No images found for "{searchInput}"
        </div>
      )}
    </div>
  );
}