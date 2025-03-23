import React from "react";
import { AspectRatioImage } from "../../../../components/AspectRatioImage/AspectRatioImage";
import "./style.css";

export const PrizesContainer = () => {
  return (
    <div id="prizes" className="prizes-container section-animate">
      <div className="prizes-container-wrapper">
        <div className="div-2">
          <div className="div-3">
            <div className="div-wrapper">
              <div className="title-3">prizes</div>
            </div>

            <div className="prizes-description">
              <p className="description-4">
                this hackathon brings together a global community of creators to compete for over $1 million in prizes. from technical excellence to community impact, there's a prize for every type of innovator—four tiers, one unforgettable event.
              </p>
            </div>
          </div>

          <div className="prize-tiers">
            <div className="frame">
              <div className="header">
                <span className="tier-text">tier_01</span>
                <span className="layer-text">層_01</span>
              </div>

              <div className="div-3">
                <AspectRatioImage
                  className="an"
                  alt="An"
                  src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-an-extremely-small-black-geometric-trophy-with-an-58@2x.png"
                  aspectRatio={324/243}
                />

                <div className="div-4">
                  <div className="text-wrapper-8">grand prize</div>
                  <div className="prize-amount">$500,000</div>
                  <p className="text-wrapper-9">
                    for groundbreaking software showing exceptional technical
                    innovation and practical application.
                  </p>
                </div>

                <div className="div-5">
                  <div className="text-wrapper-10">
                    criteria:
                    <br />
                    technical innovation
                    <br />
                    practical impact
                    <br />
                    design quality
                  </div>
                  <p className="submission-deadline">
                    submissions close: 2025-03-28 23:59 utc
                  </p>
                </div>
              </div>
            </div>

            <div className="frame-2">
              <div className="div-4">
                <div className="div-6">
                  <div className="text-wrapper-11">tier_02</div>
                  <div className="text-wrapper-12">層_02</div>
                </div>

                <AspectRatioImage
                  className="an"
                  alt="An"
                  src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-an-extremely-small-black-geometric-trophy-with-an-58-1@2x.png"
                  aspectRatio={324/243}
                />
              </div>

              <div className="div-4">
                <div className="text-wrapper-8">community choice</div>
                <div className="text-wrapper-13">$250,000</div>
                <p className="text-wrapper-9">
                  determined by public vote among the top 20 finalists. an open,
                  community-driven selection for standout work.
                </p>
              </div>

              <div className="div-5">
                <div className="text-wrapper-10">
                  criteria:
                  <br />
                  public voting
                  <br />
                  pitch clarity
                  <br />
                  mass appeal
                </div>
                <p className="submission-deadline">
                  submissions close: 2025-03-28 23:59 utc
                </p>
              </div>
            </div>

            <div className="frame-2">
              <div className="div-4">
                <div className="div-6">
                  <div className="text-wrapper-11">tier_03</div>
                  <div className="text-wrapper-12">層_03</div>
                </div>

                <AspectRatioImage
                  className="an"
                  alt="An"
                  src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-an-extremely-small-black-geometric-trophy-with-an-58-2@2x.png"
                  aspectRatio={324/243}
                />
              </div>

              <div className="div-4">
                <div className="text-wrapper-8">category winners</div>
                <div className="text-wrapper-13">$100,000 each</div>
                <p className="text-wrapper-9">
                  awarded across five distinct categories: ai, data
                  visualization, developer tools, accessibility, creative
                  coding.
                </p>
              </div>

              <div className="div-5">
                <p className="text-wrapper-10">
                  criteria:
                  <br />
                  domain relevance
                  <br />
                  usability &amp; execution
                  <br />
                  potential for scale
                </p>
                <p className="submission-deadline">
                  submissions close: 2025-03-28 23:59 utc
                </p>
              </div>
            </div>

            <div className="frame-2">
              <div className="div-4">
                <div className="div-6">
                  <div className="text-wrapper-11">tier_04</div>
                  <div className="text-wrapper-12">層_04</div>
                </div>

                <AspectRatioImage
                  className="an"
                  alt="An"
                  src="https://c.animaapp.com/8VR2LaBZ/img/u3665111922-an-extremely-small-black-geometric-trophy-with-an-58-3@2x.png"
                  aspectRatio={324/243}
                />
              </div>

              <div className="div-4">
                <div className="text-wrapper-8">special awards</div>
                <div className="text-wrapper-13">$20,000-$50,000</div>
                <p className="text-wrapper-9">
                  unique honors for teams demonstrating outstanding
                  collaboration, design, or rookie excellence.
                </p>
              </div>

              <div className="div-5">
                <p className="text-wrapper-10">
                  criteria:
                  <br />
                  best ux
                  <br />
                  best rookie team
                  <br />
                  innovation in open-source
                </p>
                <p className="submission-deadline">
                  submissions close: 2025-03-28 23:59 utc
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
