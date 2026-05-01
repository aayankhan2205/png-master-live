"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const url = `https://res.cloudinary.com/dic1ahqrn/image/list/png.json`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setAllImages(data.resources || []);
        setFilteredImages(data.resources || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchImages();
  }, []);

  const handleSearch = () => {
    setActiveQuery(searchInput);
    setFilteredImages(allImages.filter(img => img.public_id.toLowerCase().includes(searchInput.toLowerCase())));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') handleSearch(); };
  const resetPage = () => { setActiveQuery(""); setSearchInput(""); setFilteredImages(allImages); };

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* --- NAVIGATION --- */
        .nav-standard { width: 100%; padding: 15px 5%; display: flex; justify-content: space-between; align-items: center; background: #fff; border-bottom: 1px solid #f1f5f9; }
        .logo { font-size: 20px; font-weight: 900; color: #3b82f6; text-decoration: none; cursor: pointer; letter-spacing: -1px; }
        .nav-links { display: flex; gap: 15px; align-items: center; }
        .btn-resize { background: #0f172a; color: #fff; padding: 8px 15px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 11px; }

        /* --- HERO --- */
        .hero-box { background: #f8fafc; padding: 60px 20px; text-align: center; border-bottom: 1px solid #f1f5f9; }
        .hero-title { font-size: 32px; font-weight: 950; margin-bottom: 15px; color: #0f172a; letter-spacing: -1.5px; }
        
        .search-bar-wrap { width: 100%; max-width: 550px; position: relative; margin: 0 auto; }
        .search-input-blue { width: 100%; padding: 14px 20px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; font-size: 14px; box-shadow: 0 10px 20px rgba(0,0,0,0.03); }
        .search-icon-blue { position: absolute; right: 8px; top: 50%; transform: translateY(-50%); background: #3b82f6; color: #fff; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; }

        /* --- GRID --- */
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 20px 15px; max-width: 1200px; margin: 0 auto; }
        .card { border: 1px solid #f1f5f9; border-radius: 15px; overflow: hidden; text-decoration: none; color: inherit; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.3s; background: #fff; }
        .checkerboard { height: 160px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 10px 10px; }
        
        /* --- CARD FOOTER FIX --- */
        .card-info { padding: 12px; border-top: 1px solid #f1f5f9; }
        .card-title { font-size: 12px; font-weight: 800; color: #334155; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; }
        .footer-tag { font-size: 8px; font-weight: 800; color: #94a3b8; }
        .footer-link { font-size: 9px; font-weight: 900; color: #3b82f6; }

        /* --- DESKTOP ADJUSTMENTS (Screens bigger than 768px) --- */
        @media (min-width: 768px) {
          .nav-standard { padding: 20px 8%; }
          .logo { font-size: 26px; }
          .btn-resize { font-size: 13px; padding: 10px 25px; }
          .nav-links { gap: 30px; }
          .hero-box { padding: 100px 20px; }
          .hero-title { font-size: 56px; }
          .grid { grid-template-columns: repeat(3, 1fr); gap: 25px; padding: 40px; }
          .checkerboard { height: 250px; }
          .card-title { font-size: 14px; }
          .footer-tag { font-size: 10px; }
          .footer-link { font-size: 11px; }
        }
      `}</style>

      {/* --- HEADER --- */}
      {!activeQuery ? (
        <>
          <nav className="nav-standard">
            <div className="logo" onClick={resetPage}>PNG<span style={{color: '#1e3a8a'}}>WORLD</span></div>
            <div className="nav-links">
              <Link href="/" style={{ textDecoration: 'none', color: '#1e3a8a', fontWeight: 'bold', fontSize: '13px' }}>HOME</Link>
              <Link href="/resize" className="btn-resize">RESIZE TOOL</Link>
            </div>
          </nav>
          <div className="hero-box">
            <h1 className="hero-title">PNG WORLD</h1>
            <div className="search-bar-wrap">
              <input className="search-input-blue" placeholder="Search images..." value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown} />
              <button className="search-icon-blue" onClick={handleSearch}>🔍</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="nav-standard" style={{ borderBottom: '2px solid #3b82f6' }}>
            <div className="logo" style={{fontSize: '18px'}} onClick={resetPage}>PNG WORLD</div>
            <div className="search-bar-wrap" style={{ margin: '0 10px' }}>
              <input className="search-input-blue" style={{ padding: '10px 15px' }} placeholder="Search png" value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown} />
            </div>
            <Link href="/resize" className="btn-resize" style={{ padding: '8px 12px', fontSize: '10px' }}>RESIZE</Link>
          </div>
          <div style={{ background: '#3b82f6', color: '#fff', padding: '6px', textAlign: 'center', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
            Results for "{activeQuery}"
          </div>
        </>
      )}

      {/* --- GRID --- */}
      <div className="grid">
        {filteredImages.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} target="_blank" className="card">
            <div className="checkerboard">
              <img 
                src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_500,f_auto/${img.public_id}.png`} 
                alt="png" 
                style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} 
              />
            </div>
            <div className="card-info">
                <div className="card-title">{img.public_id.split('/').pop()}</div>
                <div className="card-footer">
                    <span className="footer-tag">8K ULTRA HD</span>
                    <span className="footer-link">GET PNG →</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}