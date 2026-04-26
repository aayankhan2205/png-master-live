"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    async function fetchImages() {
      const cloudName = "dic1ahqrn"; // <--- DOUBLE CHECK THIS NAME
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
        .hero { position: relative; background: #e8f0fe; width: 100%; padding: 80px 20px; text-align: center; border-bottom: 1px solid #f1f5f9; }
        .hero-title { font-size: 40px; font-weight: 950; color: #0f172a; margin-bottom: 10px; }
        .search-box { width: 90%; max-width: 500px; padding: 15px 25px; border-radius: 100px; border: 1px solid #e2e8f0; outline: none; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); gap: 30px; } }
        .card { border: 1px solid #eee; border-radius: 15px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); }
        .checkerboard { height: 200px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 10px; }
      `}</style>

      <div className="hero">
        <h1 className="hero-title">PNG WORLDS</h1>
        <input 
          className="search-box" 
          placeholder="Search images..." 
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && setActiveQuery(searchInput)}
        />
      </div>

      <div className="grid">
        {images.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
            <div className="checkerboard">
              <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_400,f_auto/${img.public_id}.png`} style={{ maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '15px', fontWeight: 'bold' }}>{img.public_id}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}