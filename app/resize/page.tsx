"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function ResizeTool() {
  const [image, setImage] = useState<string | null>(null);
  const [width, setWidth] = useState<string>("");
  const [height, setHeight] = useState<string>("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imgObj = new Image();
        imgObj.onload = () => {
          setImage(event.target?.result as string);
          setWidth(imgObj.width.toString());
          setHeight(imgObj.height.toString());
        };
        imgObj.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadResized = () => {
    if (!image || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const imgObj = new Image();
    
    imgObj.onload = () => {
      const w = parseInt(width);
      const h = parseInt(height);
      
      if (ctx && w > 0 && h > 0) {
        canvas.width = w;
        canvas.height = h;
        ctx.clearRect(0, 0, w, h);
        ctx.drawImage(imgObj, 0, 0, w, h);
        
        const link = document.createElement("a");
        link.download = "resized-pngworlds.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      }
    };
    imgObj.src = image;
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 900, color: '#0f172a', marginBottom: '10px' }}>Free Image Resizer</h1>
        <p style={{ color: '#64748b' }}>Upload any image and set custom dimensions.</p>
      </div>

      <div style={{ background: '#fff', border: '2px dashed #e2e8f0', borderRadius: '24px', padding: '40px', textAlign: 'center', marginBottom: '30px' }}>
        {!image ? (
          <div>
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              style={{ display: 'none' }} 
              id="fileInput" 
            />
            <label htmlFor="fileInput" style={{ cursor: 'pointer', backgroundColor: '#2563eb', color: '#fff', padding: '15px 30px', borderRadius: '12px', fontWeight: 'bold', display: 'inline-block' }}>
              Select Image From Device
            </label>
          </div>
        ) : (
          <div>
            <img src={image} alt="Preview" style={{ maxHeight: '300px', maxWidth: '100%', borderRadius: '12px', marginBottom: '20px' }} />
            <button onClick={() => setImage(null)} style={{ display: 'block', margin: '0 auto', background: 'none', border: 'none', color: '#ef4444', fontWeight: 'bold', cursor: 'pointer' }}>Remove Image</button>
          </div>
        )}
      </div>

      {image && (
        <div style={{ background: '#f8fafc', padding: '30px', borderRadius: '24px', border: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 900, color: '#475569', display: 'block', marginBottom: '8px' }}>WIDTH (PX)</label>
              <input 
                type="number" 
                value={width} 
                onChange={(e) => setWidth(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }} 
              />
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: '11px', fontWeight: 900, color: '#475569', display: 'block', marginBottom: '8px' }}>HEIGHT (PX)</label>
              <input 
                type="number" 
                value={height} 
                onChange={(e) => setHeight(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #cbd5e1', outline: 'none' }} 
              />
            </div>
          </div>
          
          <button 
            onClick={downloadResized}
            style={{ width: '100%', backgroundColor: '#0f172a', color: '#fff', padding: '18px', borderRadius: '12px', fontWeight: 900, fontSize: '16px', border: 'none', cursor: 'pointer' }}
          >
            DOWNLOAD RESIZED PNG
          </button>
        </div>
      )}

      {/* This draws the image hiddenly in the background */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
}