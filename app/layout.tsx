import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// --- GOOGLE SEO & ADSENSE OPTIMIZED METADATA ---
export const metadata: Metadata = {
  title: {
    default: "PNGWorlds | Download Free Transparent PNG Images & HD Stock",
    template: "%s | PNGWorlds"
  },
  description: "Download thousands of high-quality, background-removed transparent PNG images for free. No registration required. Perfect for designers and creators.",
  keywords: ["free png", "transparent images", "no background images", "hd png stock", "png search engine"],
  authors: [{ name: "PNGWorlds Team" }],
  creator: "PNGWorlds",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://pngworlds.com",
    siteName: "PNGWorlds",
    title: "PNGWorlds - Best Free Transparent PNG Images",
    description: "High-resolution transparent assets for your next creative project.",
  },
  twitter: {
    card: "summary_large_image",
    title: "PNGWorlds | Free Transparent PNGs",
    description: "The world's best library of background-removed images.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ 
          margin: 0, 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh', 
          backgroundColor: '#fff' 
        }}
      >
        {/* --- PROFESSIONAL NAVIGATION --- */}
        <nav style={{ 
          padding: '15px 5%', 
          backgroundColor: '#fff', 
          borderBottom: '1px solid #f1f5f9', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          position: 'sticky',
          top: 0,
          zIndex: 1000
        }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ fontWeight: 950, fontSize: '22px', color: '#1e3a8a', letterSpacing: '-1.5px' }}>
              PNG<span style={{color:'#3b82f6'}}>WORLDS</span>
            </div>
          </Link>
          
          <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
            <Link href="/" style={{ fontSize: '12px', fontWeight: 800, color: '#64748b', textDecoration: 'none', textTransform: 'uppercase' }}>Home</Link>
            <Link href="/resize" style={{ 
              fontSize: '12px', 
              fontWeight: 800, 
              color: '#fff', 
              backgroundColor: '#0f172a', 
              padding: '8px 18px', 
              borderRadius: '100px', 
              textDecoration: 'none',
              textTransform: 'uppercase'
            }}>Resize Tool</Link>
          </div>
        </nav>

        {/* --- MAIN CONTENT AREA --- */}
        <main style={{ flex: 1 }}>
          {children}
        </main>

        {/* --- ADSENSE REQUIRED LEGAL FOOTER --- */}
        <footer style={{ 
          backgroundColor: '#f8fafc', 
          padding: '60px 20px', 
          borderTop: '1px solid #e2e8f0', 
          textAlign: 'center' 
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ fontWeight: 900, fontSize: '20px', color: '#cbd5e1', marginBottom: '30px', letterSpacing: '-1px' }}>
              PNGWORLDS
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              gap: '30px', 
              marginBottom: '30px' 
            }}>
              <Link href="/privacy" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Privacy Policy</Link>
              <Link href="/terms" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Terms of Use</Link>
              <Link href="/contact" style={{ color: '#64748b', textDecoration: 'none', fontSize: '13px', fontWeight: 600 }}>Contact Us</Link>
            </div>

            <p style={{ color: '#94a3b8', fontSize: '12px', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto' }}>
              PNGWorlds provides high-quality transparent PNG images for designers, bloggers, and creators. 
              All assets are free for personal and commercial use. 
            </p>
            
            <div style={{ marginTop: '30px', borderTop: '1px solid #f1f5f9', paddingTop: '20px', color: '#cbd5e1', fontSize: '11px', fontWeight: 'bold' }}>
              © {new Date().getFullYear()} PNGWORLDS. MADE FOR CREATIVE MINDS.
            </div>
          </div>
        </footer>

      </body>
    </html>
  );
}