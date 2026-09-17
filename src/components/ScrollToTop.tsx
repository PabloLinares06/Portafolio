'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useLenis } from 'lenis/react';

export default function ScrollToTop() {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    // If navigating with a hash (e.g. /#projects), let the hash handler manage scroll
    if (typeof window !== 'undefined' && window.location.hash) {
      return;
    }

    // Immediate scroll reset on route change without hash
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, lenis]);

  return null;
}

