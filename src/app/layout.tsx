import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Juan Pablo Linares | Software Engineer',
  description:
    'Portafolio inmersivo de Juan Pablo Linares Laverde — Ingeniero de Software Full Stack enfocado en arquitecturas robustas y experiencias digitales de alto impacto.',
  openGraph: {
    title: 'Juan Pablo Linares | Software Engineer',
    description: 'Portafolio inmersivo de Juan Pablo Linares Laverde — Ingeniero de Software.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SmoothScroll>
          <ScrollProgress />
          <Navbar />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
