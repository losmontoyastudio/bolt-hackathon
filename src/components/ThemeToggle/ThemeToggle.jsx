import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { TronSoundLink } from "../TronSoundLink";
import "./style.css";

// Feature detection for localStorage
const supportsLocalStorage = () => {
  try {
    return 'localStorage' in window && window.localStorage !== null;
  } catch (e) {
    return false;
  }
};

export const ThemeToggle = () => {
  // Check if user has a theme preference in localStorage
  const getSavedTheme = () => {
    if (supportsLocalStorage()) {
      return localStorage.getItem("theme");
    }
    return null;
  };
  
  const savedTheme = getSavedTheme();
  
  // Initialize state with saved theme or system preference
  const [currentTheme, setCurrentTheme] = useState(() => {
    // If theme is saved in localStorage, use that
    if (savedTheme) {
      return savedTheme;
    }
    // Otherwise check system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  
  // Reference to the button element to maintain focus
  const buttonRef = useRef(null);

  // Cache theme-dependent values to prevent recalculations
  const themeValues = useMemo(() => {
    const themeLabels = {
      light: "Switch to dark mode",
      dark: "Switch to TRON mode",
      tron: "Switch to light mode"
    };
    return {
      theme: currentTheme,
      ariaLabel: themeLabels[currentTheme]
    };
  }, [currentTheme]);

  // Apply theme when component mounts and when theme changes
  const applyTheme = useCallback((theme) => {
    // Track if element was focused before theme change
    const wasFocused = document.activeElement === buttonRef.current;
    
    if (theme === "light") {
      document.documentElement.removeAttribute("data-theme");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
    
    if (supportsLocalStorage()) {
      localStorage.setItem("theme", theme);
    }
    
    // Restore focus after theme change if it was focused
    if (wasFocused && buttonRef.current) {
      // Use a small timeout to let the DOM update first
      setTimeout(() => {
        buttonRef.current.focus();
      }, 10);
    }
  }, []);

  useEffect(() => {
    // Create a single requestAnimationFrame call to batch DOM changes
    requestAnimationFrame(() => {
      applyTheme(currentTheme);
    });
  }, [currentTheme, applyTheme]);
  
  // Listen for system preference changes if no saved theme
  useEffect(() => {
    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      // Define the handler function
      const handleChange = (e) => {
        setCurrentTheme(e.matches ? "dark" : "light");
      };
      
      // Add the event listener
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }
      
      // Clean up the listener when component unmounts
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleChange);
        } else {
          // Fallback for older browsers
          mediaQuery.removeListener(handleChange);
        }
      };
    }
  }, [savedTheme]);

  // Toggle between themes
  const toggleTheme = useCallback(() => {
    setCurrentTheme(prevTheme => {
      switch (prevTheme) {
        case "light":
          return "dark";
        case "dark":
          return "tron";
        default:
          return "light";
      }
    });
  }, []);

  return (
    <TronSoundLink>
      <button 
        className={`theme-toggle-btn ${currentTheme}`}
        onClick={toggleTheme}
        aria-label={themeValues.ariaLabel}
        aria-pressed={currentTheme !== "light"}
        role="switch"
        style={{ contain: "layout paint" }}
        ref={buttonRef}
      >
        <div className="theme-toggle-icon" aria-hidden="true">
          <div className="outer-circle"></div>
          <div className="inner-circle"></div>
        </div>
        <span className="visually-hidden">
          Current theme: {currentTheme}
        </span>
      </button>
    </TronSoundLink>
  );
}; 