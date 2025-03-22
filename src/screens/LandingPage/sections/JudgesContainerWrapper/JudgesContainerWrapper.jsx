import React, { useEffect } from "react";
import "./style.css";

export const JudgesContainerWrapper = () => {
  useEffect(() => {
    // Add a duplicate image to each image wrapper for the seamless cycling effect
    // Only target image wrappers within the judges container to avoid affecting other sections
    const imageWrappers = document.querySelectorAll('.judges-container-wrapper .image-wrapper');
    
    imageWrappers.forEach(wrapper => {
      const originalImg = wrapper.querySelector('img');
      const clone = originalImg.cloneNode(true);
      clone.classList.add('clone-img');
      wrapper.appendChild(clone);
    });

    // Observer reference to be used in resize handler and cleanup
    let observer = null;
    
    // Function to setup or remove intersection observers based on viewport width
    const handleViewportChange = () => {
      const isMobile = window.innerWidth <= 480;
      const judgeLinks = document.querySelectorAll('.judges-container-wrapper .judge-container-link');
      
      // If moving from mobile to desktop, remove any 'in-viewport' classes
      if (!isMobile) {
        if (observer) {
          observer.disconnect();
          observer = null;
        }
        judgeLinks.forEach(link => {
          link.classList.remove('in-viewport');
        });
        return;
      }
      
      // If already setup for mobile, do nothing
      if (observer) return;
      
      // Create observer to detect when judge containers enter/exit viewport
      observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          // Add 'in-viewport' class when element is visible
          if (entry.isIntersecting) {
            entry.target.classList.add('in-viewport');
          } else {
            // Remove class when element is not visible
            entry.target.classList.remove('in-viewport');
          }
        });
      }, {
        root: null, // Use viewport as root
        rootMargin: '0px',
        threshold: 0.3 // When at least 30% of the element is visible
      });
      
      // Observe all judge links
      judgeLinks.forEach(link => {
        observer.observe(link);
      });
    };
    
    // Initial setup
    handleViewportChange();
    
    // Add resize listener for orientation changes or browser resizing
    window.addEventListener('resize', handleViewportChange);
    
    // Cleanup function
    return () => {
      // Remove event listener
      window.removeEventListener('resize', handleViewportChange);
      
      // Disconnect observer if exists
      if (observer) {
        observer.disconnect();
      }
      
      // Remove the clone images
      document.querySelectorAll('.clone-img').forEach(clone => {
        clone.remove();
      });
    };
  }, []);

  return (
    <div id="judges" className="judges-container-wrapper section-animate">
      <div className="judges-container">
        <div className="judges-section">
          <div className="judges-header">
            <div className="title-6">
              <div className="title-7">judges</div>
            </div>

            <div className="judges-description">
              <p className="description-9">
                <span className="text-wrapper-19">
                  these ai pioneers each bring a unique perspective to
                  vibe-coding, generative design, and real-world impact. from
                  open-source frameworks to creative prototyping, they&#39;ll
                  guide participants toward unexpected solutions.
                </span>
              </p>
            </div>
          </div>

          <div className="judges-update">
            <p className="description-10">
              last updated: 2025-03-19 19:41:12 utc
            </p>
          </div>
        </div>

        <div className="judges-list">
          <a href="https://x.com/levelsio" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_01</div>

                  <div className="japanese-header-2">審査員_01</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="u-a"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@levelsio</span>
                <span className="text-wrapper-22">
                  indie hacker &amp; vibe-coding leader building 3d flight sims
                  with ai.
                </span>
              </p>
            </div>
          </a>

          <a href="https://x.com/officiallogank" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_02</div>

                  <div className="japanese-header-2">審査員_02</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="img"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-1.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@officiallogank</span>
                <span className="text-wrapper-22">
                  ai pioneer blending vibe-coding with real-world tech
                  innovations.
                </span>
              </p>
            </div>
          </a>

          <a href="https://x.com/saranormous" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_03</div>

                  <div className="japanese-header-2">審査員_03</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="img"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-2.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@saranormous</span>
                <span className="text-wrapper-22">
                  generative design guru pushing vibe-coding into bold, futuristic
                  realms.
                </span>
              </p>
            </div>
          </a>

          <a href="https://x.com/theo" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_04</div>

                  <div className="japanese-header-2">審査員_04</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="u-a"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-3.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@theo</span>
                <span className="text-wrapper-22">
                  vibe-coding advocate crafting ai-driven solutions with global
                  impact.
                </span>
              </p>
            </div>
          </a>

          <a href="https://x.com/youyuxi" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_05</div>

                  <div className="japanese-header-2">審査員_05</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="img"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-4.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@youyuxi</span>
                <span className="text-wrapper-22">
                  vue.js creator turned vibe-coding expert shaping elegant, smart
                  designs.
                </span>
              </p>
            </div>
          </a>

          <a href="https://x.com/thisiskp_" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_06</div>

                  <div className="japanese-header-2">審査員_06</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="u-a"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-5.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@thisiskp_</span>
                <span className="text-wrapper-22">
                  ai collaborator using vibe-coding to fuse creativity with tech.
                </span>
              </p>
            </div>
          </a>

          <a href="https://x.com/alexalbert__" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_07</div>

                  <div className="japanese-header-2">審査員_07</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="img"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-6.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@alexalbert__</span>
                <span className="text-wrapper-22">head of claude relations</span>
              </p>
            </div>
          </a>

          <a href="https://x.com/swyx" target="_blank" rel="noopener noreferrer" className="judge-container-link">
            <div className="judge-container">
              <div className="judge-details">
                <div className="header-texts-2">
                  <div className="english-header-2">judge_08</div>

                  <div className="japanese-header-2">審査員_08</div>
                </div>

                <div className="image-wrapper">
                  <img
                    className="u-a"
                    alt="A"
                    src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-a-minimalist-black-and-white-portrait-photograph--52-7.png"
                  />
                </div>
              </div>

              <p className="description-11">
                <span className="text-wrapper-21">@swyx</span>
                <span className="text-wrapper-22">
                  ai hackathon veteran guiding devs through vibe-coding
                  possibilities.
                </span>
              </p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};
