import React from 'react';
import './style.css';

export const AspectRatioImage = ({ 
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
        {...props}
      />
    </div>
  );
}; 