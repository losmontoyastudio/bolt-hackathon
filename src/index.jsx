import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { LandingPage } from "./screens/LandingPage";

// Initialize theme before render to prevent flash of unstyled content
const initializeTheme = () => {
  // Check if user has a saved theme preference
  const savedTheme = localStorage.getItem("theme");
  
  if (savedTheme === "dark") {
    // Apply dark theme
    document.documentElement.setAttribute("data-theme", "dark");
  } else if (!savedTheme) {
    // If no saved preference, check system preference
    const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDarkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }
};

// Run theme initialization immediately
initializeTheme();

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <LandingPage />
  </StrictMode>,
);
