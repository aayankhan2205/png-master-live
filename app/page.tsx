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

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        .hero { position: relative; background: #e8f0fe url('/bg-hero.jpg') no-repeat 25% 15% / cover; width: 100%; height: 450px; overflow: hidden; border-bottom: 1px solid #f1f5f9; display: flex; flex-direction: column; align-items: center; }
        .hero-content { position: absolute; top: 120px; width: 100%; text-align: center; padding: 0 20px; }
        .hero-title { font-size: 28px; font-weight: 950; color: #0f172a; text-shadow: 0 2px 10px #fff; }
        .search-box { width: 90%; max-width: 500px; padding: 15px 25px; border-radius: 100px; border: 1px solid #e2e8f0; outline: none; margin-top: 20px; box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1); }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); gap: 30px; } .hero-title { font-size: 50px; } }
        .card { border: 1px solid #eee; border-radius: 15px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .checkerboard { height: 200px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 10px; }
      `}</style>

      <div className="hero">
        <div className="hero-content">
          <h1 className="hero-title">PNG WORLDS</h1>
          <input 
            className="search-box" 
            placeholder="Search images (e.g. Tank)..." 
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && setActiveQuery(searchInput)}
          />
        </div>
      </div>

      <div className="grid">
        {images.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
            <div className="checkerboard">
              <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_400,f_auto/${img.public_id}.png`} style={{ maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '15px', fontWeight: 'bold', fontSize: '14px', borderTop: '1px solid #eee' }}>
              {img.public_id.split('/').pop()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}