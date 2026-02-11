import { useEffect, useRef } from 'react';

interface PageSeoOptions {
  title: string;
  description: string;
}

export function usePageSeo({ title, description }: PageSeoOptions) {
  const originalTitleRef = useRef<string>('');
  const originalDescriptionRef = useRef<string>('');

  useEffect(() => {
    // Store original values on mount
    originalTitleRef.current = document.title;
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      originalDescriptionRef.current = metaDescription.getAttribute('content') || '';
    }

    // Set new values
    document.title = title;
    
    if (metaDescription) {
      metaDescription.setAttribute('content', description);
    } else {
      const newMeta = document.createElement('meta');
      newMeta.name = 'description';
      newMeta.content = description;
      document.head.appendChild(newMeta);
    }

    // Restore original values on unmount
    return () => {
      document.title = originalTitleRef.current;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc && originalDescriptionRef.current) {
        metaDesc.setAttribute('content', originalDescriptionRef.current);
      }
    };
  }, [title, description]);
}
