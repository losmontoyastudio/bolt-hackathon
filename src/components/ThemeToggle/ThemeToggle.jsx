import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
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
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // If theme is saved in localStorage, use that
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Otherwise check system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  
  // Reference to the button element to maintain focus
  const buttonRef = useRef(null);

  // Cache theme-dependent values to prevent recalculations
  const themeValues = useMemo(() => ({
    theme: isDarkMode ? "dark" : "light",
    ariaLabel: isDarkMode ? "Switch to light mode" : "Switch to dark mode",
  }), [isDarkMode]);

  // Apply theme when component mounts and when isDarkMode changes
  // Use useCallback to memoize the applyTheme function
  const applyTheme = useCallback((isDark) => {
    // Track if element was focused before theme change
    const wasFocused = document.activeElement === buttonRef.current;
    
    if (isDark) {
      document.documentElement.setAttribute("data-theme", "dark");
      if (supportsLocalStorage()) {
        localStorage.setItem("theme", "dark");
      }
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (supportsLocalStorage()) {
        localStorage.setItem("theme", "light");
      }
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
      applyTheme(isDarkMode);
    });
  }, [isDarkMode, applyTheme]);
  
  // Listen for system preference changes if no saved theme
  useEffect(() => {
    if (!savedTheme) {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      
      // Define the handler function
      const handleChange = (e) => {
        setIsDarkMode(e.matches);
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

  // Toggle between dark and light mode
  const toggleTheme = useCallback(() => {
    setIsDarkMode(prevState => !prevState);
  }, []);

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label={themeValues.ariaLabel}
      // Add containment for performance optimization
      style={{ contain: "layout paint" }}
      ref={buttonRef}
    >
      <div className="theme-toggle-icon">
        <div className="outer-circle"></div>
        <div className="inner-circle"></div>
      </div>
    </button>
  );
}; 