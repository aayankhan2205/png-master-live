"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState(""); 
  const [loading, setLoading] = useState(true);

  // 1. Fetch data from Cloudinary
  useEffect(() => {
    async function fetchImages() {
      const cloudName = "dic1ahqrn"; 
      const url = `https://res.cloudinary.com/${cloudName}/image/list/png.json`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setAllImages(data.resources || []);
        setFilteredImages(data.resources || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchImages();
  }, []);

  // 2. Search logic
  const handleSearch = () => {
    setActiveQuery(searchInput);
    const results = allImages.filter((img) => 
      img.public_id.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredImages(results);
  };

  const handleKeyDown = (e: any) => { if (e.key === 'Enter') handleSearch(); };
  const resetPage = () => { setActiveQuery(""); setSearchInput(""); setFilteredImages(allImages); };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* --- NAVIGATION BAR --- */
        .main-nav { width: 100%; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; position: absolute; top: 0; left: 0; z-index: 150; }
        .logo { font-size: 24px; font-weight: 950; color: #1e3a8a; text-decoration: none; letter-spacing: -1.5px; cursor: pointer; }
        .nav-btn { background: #0f172a; color: white; padding: 10px 20px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 13px; transition: 0.3s; }
        .nav-btn:hover { background: #000; transform: scale(1.05); }

        /* --- LAYOUT 1: BIG HERO (HOME) --- */
        .hero { position: relative; background: #eef2ff url('/bg-hero.jpg') no-repeat center center / cover; width: 100%; height: 450px; border-bottom: 1px solid #e2e8f0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .hero-title { font-size: 48px; font-weight: 900; color: #0f172a; letter-spacing: -2px; text-transform: uppercase; margin-bottom: 10px; text-shadow: 0 2px 10px #fff; }
        
        /* --- LAYOUT 2: SEARCH HEADER (RESULT MODE) --- */
        .search-header { padding: 15px 5%; border-bottom: 2px solid #2563eb; display: flex; align-items: center; justify-content: space-between; gap: 20px; background: #fff; position: relative; }
        .search-header-logo { font-size: 24px; font-weight: 900; color: #2563eb; text-decoration: none; cursor: pointer; white-space: nowrap; }
        .search-header-input-container { flex: 1; max-width: 700px; position: relative; display: flex; align-items: center; }
        .search-header-input { width: 100%; padding: 12px 25px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; font-size: 14px; }
        .search-header-btn { position: absolute; right: 8px; background: #2563eb; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; }

        /* Search Components */
        .search-container { position: relative; width: 100%; max-width: 600px; display: flex; align-items: center; }
        .search-box { width: 100%; padding: 18px 60px 18px 30px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; font-size: 16px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); color: #000; background: #fff; }
        .search-btn-hero { position: absolute; right: 10px; background: #2563eb; color: white; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; font-size: 18px; }
        
        .grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, 1fr); } }
        
        .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .checkerboard { height: 250px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 20px; }
        .card-info { padding: 15px 20px; border-top: 1px solid #f1f5f9; }
        .card-title { font-size: 14px; font-weight: 700; color: #334155; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-footer { display: flex; justify-content: space-between; font-size: 10px; font-weight: 900; color: #94a3b8; }
        
        .result-bar { background: #2563eb; color: white; padding: 8px; text-align: center; font-size: 12px; font-weight: bold; }
      `}</style>

      {/* --- CONDITIONAL HEADER --- */}
      {!activeQuery ? (
        /* MODE A: HOME PAGE LAYOUT WITH LOGO AND BUTTON */
        <div className="hero">
          <nav className="main-nav">
             <div className="logo" onClick={resetPage}>PNG<span style={{color: '#3b82f6'}}>WORLD</span></div>
             <Link href="/resize" className="nav-btn">RESIZE TOOL</Link>
          </nav>

          <h1 className="hero-title">PNG WORLD</h1>
          <div className="search-container">
            <input 
              className="search-box" 
              placeholder="Search thousands of PNGs..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn-hero" onClick={handleSearch}>🔍</button>
          </div>
        </div>
      ) : (
        /* MODE B: SEARCH MODE LAYOUT */
        <>
          <div className="search-header">
            <div className="search-header-logo" onClick={resetPage}>PNG WORLD</div>
            
            <div className="search-header-input-container">
                <input 
                className="search-header-input" 
                placeholder="Search png" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleKeyDown}
                />
                <button className="search-header-btn" onClick={handleSearch}>🔍</button>
            </div>

            <Link href="/resize" className="nav-btn">RESIZE TOOL</Link>
          </div>
          <div className="result-bar">
            {activeQuery} png images
          </div>
        </>
      )}

      {/* --- GRID --- */}
      <div className="grid-layout">
        {filteredImages.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
            <div className="checkerboard">
              <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_500,f_auto/${img.public_id}.png`} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
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
    </div>
  );
}