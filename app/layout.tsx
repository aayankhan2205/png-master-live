import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#fff', margin: 0 }}>
        <main style={{ flex: 1 }}>{children}</main>
        
        <footer style={{ backgroundColor: '#f1f5f9', padding: '40px 20px', textAlign: 'center', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px', fontSize: '12px', fontWeight: 'bold' }}>
            <Link href="/privacy" style={{ color: '#475569', textDecoration: 'none' }}>Privacy Policy</Link>
            <Link href="/terms" style={{ color: '#475569', textDecoration: 'none' }}>Terms of Use</Link>
            <Link href="/contact" style={{ color: '#475569', textDecoration: 'none' }}>Contact Us</Link>
          </div>
          <p style={{ fontSize: '10px', color: '#94a3b8' }}>© 2026 PNGWORLD. High Quality PNG Assets.</p>
        </footer>
      </body>
    </html>
  );
}