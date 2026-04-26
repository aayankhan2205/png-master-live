"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState("");

  useEffect(() => {
    async function fetchImages() {
      // Use your real Cloudinary name here
      const cloudName = "dic1ahqrn"; 
      const tag = activeQuery || "png";
      const url = `https://res.cloudinary.com/${cloudName}/image/list/${tag}.json`;
      
      try {
        const res = await fetch(url);
        const data = await res.json();
        setImages(data.resources || []);
      } catch (e) {
        console.error("Cloudinary fetch error:", e);
      }
    }
    fetchImages();
  }, [activeQuery]);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      <style>{`
        .hero { background: #e8f0fe; padding: 60px 20px; text-align: center; }
        .search-box { width: 100%; max-width: 500px; padding: 15px 25px; border-radius: 50px; border: 1px solid #ddd; outline: none; }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; padding: 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); gap: 30px; } }
        .card { border: 1px solid #eee; border-radius: 15px; overflow: hidden; transition: 0.3s; text-decoration: none; color: inherit; }
        .card:hover { transform: translateY(-5px); box-shadow: 0 10px 20px rgba(0,0,0,0.05); }
        .checkerboard { height: 200px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; background-color: #fff; padding: 10px; }
      `}</style>

      <div className="hero">
        <h1 style={{ fontWeight: 900, fontSize: '32px', marginBottom: '20px' }}>PNGWORLDS</h1>
        <input 
          className="search-box"
          placeholder="Search transparent PNGs..."
          value={searchInput}
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
            <div style={{ padding: '15px', fontWeight: 'bold', fontSize: '14px', borderTop: '1px solid #eee' }}>
              {img.public_id.split('/').pop()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}