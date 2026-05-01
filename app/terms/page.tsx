"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [images, setImages] = useState<any[]>([]);
  const [searchInput, setSearchInput] = useState("");
  const [activeQuery, setActiveQuery] = useState(""); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchImages() {
      const url = `https://res.cloudinary.com/dic1ahqrn/image/list/png.json`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setImages(data.resources || []);
      } catch (e) { console.error(e); } finally { setLoading(false); }
    }
    fetchImages();
  }, []);

  const handleSearch = () => setActiveQuery(searchInput);

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .hero-pro {
          position: relative;
          width: 100%;
          height: 450px;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Professional CSS Background - No image needed */
          background: radial-gradient(circle at top left, #e0e7ff, #ffffff),
                      radial-gradient(circle at bottom right, #dbeafe, #ffffff);
          overflow: hidden;
          border-bottom: 1px solid #f1f5f9;
        }
        .floating-obj {
          position: absolute;
          font-size: 80px;
          opacity: 0.2;
          animation: float 6s ease-in-out infinite;
          pointer-events: none;
        }
        .search-box-pro {
          width: 100%;
          max-width: 550px;
          padding: 18px 30px;
          border-radius: 100px;
          border: 1px solid #e2e8f0;
          outline: none;
          font-size: 16px;
          background: white;
          box-shadow: 0 20px 40px -10px rgba(0,0,0,0.1);
          color: #000;
        }
        .grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; padding: 40px 20px; max-width: 1200px; margin: 0 auto; }
        @media (min-width: 768px) { .grid { grid-template-columns: repeat(3, 1fr); } }
        .card { border: 1px solid #eee; border-radius: 20px; overflow: hidden; text-decoration: none; color: inherit; transition: 0.3s; }
        .card:hover { transform: translateY(-5px); }
        .checkerboard { height: 200px; display: flex; align-items: center; justify-content: center; background-image: linear-gradient(45deg, #f8fafc 25%, transparent 25%), linear-gradient(-45deg, #f8fafc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #f8fafc 75%), linear-gradient(-45deg, transparent 75%, #f8fafc 75%); background-size: 15px 15px; }
      `}</style>

      <div className="hero-pro">
        {/* Floating Icons for Pro look */}
        <div className="floating-obj" style={{top:'10%', left:'10%'}}>🍔</div>
        <div className="floating-obj" style={{bottom:'10%', right:'10%', animationDelay:'2s'}}>🎧</div>
        <div className="floating-obj" style={{top:'20%', right:'15%', animationDelay:'4s'}}>✈️</div>

        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: 950, color: '#0f172a', letterSpacing: '-2px', marginBottom: '20px' }}>
            PNG WORLD
          </h1>
          <input 
            className="search-box-pro"
            placeholder="Search thousands of premium PNGs..."
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>

      <div className="grid">
        {images.map((img) => (
          <Link key={img.public_id} href={`/png/${img.public_id}`} className="card">
            <div className="checkerboard">
              <img src={`https://res.cloudinary.com/dic1ahqrn/image/upload/w_400,f_auto/${img.public_id}.png`} style={{ maxHeight: '100%', objectFit: 'contain' }} />
            </div>
            <div style={{ padding: '15px', fontWeight: 'bold' }}>
              {img.public_id.split('/').pop()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}