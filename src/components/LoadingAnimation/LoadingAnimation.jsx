import React, { useEffect, useState, useRef } from "react";
import "./style.css";

export const LoadingAnimation = () => {
  const [visible, setVisible] = useState(true);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [typeComplete, setTypeComplete] = useState(false);
  const animationRef = useRef(null);

  const lines = [
    "loading the world's largest hackathon...",
    "assembling prizes...",
    "wrestling with terminal...",
    "connecting judges...",
    "staring at cursor error messages...",
    "ready"
  ];

  useEffect(() => {
    // Start typing animation
    if (currentLineIndex < lines.length) {
      const line = lines[currentLineIndex];
      
      // If we haven't typed the full line yet
      if (currentText.length < line.length) {
        const typingTimer = setTimeout(() => {
          setCurrentText(line.substring(0, currentText.length + 1));
        }, 30); // Faster typing speed (was 75ms)
        
        return () => clearTimeout(typingTimer);
      } 
      // Line is complete, move to next line after a pause
      else {
        const nextLineTimer = setTimeout(() => {
          setCurrentText("");
          setCurrentLineIndex(currentLineIndex + 1);
        }, currentLineIndex === lines.length - 1 ? 800 : 400); // Shorter pauses (was 1500/800ms)
        
        return () => clearTimeout(nextLineTimer);
      }
    } else {
      // All lines are complete
      setTypeComplete(true);
      
      // Fade out animation after all lines are typed
      const fadeOutTimer = setTimeout(() => {
        setVisible(false);
      }, 600); // Shorter fade out time (was 1000ms)
      
      return () => clearTimeout(fadeOutTimer);
    }
  }, [currentLineIndex, currentText, lines]);

  if (!visible) {
    return null;
  }

  return (
    <div className={`loading-animation ${typeComplete ? "fade-out" : ""}`} ref={animationRef}>
      <div className="loading-text">
        {currentText}<span className="cursor">_</span>
      </div>
    </div>
  );
}; 