"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [isSearchMode, setIsSearchMode] = useState(false); // New State
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const cloudName = "dic1ahqrn"; 
      const url = `https://res.cloudinary.com/${cloudName}/image/list/png.json`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setAllImages(data.resources || []);
        setFilteredImages(data.resources || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  const handleSearch = () => {
    if (searchInput.trim() === "") {
        setIsSearchMode(false);
        setFilteredImages(allImages);
        return;
    }
    const results = allImages.filter((img) => 
      img.public_id.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredImages(results);
    setIsSearchMode(true); // Switch to Search Mode
  };

  const handleKeyDown = (e: any) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* --- MODE 1: BIG HERO --- */
        .hero-big { background: #eef2ff url('/bg-hero.jpg') no-repeat center center / cover; padding: 100px 20px; text-align: center; border-bottom: 1px solid #e2e8f0; }
        .hero-title-big { font-size: 48px; font-weight: 900; color: #0f172a; margin-bottom: 30px; letter-spacing: -2px; }

        /* --- MODE 2: SLIM HEADER (Your 2nd Screenshot) --- */
        .header-slim { display: flex; align-items: center; justify-content: space-between; padding: 15px 5%; border-bottom: 2px solid #2563eb; position: sticky; top: 0; background: #fff; z-index: 100; }
        .logo-slim { font-size: 24px; font-weight: 900; color: #2563eb; text-decoration: none; letter-spacing: -1px; }
        .search-container-slim { flex: 1; max-width: 600px; margin: 0 40px; position: relative; display: flex; align-items: center; }
        .resize-btn { background: #0f172a; color: white; padding: 10px 20px; border-radius: 100px; text-decoration: none; font-weight: bold; font-size: 13px; }

        /* COMMON SEARCH BOX STYLING */
        .search-box { width: 100%; padding: 14px 60px 14px 25px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; font-size: 15px; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .search-btn { position: absolute; right: 8px; background: #2563eb; color: white; border: none; width: 40px; height: 40px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; }

        .query-label { text-align: center; font-size: 11px; font-weight: bold; color: #000; margin-top: 5px; }

        /* GRID */
        .grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, 1fr); } }
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .checkerboard { height: 250px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 20px; }
      `}</style>

      {/* --- CONDITIONAL HEADER --- */}
      {!isSearchMode ? (
        /* BIG MODE */
        <div className="hero-big">
          <h1 className="hero-title-big">PNG WORLD</h1>
          <div style={{ position: 'relative', maxWidth: '500px', margin: '0 auto' }}>
            <input 
              className="search-box" 
              placeholder="Search thousands of PNGs..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={handleSearch}>🔍</button>
          </div>
        </div>
      ) : (
        /* SLIM MODE (YOUR SECOND SCREENSHOT) */
        <div className="header-slim">
          <Link href="/" className="logo-slim" onClick={() => { setIsSearchMode(false); setSearchInput(""); setFilteredImages(allImages); }}>
            PNG WORLD
          </Link>
          
          <div className="search-container-slim">
             <div style={{width: '100%'}}>
                <input 
                  className="search-box" 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button className="search-btn" onClick={handleSearch}>🔍</button>
                <div className="query-label">{searchInput} png images</div>
             </div>
          </div>

          <Link href="/resize" className="resize-btn">RESIZE TOOL</Link>
        </div>
      )}

      {/* --- GRID --- */}
      {loading ? (
        <div style={{textAlign:'center', padding:'100px', color:'#94a3b8'}}>Loading...</div>
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
              <div style={{ padding: '15px 20px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{fontSize:'14px', fontWeight:'700', color:'#334155', marginBottom:'5px'}}>{img.public_id.split('/').pop()}</div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'10px', fontWeight:'900', color:'#94a3b8'}}>
                  <span>8K ULTRA HD</span>
                  <span style={{color:'#2563eb'}}>GET PNG →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}