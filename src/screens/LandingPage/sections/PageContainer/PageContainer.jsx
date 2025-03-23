import React, { useEffect, useState, useRef } from "react";
import "./style.css";

export const PageContainer = () => {
  const [activeSection, setActiveSection] = useState("");
  // Add a ref to store the IntersectionObserver instance
  const observerRef = useRef(null);
  // Add a ref to store observed elements for proper cleanup
  const observedElementsRef = useRef(new Set());

  useEffect(() => {
    // Throttle function to limit how often a function can be called
    const throttle = (func, limit) => {
      let inThrottle;
      return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
          func.apply(context, args);
          inThrottle = true;
          setTimeout(() => inThrottle = false, limit);
        }
      };
    };
    
    // Function to handle active section changes
    const handleScroll = () => {
      const sections = ["about", "prizes", "sponsors", "judges", "faq"];
      const scrollPosition = window.scrollY + 100; // Offset for header

      // Reset animations if scrolled to the top (except about section)
      if (window.scrollY < 100) {
        const animatedSections = document.querySelectorAll('.section-animate:not(#about)');
        animatedSections.forEach(section => {
          // Skip the about section
          if (section.id !== "about" && !section.closest('#about')) {
            section.classList.remove('in-view');
            // Small timeout to ensure CSS transition is reset
            setTimeout(() => {
              // Force reflow to restart animations
              void section.offsetWidth;
            }, 50);
          }
        });
      }

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && scrollPosition >= element.offsetTop && scrollPosition < element.offsetTop + element.offsetHeight) {
          // Only update if different - avoid unnecessary re-renders
          if (section !== activeSection) {
            setActiveSection(section);
          }
          break;
        }
      }
    };

    // Create throttled version of scroll handler
    const throttledScroll = throttle(handleScroll, 100);

    // Add scroll event listener for active section detection
    window.addEventListener("scroll", throttledScroll);
    
    // Set up Intersection Observer for animation
    const observerOptions = {
      root: null, // Use the viewport
      rootMargin: '0px',
      threshold: 0.15 // Trigger when at least 15% of the element is visible
    };
    
    // Function to safely observe elements
    const safelyObserveElement = (element) => {
      // Check if element is valid and not already observed
      if (element && !observedElementsRef.current.has(element)) {
        observerRef.current.observe(element);
        observedElementsRef.current.add(element);
      }
    };

    // Function to safely unobserve elements
    const safelyUnobserveElement = (element) => {
      // Check if element is valid and currently observed
      if (element && observedElementsRef.current.has(element)) {
        observerRef.current.unobserve(element);
        observedElementsRef.current.delete(element);
      }
    };
    
    // Create the observer and store in ref for cleanup
    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target;
        
        if (entry.isIntersecting) {
          target.classList.add('in-view');
          
          // Optional: Unobserve after adding in-view if the animation only needs to happen once
          // This reduces memory usage by removing observers for elements that are already animated
          // Uncomment this line if you want the animation to only happen once per page load:
          // safelyUnobserveElement(target);
        } else {
          // Only remove the class if we want the animation to replay when scrolling back into view
          // If this is the desired behavior, keep this line, otherwise remove it for performance
          // target.classList.remove('in-view');
        }
      });
    }, observerOptions);
    
    // Clear any existing observed elements
    observedElementsRef.current.clear();
    
    // Observe all animation sections
    document.querySelectorAll('.section-animate').forEach(section => {
      safelyObserveElement(section);
    });
    
    // Initial check for elements in view after a small delay
    const initialCheckTimeout = setTimeout(() => {
      document.querySelectorAll('.section-animate').forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.85) {
          section.classList.add('in-view');
          
          // Optional: Unobserve sections that are already in view on load
          // Uncomment this line if animations should only play once:
          // safelyUnobserveElement(section);
        }
      });
    }, 100);
    
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      clearTimeout(initialCheckTimeout);
      
      // Clean up the observer and clear all observed elements
      if (observerRef.current) {
        // Properly unobserve all elements before disconnecting
        observedElementsRef.current.forEach(element => {
          try {
            observerRef.current.unobserve(element);
          } catch (e) {
            console.warn('Failed to unobserve element:', e);
          }
        });
        
        // Disconnect the observer
        observerRef.current.disconnect();
        observerRef.current = null;
        
        // Clear the set of observed elements
        observedElementsRef.current.clear();
      }
    };
  }, [activeSection]); // Add activeSection to dependency array

  return (
    <main className="page-container">
      <div className="main-container">
        <div className="landing-container-wrapper">
          <div className="landing-container">
            <header className="header-section">
              <div className="header-content">
                <div className="logo-container">
                  <a href="/" className="image-wrapper text-slide-animation" aria-label="Home">
                    <span>
                      <img
                        className="logo logo-image"
                        alt="Hackathon Logo"
                        src="https://c.animaapp.com/8VR2LaBZ/img/logo.svg"
                      />
                    </span>
                    <span className="hover-text">
                      <img
                        className="logo logo-image"
                        alt="Hackathon Logo"
                        src="https://c.animaapp.com/8VR2LaBZ/img/logo.svg"
                      />
                    </span>
                  </a>
                  <div className="date">2025 march</div>
                </div>
                <nav className="navigation" aria-label="Main navigation">
                  <a href="#about" className={`nav-link text-slide-animation ${activeSection === "about" ? "active" : ""}`} aria-current={activeSection === "about" ? "page" : undefined}>
                    <span>about</span>
                    <span className="hover-text">about</span>
                  </a>
                  <a href="#prizes" className={`nav-link text-slide-animation ${activeSection === "prizes" ? "active" : ""}`} aria-current={activeSection === "prizes" ? "page" : undefined}>
                    <span>prizes</span>
                    <span className="hover-text">prizes</span>
                  </a>
                  <a href="#sponsors" className={`nav-link text-slide-animation ${activeSection === "sponsors" ? "active" : ""}`} aria-current={activeSection === "sponsors" ? "page" : undefined}>
                    <span>sponsors</span>
                    <span className="hover-text">sponsors</span>
                  </a>
                  <a href="#judges" className={`nav-link text-slide-animation ${activeSection === "judges" ? "active" : ""}`} aria-current={activeSection === "judges" ? "page" : undefined}>
                    <span>judges</span>
                    <span className="hover-text">judges</span>
                  </a>
                  <a href="#faq" className={`nav-link text-slide-animation ${activeSection === "faq" ? "active" : ""}`} aria-current={activeSection === "faq" ? "page" : undefined}>
                    <span>faq</span>
                    <span className="hover-text">faq</span>
                  </a>
                  <a href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co" target="_blank" rel="noopener noreferrer" className="nav-link register text-slide-animation">
                    <span>register</span>
                    <span className="hover-text">register</span>
                  </a>
                </nav>
              </div>
            </header>
            <div className="div">
              <div className="main-title">
                <div className="title">the world's largest hackathon</div>
              </div>
              <div className="main-description">
                <p className="description">
                  <span className="span">
                    building the future, at unprecedented scale.
                    <br />
                    <br />
                    join a global collective of coders to compete for $1m+ in
                    prizes. this is where the next generation of software is
                    born—limitless possibilities in a finite timeframe.
                    we&#39;ve engineered the perfect environment for creation.
                    no compromises. born on{" "}
                  </span>
                  <a href="https://x.com/boltdotnew" target="_blank" rel="noopener noreferrer" className="text-wrapper-2 text-slide-animation">
                    <span>x</span>
                    <span className="hover-text">x</span>
                  </a>
                  <span className="span">.</span>
                </p>
              </div>
            </div>
            <div className="arrow">
              <div className="continuation">
                続<br />き<br />あ<br />り
              </div>
              <div className="arrow-2">↓</div>
            </div>
          </div>
        </div>
      </div>
      <div id="about" className="about-container-wrapper section-animate">
        <div className="about-container">
          <div className="div">
            <div className="title-wrapper">
              <div className="title-2">about</div>
            </div>
            <div className="about-description">
              <p className="p">
                <span className="text-wrapper-3">
                  the hackathon runs virtually for{" "}
                </span>
                <span className="text-wrapper-4">72 hours</span>
                <span className="text-wrapper-3">
                  . projects are judged on technical innovation, design quality,
                  and practical impact. winners announced live on{" "}
                </span>
                <span className="text-wrapper-4">april 15, 2025</span>
                <span className="text-wrapper-3">
                  .<br />
                  <br />
                  technical competition meets creative ambition. this event
                  brings together coders, designers, and visionaries to solve
                  real-world problems through code. all skill levels welcome.
                </span>
              </p>
            </div>
          </div>
          <div className="about-details">
            <p className="description-2">
              <span className="text-wrapper-5">
                format
                <br />
              </span>
              <span className="text-wrapper-6">virtual, 72 hours</span>
            </p>
            <p className="description-3">
              <span className="text-wrapper-5">
                date
                <br />
              </span>
              <span className="text-wrapper-7">march 25-28, 2025</span>
            </p>
            <p className="description-3">
              <span className="text-wrapper-5">
                eligibility
                <br />
              </span>
              <span className="text-wrapper-6">
                open worldwide, individuals or teams up to 4
              </span>
            </p>
            <p className="description-3">
              <span className="text-wrapper-5">
                requirements
                <br />
              </span>
              <span className="text-wrapper-6">
                all code must be original work created during the event
              </span>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};
