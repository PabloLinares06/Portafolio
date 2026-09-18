import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import ScrollProgress from '@/components/ScrollProgress';
import ScrollToTop from '@/components/ScrollToTop';
import Preloader from '@/components/Preloader';
import CommandPalette from '@/components/CommandPalette';
import DevTerminal from '@/components/DevTerminal';

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
  title: 'Juan Pablo Linares | Software Engineer & Systems Architect',
  description:
    'Portafolio inmersivo de Juan Pablo Linares Laverde — Ingeniero de Software enfocado en arquitecturas de backend de alto rendimiento, .NET 9, NestJS 11, Angular 22, IoT y sistemas distribuidos.',
  keywords: [
    'Juan Pablo Linares',
    'Software Engineer',
    'Full Stack Developer',
    'Backend Engineer',
    'Systems Architect',
    '.NET 9',
    'C#',
    'Dapper',
    'NestJS 11',
    'Angular 22',
    'PostgreSQL',
    'Docker',
    'Clean Architecture',
    'CQRS',
    'Industrial IoT',
    'Offline-First',
  ],
  authors: [{ name: 'Juan Pablo Linares' }],
  creator: 'Juan Pablo Linares',
  openGraph: {
    title: 'Juan Pablo Linares | Software Engineer & Systems Architect',
    description: 'Portafolio inmersivo de Juan Pablo Linares Laverde — Arquitectura, Rendimiento & Sistemas Distribuidos.',
    url: 'https://pablolinares.dev',
    siteName: 'Juan Pablo Linares Portfolio',
    locale: 'es_CO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Juan Pablo Linares | Software Engineer & Systems Architect',
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
        <CommandPalette />
        <DevTerminal />
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
