import React, { useEffect, useState, useRef, useMemo, useCallback } from "react";
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
  // Use ref to store timeouts for easier cleanup
  const timersRef = useRef([]);
  // Add ref to track scroll lock state
  const scrollLockRestoredRef = useRef(false);
  // Add ref to track the animation start time
  const startTimeRef = useRef(Date.now());
  // Add ref to track vibration interval
  const vibrationIntervalRef = useRef(null);

  // Function to start continuous haptic feedback
  const startContinuousVibration = useCallback(() => {
    // Check if the device supports vibration
    if ('vibrate' in navigator) {
      // Clear any existing interval
      if (vibrationIntervalRef.current) {
        clearInterval(vibrationIntervalRef.current);
      }
      
      // Create a continuous vibration pattern
      // Vibrate for 100ms, pause for 100ms
      navigator.vibrate([100, 100]);
      
      // Repeat the pattern every 200ms
      vibrationIntervalRef.current = setInterval(() => {
        navigator.vibrate([100, 100]);
      }, 200);
    }
  }, []);

  // Function to stop vibration
  const stopVibration = useCallback(() => {
    if ('vibrate' in navigator) {
      navigator.vibrate(0); // Stop any ongoing vibration
    }
    if (vibrationIntervalRef.current) {
      clearInterval(vibrationIntervalRef.current);
      vibrationIntervalRef.current = null;
    }
  }, []);

  // Function to safely remove scroll lock
  const removeScrollLock = useCallback(() => {
    if (document.body.classList.contains('no-scroll') && !scrollLockRestoredRef.current) {
      document.body.classList.remove('no-scroll');
      scrollLockRestoredRef.current = true;
    }
  }, []);

  // Add class to body to disable scrolling when component mounts
  useEffect(() => {
    document.body.classList.add('no-scroll');
    scrollLockRestoredRef.current = false;
    startTimeRef.current = Date.now();
    
    // Start continuous vibration when component mounts
    startContinuousVibration();
    
    // Failsafe: Set maximum time for scroll lock (10 seconds)
    const maxScrollLockTimeout = setTimeout(() => {
      removeScrollLock();
      stopVibration(); // Stop vibration if max time is reached
    }, 10000);
    
    timersRef.current.push(maxScrollLockTimeout);
    
    // Remove class and stop vibration when component unmounts
    return () => {
      removeScrollLock();
      stopVibration();
      // Clear any pending timeouts
      timersRef.current.forEach(timer => clearTimeout(timer));
      timersRef.current = [];
    };
  }, [removeScrollLock, startContinuousVibration, stopVibration]);

  // Remove no-scroll class and stop vibration when animation completes
  useEffect(() => {
    if (!visible) {
      removeScrollLock();
      stopVibration();
    }
  }, [visible, removeScrollLock, stopVibration]);

  // Add failsafe: Listen for user interaction to release scroll lock if needed
  useEffect(() => {
    const handleUserInteraction = () => {
      // If animation has been visible too long (5+ seconds) or has errors, force scroll restoration
      if (visible && Date.now() - startTimeRef.current > 5000) {
        removeScrollLock();
        stopVibration(); // Stop vibration if user interaction occurs after timeout
      }
    };
    
    window.addEventListener('click', handleUserInteraction, { passive: true });
    window.addEventListener('keydown', handleUserInteraction, { passive: true });
    window.addEventListener('touchstart', handleUserInteraction, { passive: true });
    
    return () => {
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [visible, removeScrollLock, stopVibration]);

  // Cache lines to prevent recreating array on each render
  const lines = useMemo(() => [
    "loading the world's largest hackathon...",
    "assembling prizes...",
    "wrestling with github permissions...",
    "connecting judges...",
    "staring at cursor error messages...",
    "ready"
  ], []);

  // Memoize animation container styles to prevent recalculation
  const animationStyles = useMemo(() => ({
    contain: 'content',
    willChange: 'opacity'
  }), []);

  // Use useCallback for animation logic to prevent recreating on each render
  const updateAnimation = useCallback(() => {
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
  }, [currentLineIndex, currentText, lines]);

  useEffect(() => {
    updateAnimation();
    
    // Start typing animation
    if (currentLineIndex < lines.length) {
      const line = lines[currentLineIndex];
      
      // If we haven't typed the full line yet
      if (currentText.length < line.length) {
        const typingTimer = setTimeout(() => {
          setCurrentText(line.substring(0, currentText.length + 1));
        }, 30); // Faster typing speed
        
        // Store timer for cleanup
        timersRef.current.push(typingTimer);
        
        return () => {
          // Clear this specific timeout on cleanup
          clearTimeout(typingTimer);
        };
      } 
      // Line is complete, move to next line after a pause
      else {
        const nextLineTimer = setTimeout(() => {
          setCurrentText("");
          setCurrentLineIndex(currentLineIndex + 1);
        }, currentLineIndex === lines.length - 1 ? 800 : 400); // Shorter pauses
        
        // Store timer for cleanup
        timersRef.current.push(nextLineTimer);
        
        return () => {
          // Clear this specific timeout on cleanup
          clearTimeout(nextLineTimer);
        };
      }
    } else {
      // All lines are complete
      setTypeComplete(true);
      
      // Fade out animation after all lines are typed
      const fadeOutTimer = setTimeout(() => {
        setVisible(false);
        // Make sure scroll is restored when animation finishes
        removeScrollLock();
        // Stop vibration when animation is complete
        stopVibration();
      }, 600); // Shorter fade out time
      
      // Store timer for cleanup
      timersRef.current.push(fadeOutTimer);
      
      return () => {
        // Clear this specific timeout on cleanup
        clearTimeout(fadeOutTimer);
      };
    }
  }, [currentLineIndex, currentText, lines, updateAnimation, removeScrollLock, stopVibration]);

  // Memoize shape rendering to prevent recalculation
  const renderShape = useCallback(() => {
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
  }, [currentShape, currentLineIndex, shapesConverged]);

  // If animation is complete, don't render anything
  if (!visible) {
    return null;
  }

  return (
    <div 
      className={`loading-animation ${typeComplete ? "fade-out" : ""}`} 
      ref={animationRef}
      style={animationStyles}
    >
      <div className="animation-container">
        <div className="shape-container">
          {renderShape()}
        </div>
        <div className="loading-text">
          {currentText}<span className="cursor">_</span>
        </div>
        <div className="progress-container">
          <div 
            className="progress-bar" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}; 