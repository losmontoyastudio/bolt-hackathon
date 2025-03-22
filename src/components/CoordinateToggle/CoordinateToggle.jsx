import React, { useEffect, useState } from "react";
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
  
  // Apply preference when component mounts and when showCoordinates changes
  useEffect(() => {
    localStorage.setItem("showCoordinates", showCoordinates.toString());
  }, [showCoordinates]);
  
  // Add/remove mouse move event listener based on preference
  useEffect(() => {
    const handleMouseMove = (e) => {
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
    };
    
    if (showCoordinates) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    
    // Clean up the listener when component unmounts or preference changes
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [showCoordinates]);

  // Toggle coordinate display
  const toggleCoordinates = () => {
    setShowCoordinates(!showCoordinates);
  };

  return (
    <>
      <button 
        className={`coordinate-toggle-btn ${showCoordinates ? 'active' : ''}`}
        onClick={toggleCoordinates}
        aria-label={showCoordinates ? "Hide mouse coordinates" : "Show mouse coordinates"}
      >
        <div className="coordinate-toggle-icon">
          <div className="xy-icon">x:y</div>
        </div>
      </button>
      
      {showCoordinates && (
        <div 
          className="coordinate-display"
          style={{ 
            left: `${displayPosition.x}px`, 
            top: `${displayPosition.y}px`,
          }}
        >
          <div className="coordinate-item">x:{coordinates.x}</div>
          <div className="coordinate-item">y:{coordinates.y}</div>
        </div>
      )}
    </>
  );
}; 