"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [allImages, setAllImages] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState(""); 
  const [isSearchMode, setIsSearchMode] = useState(false);
  const [loading, setLoading] = useState(true);

  const cloudName = "dic1ahqrn"; 

  useEffect(() => {
    async function fetchImages() {
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
    setActiveQuery(searchInput);
    setIsSearchMode(true); 
  };

  const handleKeyDown = (e: any) => { if (e.key === 'Enter') handleSearch(); };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        /* --- MODE 1: BIG HERO (HOME) --- */
        .hero-big { 
            position: relative; 
            background: #eef2ff url('/bg-hero.jpg') no-repeat center center / cover; 
            height: 450px; text-align: center; 
            display: flex; flex-direction: column; align-items: center; justify-content: center;
            border-bottom: 1px solid #e2e8f0;
        }
        .hero-title-big { font-size: 52px; font-weight: 900; color: #0f172a; letter-spacing: -3px; margin-bottom: 20px; }

        /* --- MODE 2: SLIM HEADER (SEARCH RESULTS) --- */
        .header-slim { 
            display: flex; align-items: center; justify-content: space-between; 
            padding: 15px 5%; border-bottom: 2px solid #1a73e8; 
            position: sticky; top: 0; background: #fff; z-index: 1000;
        }
        .logo-slim { font-size: 26px; font-weight: 950; color: #1a73e8; text-decoration: none; letter-spacing: -1.5px; }

        /* THE SEARCH BOX (SHARED) */
        .search-container { position: relative; width: 100%; max-width: 600px; }
        .search-box { 
            width: 100%; padding: 14px 60px 14px 25px; border-radius: 100px; 
            border: 1px solid #cbd5e1; outline: none; font-size: 15px; 
            background: #fff; color: #000; box-shadow: 0 4px 15px rgba(0,0,0,0.05);
        }
        .search-btn { 
            position: absolute; right: 8px; top: 50%; transform: translateY(-50%); 
            background: #1a73e8; color: white; border: none; width: 40px; height: 40px; 
            border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; 
        }
        .query-label { font-size: 11px; font-weight: 800; color: #000; margin-top: 5px; text-align: center; }

        .resize-pill { 
            background: #0f172a; color: white; padding: 10px 22px; 
            border-radius: 100px; text-decoration: none; font-weight: 900; font-size: 13px; 
        }

        /* GRID */
        .grid-layout { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 5%; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid-layout { grid-template-columns: repeat(3, 1fr); } }

        .card { background: #fff; border: 1px solid #f1f5f9; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; box-shadow: 0 4px 10px rgba(0,0,0,0.02); }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .checkerboard { height: 250px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 20px; }
      `}</style>

      {/* --- HEADER LOGIC --- */}
      {!isSearchMode ? (
        <div className="hero-big">
          <h1 className="hero-title-big">PNG WORLD</h1>
          <div className="search-container">
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
        <div className="header-slim">
          <Link href="/" className="logo-slim" onClick={() => { setIsSearchMode(false); setSearchInput(""); setFilteredImages(allImages); }}>
            PNG WORLD
          </Link>
          
          <div className="search-container">
            <input 
              className="search-box" 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="search-btn" onClick={handleSearch}>🔍</button>
            <div className="query-label">{activeQuery} png images</div>
          </div>

          <Link href="/resize" className="resize-pill">RESIZE TOOL</Link>
        </div>
      )}

      {/* --- GRID --- */}
      {loading ? (
        <div style={{textAlign:'center', padding:'100px', color:'#94a3b8'}}>Loading Library...</div>
      ) : (
        <div className="grid-layout">
          {filteredImages.map((img) => (
            <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
              <div className="checkerboard">
                <img 
                  src={`https://res.cloudinary.com/${cloudName}/image/upload/w_500,f_auto/${img.public_id}.png`} 
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} 
                />
              </div>
              <div style={{ padding: '15px 20px', borderTop: '1px solid #f1f5f9' }}>
                <div style={{fontSize:'14px', fontWeight:'700', color:'#334155', marginBottom:'5px'}}>{img.public_id.split('/').pop()}</div>
                <div style={{display:'flex', justifyContent:'space-between', fontSize:'10px', fontWeight:'900', color:'#94a3b8'}}>
                  <span>8K ULTRA HD</span>
                  <span style={{color:'#1a73e8'}}>GET PNG →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}