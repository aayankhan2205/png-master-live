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

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        /* --- DYNAMIC ANIMATED BACKGROUND --- */
        @keyframes meshGradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        .hero-dynamic {
          position: relative;
          width: 100%;
          height: 500px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          /* Animated Professional Mesh Gradient */
          background: linear-gradient(-45deg, #eef2ff, #e0e7ff, #f8fafc, #dbeafe);
          background-size: 400% 400%;
          animation: meshGradient 15s ease infinite;
          border-bottom: 1px solid #e2e8f0;
        }

        /* --- FLOATING DECORATIONS --- */
        .floating-icon {
          position: absolute;
          z-index: 1;
          opacity: 0.6;
          animation: float 6s ease-in-out infinite;
          font-size: 80px;
          filter: blur(1px);
          pointer-events: none;
        }

        /* --- NAVIGATION --- */
        .nav-standard { width: 100%; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; position: absolute; top: 0; left: 0; z-index: 100; }
        .logo { font-size: 26px; font-weight: 950; color: #1e3a8a; text-decoration: none; letter-spacing: -1.5px; }
        .btn-resize { background: #0f172a; color: #fff; padding: 12px 25px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 13px; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }

        /* --- SEARCH BOX --- */
        .hero-content { position: relative; z-index: 10; text-align: center; width: 90%; max-width: 700px; }
        .hero-title { font-size: 56px; font-weight: 900; color: #0f172a; letter-spacing: -3px; margin-bottom: 20px; }
        .search-bar-wrap { position: relative; width: 100%; }
        .search-input { 
          width: 100%; padding: 20px 30px; border-radius: 100px; border: 1px solid rgba(255,255,255,0.5); 
          outline: none; font-size: 16px; background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          box-shadow: 0 20px 50px rgba(0,0,0,0.1);
          transition: 0.3s;
        }
        .search-input:focus { background: #fff; border-color: #3b82f6; }
        .search-icon-btn { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #3b82f6; color: #fff; border: none; width: 45px; height: 45px; border-radius: 50%; cursor: pointer; }

        /* --- GRID --- */
        .grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, 1fr); gap: 30px; padding: 50px; } }
        
        .card { border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.3s; background: #fff; }
        .card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(0,0,0,0.1); }
        .checkerboard { height: 250px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; }

        /* MOBILE FIXES */
        @media (max-width: 600px) {
          .hero-title { font-size: 32px; letter-spacing: -1px; }
          .hero-dynamic { height: 400px; }
          .floating-icon { font-size: 40px; }
        }
      `}</style>

      {/* --- HEADER --- */}
      {!activeQuery ? (
        <div className="hero-dynamic">
          {/* Navigation */}
          <nav className="nav-standard">
            <div className="logo">PNG<span style={{color: '#3b82f6'}}>WORLD</span></div>
            <div style={{ display: 'flex', gap: '20px' }}>
                <Link href="/" style={{textDecoration:'none', color:'#1e3a8a', fontWeight:'bold', fontSize:'13px', marginTop:'10px'}}>HOME</Link>
                <Link href="/resize" className="btn-resize">RESIZE TOOL</Link>
            </div>
          </nav>

          {/* Floating Assets for Professionalism */}
          <div className="floating-icon" style={{ top: '15%', left: '10%', animationDelay: '0s' }}>🖼️</div>
          <div className="floating-icon" style={{ bottom: '15%', right: '10%', animationDelay: '2s' }}>📷</div>
          <div className="floating-icon" style={{ top: '20%', right: '15%', animationDelay: '4s' }}>✨</div>

          <div className="hero-content">
            <h1 className="hero-title">PNG WORLD</h1>
            <div className="search-bar-wrap">
              <input 
                className="search-input" 
                placeholder="Search thousands of transparent PNGs..." 
                value={searchInput} 
                onChange={e => setSearchInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSearch()} 
              />
              <button className="search-icon-btn" onClick={handleSearch}>🔍</button>
            </div>
          </div>
        </div>
      ) : (
        /* --- SEARCH RESULT MODE (White Header) --- */
        <div style={{ borderBottom: '2px solid #3b82f6', padding: '15px 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
          <div className="logo" style={{fontSize: '20px'}} onClick={() => {setActiveQuery(""); setSearchInput("");}}>PNG WORLD</div>
          <div className="search-bar-wrap" style={{flex: 1, maxWidth: '600px'}}>
            <input 
              className="search-input" 
              style={{padding: '12px 20px', boxShadow: 'none', border: '1px solid #ddd'}} 
              placeholder="Search png" 
              value={searchInput} 
              onChange={e => setSearchInput(e.target.value)} 
              onKeyDown={e => e.key === 'Enter' && handleSearch()} 
            />
          </div>
          <Link href="/resize" className="btn-resize" style={{fontSize: '11px', padding: '8px 15px'}}>RESIZE TOOL</Link>
        </div>
      )}

      {/* --- GRID --- */}
      <div className="grid-layout">
        {filteredImages.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} target="_blank" className="card">
            <div className="checkerboard">
              <img 
                src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_500,f_auto/${img.public_id}.png`} 
                alt="png" 
                style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} 
              />
            </div>
            <div style={{ padding: '20px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155' }}>{img.public_id.split('/').pop()}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>
                    <span>8K ULTRA HD</span>
                    <span style={{color: '#3b82f6'}}>DOWNLOAD →</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}