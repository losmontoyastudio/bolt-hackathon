import React, { useEffect, useState } from "react";
import "./style.css";

export const ThemeToggle = () => {
  // Check if user has a theme preference in localStorage
  const savedTheme = localStorage.getItem("theme");
  
  // Initialize state with saved theme or system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // If theme is saved in localStorage, use that
    if (savedTheme) {
      return savedTheme === "dark";
    }
    // Otherwise check system preference
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Apply theme when component mounts and when isDarkMode changes
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);
  
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
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button 
      className="theme-toggle-btn" 
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="theme-toggle-icon">
        <div className="outer-circle"></div>
        <div className="inner-circle"></div>
      </div>
    </button>
  );
}; 