import { useCallback, useEffect, useRef } from 'react';
import soundManager from '../utils/soundManager';

export const useTronHoverSound = () => {
  const currentThemeRef = useRef('light');

  useEffect(() => {
    // Update theme reference when it changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          currentThemeRef.current = document.documentElement.getAttribute('data-theme') || 'light';
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Set initial theme
    currentThemeRef.current = document.documentElement.getAttribute('data-theme') || 'light';

    return () => observer.disconnect();
  }, []);

  const handleHover = useCallback(() => {
    soundManager.playHoverSound(currentThemeRef.current === 'tron');
  }, []);

  return handleHover;
}; 