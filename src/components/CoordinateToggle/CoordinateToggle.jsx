import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { TronSoundLink } from "../TronSoundLink";
import "./style.css";

export const CoordinateToggle = () => {
  // Check if user has a coordinate display preference in localStorage
  const savedCoordinatePreference = localStorage.getItem("showCoordinates");
  
  // Initialize state with saved preference or default to true (on)
  const [showCoordinates, setShowCoordinates] = useState(() => {
    // If preference is saved in localStorage, use that
    if (savedCoordinatePreference) {
      return savedCoordinatePreference === "true";
    }
    // Default to true (on)
    return true;
  });

  // State for storing current coordinates
  const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
  // State for display position with boundary constraints
  const [displayPosition, setDisplayPosition] = useState({ x: 0, y: 0 });
  // Reference to the button element to maintain focus
  const buttonRef = useRef(null);
  
  // Cache computed values to prevent recalculations during theme changes
  const buttonClassNames = useMemo(() => 
    `coordinate-toggle-btn ${showCoordinates ? 'active' : ''}`,
    [showCoordinates]
  );
  
  const buttonAriaLabel = useMemo(() => 
    showCoordinates ? "Hide mouse coordinates" : "Show mouse coordinates", 
    [showCoordinates]
  );
  
  // Apply preference when component mounts and when showCoordinates changes
  useEffect(() => {
    // Track if element was focused before preference change
    const wasFocused = document.activeElement === buttonRef.current;
    
    localStorage.setItem("showCoordinates", showCoordinates.toString());
    
    // Restore focus after preference change if it was focused
    if (wasFocused && buttonRef.current) {
      // Use a small timeout to let the DOM update first
      setTimeout(() => {
        buttonRef.current.focus();
      }, 10);
    }
  }, [showCoordinates]);
  
  // Memoize mouse move handler to prevent recreation on each render
  const handleMouseMove = useCallback((e) => {
    const newCoordinates = { x: e.clientX, y: e.clientY };
    setCoordinates(newCoordinates);
    
    // Calculate display position with boundary constraints
    const displayWidth = 50; // Updated width for stacked layout
    const displayHeight = 35; // Updated height for stacked layout
    const offset = 15; // Offset from cursor
    
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Calculate position ensuring it stays within viewport
    let posX = newCoordinates.x + offset;
    let posY = newCoordinates.y + offset;
    
    // Adjust if too close to right edge
    if (posX + displayWidth > viewportWidth) {
      posX = newCoordinates.x - displayWidth - offset;
    }
    
    // Adjust if too close to bottom edge
    if (posY + displayHeight > viewportHeight) {
      posY = newCoordinates.y - displayHeight - offset;
    }
    
    setDisplayPosition({ x: posX, y: posY });
  }, []);
  
  // Add/remove mouse move event listener based on preference
  useEffect(() => {
    if (showCoordinates) {
      // Use passive event listener for better performance
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }
    
    // Clean up the listener when component unmounts or preference changes
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showCoordinates, handleMouseMove]);

  // Toggle coordinate display - memoize to prevent recreation on each render
  const toggleCoordinates = useCallback(() => {
    setShowCoordinates(prevState => !prevState);
  }, []);

  // Cache display style to prevent recalculation during theme changes
  const displayStyle = useMemo(() => ({
    left: `${displayPosition.x}px`, 
    top: `${displayPosition.y}px`,
    // Add containment for performance
    contain: 'content'
  }), [displayPosition.x, displayPosition.y]);

  return (
    <>
      <TronSoundLink>
        <button 
          className={buttonClassNames}
          onClick={toggleCoordinates}
          aria-label={buttonAriaLabel}
          style={{ contain: "layout paint" }}
          ref={buttonRef}
        >
          <div className="coordinate-toggle-icon">
            <div className="xy-icon">x:y</div>
          </div>
        </button>
      </TronSoundLink>
      
      {showCoordinates && (
        <div 
          className="coordinate-display"
          style={displayStyle}
        >
          <div className="coordinate-item">x:{coordinates.x}</div>
          <div className="coordinate-item">y:{coordinates.y}</div>
        </div>
      )}
    </>
  );
}; 