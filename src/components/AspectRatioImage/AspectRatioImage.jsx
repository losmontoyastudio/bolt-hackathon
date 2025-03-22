import React, { memo } from 'react';
import './style.css';

export const AspectRatioImage = memo(({ 
  src, 
  alt, 
  aspectRatio = 1, // Default to 1:1 if not specified
  className = '',
  ...props 
}) => {
  return (
    <div 
      className={`aspect-ratio-container ${className}`}
      style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}
    >
      <img
        src={src}
        alt={alt}
        className="aspect-ratio-image"
        loading="lazy"
        decoding="async"
        {...props}
      />
    </div>
  );
});

// Add displayName for better debugging
AspectRatioImage.displayName = 'AspectRatioImage'; 