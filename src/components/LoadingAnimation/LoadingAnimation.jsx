import React, { useEffect, useState, useRef } from "react";
import "./style.css";

export const LoadingAnimation = () => {
  const [visible, setVisible] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typeComplete, setTypeComplete] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentShape, setCurrentShape] = useState(null);
  const [shapesConverged, setShapesConverged] = useState(false);
  const animationRef = useRef(null);

  const lines = [
    "loading the world's largest hackathon...",
    "assembling prizes...",
    "wrestling with github permissions...",
    "connecting judges...",
    "staring at cursor error messages...",
    "ready"
  ];

  useEffect(() => {
    // Update progress based on current line
    setProgress((currentLineIndex / (lines.length - 1)) * 100);
    
    // Set current shape based on line index
    if (currentLineIndex < lines.length) {
      setCurrentShape(currentLineIndex);
    }
    
    // Check if we should show converged shapes
    if (currentLineIndex === lines.length - 1 && currentText === lines[lines.length - 1]) {
      setShapesConverged(true);
    }

    // Start typing animation
    if (currentLineIndex < lines.length) {
      const line = lines[currentLineIndex];
      
      // If we haven't typed the full line yet
      if (currentText.length < line.length) {
        const typingTimer = setTimeout(() => {
          setCurrentText(line.substring(0, currentText.length + 1));
        }, 30); // Faster typing speed
        
        return () => clearTimeout(typingTimer);
      } 
      // Line is complete, move to next line after a pause
      else {
        const nextLineTimer = setTimeout(() => {
          setCurrentText("");
          setCurrentLineIndex(currentLineIndex + 1);
        }, currentLineIndex === lines.length - 1 ? 800 : 400); // Shorter pauses
        
        return () => clearTimeout(nextLineTimer);
      }
    } else {
      // All lines are complete
      setTypeComplete(true);
      
      // Fade out animation after all lines are typed
      const fadeOutTimer = setTimeout(() => {
        setVisible(false);
      }, 600); // Shorter fade out time
      
      return () => clearTimeout(fadeOutTimer);
    }
  }, [currentLineIndex, currentText, lines]);

  // Render the current shape
  const renderShape = () => {
    if (currentLineIndex === 5 && shapesConverged) {
      return (
        <div className="shapes-converged">
          <div className="shape bolt"></div>
          <div className="shape square"></div>
          <div className="shape circle"></div>
          <div className="shape triangle"></div>
          <div className="shape rectangle"></div>
        </div>
      );
    }

    switch (currentShape) {
      case 0:
        return <div className="shape bolt"></div>; // Lightning bolt
      case 1:
        return <div className="shape square"></div>;
      case 2:
        return <div className="shape circle"></div>;
      case 3:
        return <div className="shape triangle"></div>;
      case 4:
        return <div className="shape rectangle"></div>;
      default:
        return null;
    }
  };

  if (!visible) {
    return null;
  }

  return (
    <div className={`loading-animation ${typeComplete ? "fade-out" : ""}`} ref={animationRef}>
      <div className="animation-container">
        <div className="shape-container">
          {renderShape()}
        </div>
        <div className="loading-text">
          {currentText}<span className="cursor">_</span>
        </div>
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}; 