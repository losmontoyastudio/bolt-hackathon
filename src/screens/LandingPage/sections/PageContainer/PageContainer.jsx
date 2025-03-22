import React, { useEffect, useState } from "react";
import "./style.css";

export const PageContainer = () => {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    // Function to handle scroll events
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
          setActiveSection(section);
          break;
        }
      }
    };

    // Function to handle animation on scroll
    const handleScrollAnimation = () => {
      const sections = document.querySelectorAll('.section-animate');
      
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) { // Trigger animation when section is 85% into view
          section.classList.add('in-view');
        }
      });
    };

    // Initial check for elements in view
    setTimeout(() => {
      handleScrollAnimation();
    }, 100);

    // Add scroll event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("scroll", handleScrollAnimation);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("scroll", handleScrollAnimation);
    };
  }, []);

  return (
    <div className="page-container">
      <div className="main-container">
        <div className="landing-container-wrapper">
          <div className="landing-container">
            <div className="header-section">
              <div className="header-content">
                <div className="logo-container">
                  <a href="/" className="image-wrapper text-slide-animation">
                    <span>
                      <img
                        className="logo"
                        alt="Logo"
                        src="https://c.animaapp.com/8VR2LaBZ/img/logo.svg"
                      />
                    </span>
                    <span className="hover-text">
                      <img
                        className="logo"
                        alt="Logo"
                        src="https://c.animaapp.com/8VR2LaBZ/img/logo.svg"
                      />
                    </span>
                  </a>
                  <div className="date">2025 march</div>
                </div>
                <div className="navigation">
                  <a href="#about" className={`nav-link text-slide-animation ${activeSection === "about" ? "active" : ""}`}>
                    <span>about</span>
                    <span className="hover-text">about</span>
                  </a>
                  <a href="#prizes" className={`nav-link text-slide-animation ${activeSection === "prizes" ? "active" : ""}`}>
                    <span>prizes</span>
                    <span className="hover-text">prizes</span>
                  </a>
                  <a href="#sponsors" className={`nav-link text-slide-animation ${activeSection === "sponsors" ? "active" : ""}`}>
                    <span>sponsors</span>
                    <span className="hover-text">sponsors</span>
                  </a>
                  <a href="#judges" className={`nav-link text-slide-animation ${activeSection === "judges" ? "active" : ""}`}>
                    <span>judges</span>
                    <span className="hover-text">judges</span>
                  </a>
                  <a href="#faq" className={`nav-link text-slide-animation ${activeSection === "faq" ? "active" : ""}`}>
                    <span>faq</span>
                    <span className="hover-text">faq</span>
                  </a>
                  <a href="https://form.typeform.com/to/wf94YwH4?typeform-source=t.co" target="_blank" rel="noopener noreferrer" className="nav-link register text-slide-animation">
                    <span>register</span>
                    <span className="hover-text">register</span>
                  </a>
                </div>
              </div>
            </div>
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
                  <a href="https://x.com/boltdotnew" target="_blank" rel="noopener noreferrer" className="text-wrapper-2">x</a>
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
    </div>
  );
};
