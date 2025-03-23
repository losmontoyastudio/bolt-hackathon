import React, { useState, useEffect } from 'react';
import { TronSoundLink } from '../TronSoundLink';
import soundManager from '../../utils/soundManager';
import './style.css';

export const SoundToggle = () => {
  const [isEnabled, setIsEnabled] = useState(soundManager.isEnabled);
  const [isTronTheme, setIsTronTheme] = useState(false);

  useEffect(() => {
    // Update theme state when it changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          setIsTronTheme(document.documentElement.getAttribute('data-theme') === 'tron');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    // Set initial theme state
    setIsTronTheme(document.documentElement.getAttribute('data-theme') === 'tron');

    return () => observer.disconnect();
  }, []);

  const toggleSound = () => {
    const newState = !isEnabled;
    setIsEnabled(newState);
    soundManager.setEnabled(newState);
  };

  // Only show the toggle when TRON theme is active
  if (!isTronTheme) return null;

  return (
    <TronSoundLink>
      <button
        className={`sound-toggle ${isEnabled ? 'enabled' : ''}`}
        onClick={toggleSound}
        aria-label={`Sound effects ${isEnabled ? 'enabled' : 'disabled'}`}
      >
        <div className="sound-icon">
          {isEnabled ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L4 6H2V10H4L8 14V2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10.5 5.5C11.5 6.5 12 7.5 12 8C12 8.5 11.5 9.5 10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2L4 6H2V10H4L8 14V2Z" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          )}
        </div>
      </button>
    </TronSoundLink>
  );
}; 