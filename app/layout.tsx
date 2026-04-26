import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PNG WORLD | Free Transparent PNG Images",
  description: "Download high-quality transparent PNGs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#fff', fontFamily: 'sans-serif' }}>
        {/* We removed the <nav> from here so page.tsx can control the design perfectly */}
        {children}
      </body>
    </html>
  );
}