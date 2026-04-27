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
        .nav-standard { width: 100%; padding: 20px 5%; display: flex; justify-content: space-between; align-items: center; background: #fff; border-bottom: 1px solid #f1f5f9; }
        .search-mode-header { padding: 15px 5%; border-bottom: 2px solid #3b82f6; display: flex; align-items: center; justify-content: space-between; background: #fff; gap: 20px; }
        .logo { font-size: 24px; font-weight: 900; color: #3b82f6; text-decoration: none; cursor: pointer; }
        .btn-resize { background: #0f172a; color: #fff; padding: 10px 25px; border-radius: 50px; font-weight: bold; text-decoration: none; font-size: 13px; }
        .search-bar-wrap { flex: 1; max-width: 600px; position: relative; }
        .search-input-blue { width: 100%; padding: 12px 25px; border-radius: 100px; border: 1px solid #cbd5e1; outline: none; }
        .search-icon-blue { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: #3b82f6; color: #fff; border: none; width: 35px; height: 35px; border-radius: 50%; cursor: pointer; }
        .hero-box { background: #f8fafc; padding: 80px 20px; text-align: center; }
        .hero-title { font-size: 42px; font-weight: 900; margin-bottom: 20px; color: #0f172a; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 5%; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }
        .card { border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; box-shadow: 0 4px 15px rgba(0,0,0,0.05); transition: 0.3s; }
        .card:hover { transform: translateY(-5px); }
        .checkerboard { height: 220px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; }
        .result-info-bar { background: #3b82f6; color: #fff; padding: 8px; text-align: center; font-size: 11px; font-weight: bold; text-transform: uppercase; }
      `}</style>

      {/* --- HEADER LOGIC --- */}
      {!activeQuery ? (
        <>
          <nav className="nav-standard">
            <div className="logo" onClick={resetPage}>PNG<span style={{color: '#1e3a8a'}}>WORLD</span></div>
            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
              <Link href="/" style={{ textDecoration: 'none', color: '#1e3a8a', fontWeight: 'bold', fontSize: '13px' }}>HOME</Link>
              <Link href="/resize" className="btn-resize">RESIZE TOOL</Link>
            </div>
          </nav>
          <div className="hero-box">
            <h1 className="hero-title">PNG WORLD</h1>
            <div className="search-bar-wrap" style={{ margin: '0 auto' }}>
              <input className="search-input-blue" placeholder="Search thousands of PNGs..." value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown} />
              <button className="search-icon-blue" onClick={handleSearch}>🔍</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="search-mode-header">
            <div className="logo" style={{fontSize: '20px'}} onClick={resetPage}>PNG WORLD</div>
            <div className="search-bar-wrap">
              <input className="search-input-blue" placeholder="Search png" value={searchInput} onChange={e => setSearchInput(e.target.value)} onKeyDown={handleKeyDown} />
              <button className="search-icon-blue" onClick={handleSearch}>🔍</button>
            </div>
            <Link href="/resize" className="btn-resize" style={{fontSize: '11px', padding: '8px 15px'}}>RESIZE TOOL</Link>
          </div>
          <div className="result-info-bar">Showing results for "{activeQuery}"</div>
        </>
      )}

      {/* --- THE GRID --- */}
      <div className="grid">
        {loading ? (
            <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '50px'}}>Loading...</div>
        ) : filteredImages.map((img) => (
          /* 👇 ADDED target="_blank" TO OPEN IN NEW WINDOW 👇 */
          <Link 
            key={img.public_id} 
            href={`/png/${img.public_id}`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="card"
          >
            <div className="checkerboard">
              <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_400,f_auto/${img.public_id}.png`} alt="png" style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '15px', borderTop: '1px solid #eee' }}>
                <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#334155', marginBottom: '5px' }}>{img.public_id.split('/').pop()}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: '800', color: '#94a3b8' }}>
                    <span>8K ULTRA HD</span>
                    <span style={{color: '#3b82f6'}}>GET PNG →</span>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}