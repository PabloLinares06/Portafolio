import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';
import Preloader from '@/components/Preloader';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://pablolinares.dev'),
  title: 'Juan Pablo Linares | Software Engineer',
  description:
    'Portafolio inmersivo de Juan Pablo Linares Laverde — Ingeniero de Software Full Stack enfocado en arquitecturas robustas y experiencias digitales de alto impacto.',
  keywords: [
    'Juan Pablo Linares',
    'Software Engineer',
    'Full Stack Developer',
    'Backend Engineer',
    '.NET Core',
    'C#',
    'React',
    'Next.js',
    'Clean Architecture',
    'CQRS',
  ],
  authors: [{ name: 'Juan Pablo Linares' }],
  creator: 'Juan Pablo Linares',
  openGraph: {
    title: 'Juan Pablo Linares | Software Engineer',
    description: 'Portafolio inmersivo de Juan Pablo Linares Laverde — Arquitectura, Rendimiento & Lógica.',
    url: 'https://pablolinares.dev',
    siteName: 'Juan Pablo Linares Portfolio',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Pablo Linares | Software Engineer',
    description: 'Portafolio inmersivo de Juan Pablo Linares Laverde — Ingeniero de Software.',
  },
};

export const revalidate = 0;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Preloader />
        <SmoothScroll>
          <ScrollToTop />
          <ScrollProgress />
          <Navbar />
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
