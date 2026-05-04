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
        
        /* --- DYNAMIC MESH GRADIENT HERO --- */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        /* --- FLOATING & TWINKLING ANIMATIONS --- */
        @keyframes float1 { 0%, 100% { transform: translateY(0px) rotate(-10deg); } 50% { transform: translateY(-20px) rotate(-5deg); } }
        @keyframes float2 { 0%, 100% { transform: translateY(0px) rotate(15deg); } 50% { transform: translateY(-15px) rotate(20deg); } }
        @keyframes float3 { 0%, 100% { transform: translateY(0px) rotate(-5deg); } 50% { transform: translateY(-25px) rotate(0deg); } }
        @keyframes float4 { 0%, 100% { transform: translateY(0px) rotate(10deg); } 50% { transform: translateY(-18px) rotate(15deg); } }

        /* --- BLINKING STAR ANIMATIONS --- */
        @keyframes starBlink {
          0%, 100% { opacity: 0.1; transform: scale(0.5); }
          50% { opacity: 0.8; transform: scale(1.2); }
        }
        @keyframes starRise {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-150px); opacity: 0; }
        }

        .hero { 
          position: relative; 
          width: 100%; 
          height: 520px; 
          border-bottom: 1px solid #e2e8f0; 
          display: flex; 
          flex-direction: column; 
          align-items: center; 
          justify-content: center; 
          overflow: hidden;
          background: linear-gradient(-45deg, #eef2ff, #f8fafc, #e0e7ff, #f1f5f9);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .blob-1 { position: absolute; width: 400px; height: 400px; background: #60a5fa; opacity: 0.15; border-radius: 50%; filter: blur(60px); top: -50px; left: -50px; pointer-events: none; }
        .blob-2 { position: absolute; width: 500px; height: 500px; background: #818cf8; opacity: 0.15; border-radius: 50%; filter: blur(60px); bottom: -100px; right: -50px; pointer-events: none; }

         /* REAL BLINKING STARS */
        .real-star {
          position: absolute;
          z-index: 2;
          pointer-events: none;
          /* Adding a stronger golden glow around the stars */
          filter: drop-shadow(0 0 8px rgba(255, 217, 0, 0.91));
        }
        /* Increased font sizes for all stars */
        .s-1 { font-size: 24px; top: 25%; left: 20%; animation: starBlink 4s infinite ease-in-out, starRise 20s infinite linear; }
        .s-2 { font-size: 42px; top: 60%; left: 10%; animation: starBlink 3s infinite ease-in-out 1s, starRise 15s infinite linear; }
        .s-3 { font-size: 20px; top: 15%; right: 25%; animation: starBlink 5s infinite ease-in-out 0.5s, starRise 25s infinite linear; }
        .s-4 { font-size: 28px; top: 70%; right: 15%; animation: starBlink 4.5s infinite ease-in-out 2s, starRise 18s infinite linear; }
        .s-5 { font-size: 38px; top: 35%; right: 8%; animation: starBlink 3.5s infinite ease-in-out 1.5s, starRise 22s infinite linear; }
        .s-6 { font-size: 18px; top: 80%; left: 35%; animation: starBlink 3s infinite ease-in-out 0.2s, starRise 30s infinite linear; }
        .s-7 { font-size: 38px; top: 35%; right: 6%; animation: starBlink 3.5s infinite ease-in-out 1.5s, starRise 22s infinite linear; }
        .s-8 { font-size: 18px; top: 80%; left: 25%; animation: starBlink 3s infinite ease-in-out 0.2s, starRise 30s infinite linear; }


        /* Floating 3D Emojis */
        .floating-icon { position: absolute; z-index: 5; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.15)); pointer-events: none; }
        .em-1 { font-size: 70px; top: 20%; left: 10%; animation: float1 6s ease-in-out infinite; }
        .em-2 { font-size: 80px; top: 15%; right: 15%; animation: float2 7s ease-in-out infinite; animation-delay: 1s; }
        .em-3 { font-size: 90px; bottom: 10%; left: 15%; animation: float3 8s ease-in-out infinite; animation-delay: 0.5s; }
        .em-4 { font-size: 80px; bottom: 15%; right: 10%; animation: float4 6.5s ease-in-out infinite; animation-delay: 1.5s; }

        /* --- NAVIGATION --- */
        .nav-standard { width: 100%; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; position: absolute; top: 0; left: 0; z-index: 150; }
        .logo { font-size: 28px; font-weight: 900; color: #1e3a8a; text-decoration: none; cursor: pointer; letter-spacing: -1.5px; }
        .btn-resize { background: #0f172a; color: #fff; padding: 12px 25px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 13px; transition: 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
        .btn-resize:hover { background: #000; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.15); }

        /* --- CONTENT & SEARCH --- */
        .hero-content { position: relative; z-index: 10; text-align: center; width: 100%; padding: 0 20px; }
        .hero-title { font-size: 64px; font-weight: 950; color: #0f172a; letter-spacing: -4px; margin-bottom: 20px; text-shadow: 0 4px 20px rgba(255,255,255,0.8); }
        
        .search-container { position: relative; width: 100%; max-width: 650px; margin: 0 auto; display: flex; align-items: center; }
        .search-box { 
          width: 100%; padding: 20px 65px 20px 30px; border-radius: 100px; 
          border: 1px solid rgba(255,255,255,0.6); outline: none; font-size: 16px; 
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); color: #000; 
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          transition: all 0.3s;
        }
        .search-box:focus { background: #fff; border-color: #3b82f6; box-shadow: 0 25px 50px -12px rgba(37,99,235,0.25); }
        .search-btn-hero { position: absolute; right: 10px; background: #3b82f6; color: white; border: none; width: 50px; height: 50px; border-radius: 50%; cursor: pointer; font-size: 20px; transition: 0.3s; }
        .search-btn-hero:hover { background: #2563eb; transform: scale(1.05); }

        /* --- SEARCH MODE HEADER (RESULT MODE) --- */
        .search-mode-header { padding: 15px 5%; border-bottom: 2px solid #3b82f6; display: flex; align-items: center; justify-content: space-between; background: #fff; gap: 20px; }
        .search-header-input-container { flex: 1; max-width: 700px; position: relative; display: flex; align-items: center; }
        .search-header-input { width: 100%; padding: 12px 25px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; font-size: 14px; color:#000; background:#fff;}
        .search-header-btn { position: absolute; right: 8px; background: #3b82f6; color: white; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; }
        .result-bar { background: #3b82f6; color: white; padding: 8px; text-align: center; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 1px; }

        /* --- GRID --- */
        .grid-layout { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 15px; padding: 30px 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 25px; padding: 50px; } }
        
        .card { background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; display: flex; flex-direction: column; box-shadow: 0 4px 15px rgba(0,0,0,0.03); }
        .card:hover { transform: translateY(-6px); box-shadow: 0 15px 30px rgba(0,0,0,0.08); border-color: #e2e8f0; }
        .checkerboard { height: 220px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 20px; }
        .card-info { padding: 15px 20px; border-top: 1px solid #f1f5f9; }
        .card-title { font-size: 14px; font-weight: 800; color: #1e293b; margin-bottom: 8px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .card-footer { display: flex; justify-content: space-between; font-size: 10px; font-weight: 900; color: #94a3b8; letter-spacing: 0.5px; }

        /* Mobile Fixes */
        @media (max-width: 600px) {
          .hero-title { font-size: 42px; letter-spacing: -2px; }
          .hero { height: 450px; }
          .logo { font-size: 20px; }
          .nav-standard { padding: 15px; }
        /* ALL 4 EMOJIS VISIBLE AND PERFECTLY PLACED ON MOBILE */
          .em-1 { font-size: 40px; top: 100px; left: 5%; } /* Burger: Top Left */
          .em-2 { display: block; font-size: 40px; top: 110px; right: 5%; } /* Pizza: Top Right */
          .em-3 { font-size: 50px; bottom: 40px; left: 5%; } /* Dog: Bottom Left */
          .em-4 { font-size: 45px; bottom: 60px; right: 5%; } /* Airplane: Bottom Right (moved down) */
        }
      `}</style>

      {/* --- HEADER --- */}
      {!activeQuery ? (
        <div className="hero">
          
          {/* Animated Background Blobs */}
          <div className="blob-1"></div>
          <div className="blob-2"></div>

          {/* REAL BLINKING STARS ✨⭐ */}
          <div className="real-star s-1">✨</div>
          <div className="real-star s-2">⭐</div>
          <div className="real-star s-3">✨</div>
          <div className="real-star s-4">⭐</div>
          <div className="real-star s-5">✨</div>
          <div className="real-star s-6">⭐</div>
          <div className="real-star s-7">✨</div>
          <div className="real-star s-8">⭐</div>

          <div className="floating-icon em-1">🍔</div>
          <div className="floating-icon em-2">🍕</div>
          <div className="floating-icon em-3">🐶</div>
          <div className="floating-icon em-4">✈️</div>

          <nav className="nav-standard">
            <div className="logo" onClick={resetPage}>PNG <span style={{color: '#3b82f6'}}>WORLD</span></div>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                <Link href="/" style={{textDecoration:'none', color:'#1e3a8a', fontWeight:'bold', fontSize:'13px', marginTop:'5px'}}>HOME</Link>
                <Link href="/resize" className="btn-resize">RESIZE TOOL</Link>
            </div>
          </nav>
          
          <div className="hero-content">
            <h1 className="hero-title">PNG WORLD</h1>
            <div className="search-container">
              <input 
                className="search-box" 
                placeholder="Search thousands of transparent PNGs..." 
                value={searchInput} 
                onChange={e => setSearchInput(e.target.value)} 
                onKeyDown={e => e.key === 'Enter' && handleSearch()} 
              />
              <button className="search-btn-hero" onClick={handleSearch}>🔍</button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="search-mode-header">
            <div className="logo" style={{fontSize: '20px'}} onClick={resetPage}>PNG <span style={{color: '#3b82f6'}}>WORLD</span></div>
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
            <Link href="/resize" className="btn-resize" style={{fontSize: '11px', padding: '8px 15px'}}>RESIZE TOOL</Link>
          </div>
          <div className="result-bar">
            Showing results for "{activeQuery}"
          </div>
        </>
      )}

      {/* --- GRID --- */}
      <div className="grid-layout">
        {loading ? (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#64748b', fontWeight: 'bold'}}>Loading Library...</div>
        ) : filteredImages.map((img) => (
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
                <span>8K ULTRA HD</span>
                <span style={{ color: '#3b82f6' }}>GET PNG →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}