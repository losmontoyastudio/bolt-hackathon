import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LandingPage } from "./screens/LandingPage";

// Initialize theme before render to prevent flash of unstyled content
const initializeTheme = () => {
  // Use a closure to cache theme-dependent values
  // This avoids recomputing values during theme changes
  const themeCache = new Map();
  
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem("theme");
  
  // Function to apply theme without causing layout thrashing
  const applyTheme = (theme) => {
    if (themeCache.has(theme)) {
      return;
    }
    
    requestAnimationFrame(() => {
      if (theme === "dark") {
        // Apply dark theme
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        // Apply light theme
        document.documentElement.removeAttribute("data-theme");
      }
      
      // Cache the applied theme
      themeCache.set(theme, true);
    });
  };
  
  if (savedTheme === "dark") {
    // Apply dark theme
    applyTheme("dark");
  } else if (!savedTheme) {
    // If no saved preference, check system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
  } else {
    // Explicitly apply light theme if saved as "light"
    applyTheme("light");
  }
};

// Calculate scrollbar width to prevent layout shifts when applying no-scroll class
const calculateScrollbarWidth = () => {
  // Create a div with scrollbars
  const outer = document.createElement('div');
  outer.style.visibility = 'hidden';
  outer.style.overflow = 'scroll';
  document.body.appendChild(outer);

  // Create an inner div
  const inner = document.createElement('div');
  outer.appendChild(inner);

  // Calculate the width difference
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  // Remove the divs
  outer.parentNode.removeChild(outer);

  // Set the scrollbar width as a CSS variable
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};

// Run initialization functions immediately
initializeTheme();

// Calculate scrollbar width after DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', calculateScrollbarWidth);
} else {
  calculateScrollbarWidth();
}

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
);
