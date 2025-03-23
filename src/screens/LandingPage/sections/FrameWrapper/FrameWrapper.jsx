import React from "react";
import "./style.css";

export const FrameWrapper = () => {
  return (
    <div className="frame-wrapper section-animate">
      <div className="footer-container-wrapper">
        <div className="footer-container">
          <div className="frame-4">
            <a href="https://x.com/losmontoya_" target="_blank" rel="noopener noreferrer" className="image-wrapper">
              <img
                className="unnamed"
                alt="Unnamed"
                src="https://c.animaapp.com/8VR2LaBZ/img/unnamed-1@2x.png"
              />
            </a>

            <div className="footer-description">
              <p className="description-15">
                <span className="text-wrapper-25">designed &amp; developed by </span>
                <a href="https://x.com/losmontoya_" target="_blank" rel="noopener noreferrer" className="text-wrapper-26">@losmontoya_</a>
                <span className="text-wrapper-25">.</span>
                <br className="keep-break" />
                <br className="keep-break" />

                <span className="text-wrapper-25">Tools used: Figma (design), bolt.new (dev), Perplexity (mood board &amp; type research), Anthropic Claude 3.7 + OpenAI ChatGPT O1 Pro (thought partners), Anima (AI code generation), Cursor (fine-tuning code), xAI Grok (judge &amp; sponsor bios), Midjourney (assets), Apple Pro Display XDR + Mac Studio 2025.</span>
                <br className="keep-break" />
                <br className="keep-break" />

                <span className="text-wrapper-25">made in park city, utah. all copy &amp; concept © 2025.</span>
              </p>
            </div>
          </div>

          <div className="footer-line" />

          <div className="footer-info">
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

            <div className="footer-links">
              <p className="date-2">
                <a href="https://stackblitz.com/terms-of-service?__hstc=69929231.52e217d320adc9d93572a05693a39dab.1742413249164.1742568743987.1742572557423.6&__hssc=69929231.1.1742572557423&__hsfp=696856021" target="_blank" rel="noopener noreferrer">terms</a>
                <span>/</span>
                <a href="https://stackblitz.com/privacy-policy?__hstc=69929231.52e217d320adc9d93572a05693a39dab.1742413249164.1742568743987.1742572557423.6&__hssc=69929231.1.1742572557423&__hsfp=696856021" target="_blank" rel="noopener noreferrer">privacy</a>
                <span>/</span>
                <a href="https://support.bolt.new/faqs/support" target="_blank" rel="noopener noreferrer">contact</a>
                <span>/</span>
                <span>©2025 hackathon.dev</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
