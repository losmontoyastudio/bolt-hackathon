import React from "react";
import { TronSoundLink } from "../../../../components/TronSoundLink";
import "./style.css";

export const FaqContainerWrapper = () => {
  return (
    <div id="faq" className="FAQ-container-wrapper section-animate">
      <div className="FAQ-container">
        <div className="FAQ-section">
          <div className="FAQ-header">
            <div className="title-8">
              <div className="title-9">faq</div>
            </div>

            <div className="japanese-title">
              <div className="japanese-header-3">よくある質問</div>
            </div>
          </div>

          <div className="FAQ-description">
            <div className="FAQ-intro">
              <p className="description-12">
                have a question? see our most common inquiries below.
              </p>
            </div>

            <div className="FAQ-update">
              <p className="description-13">
                last updated: 2025-03-19 19:41:12 utc
              </p>

              <div className="description-14">
                更新日時: 2025-03-19 19:41:12 utc
              </div>
            </div>
          </div>
        </div>

        <div className="FAQ-list">
          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_01 / 質問_01: <br />
                can i participate from anywhere?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-4">
                yes, fully virtual and open worldwide
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_02 / 質問_02: <br />
                what are the vibe-coding rules?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-4">
                use any ai or coding framework. keep it original, built during
                the event.
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_03 / 質問_03: <br />
                is there a registration fee?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-4">
                no, it&#39;s free for everyone. sign up by the deadline for
                updates.
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_04 / 質問_04: <br />
                how many people per team?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-4">
                up to four. solo hackers welcome.
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_05 / 質問_05: <br />
                what's the submission format?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-4">
                submit a demo link + brief docs describing your solution. see
                our guidelines for details.
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_06 / 質問_06: <br />
                who owns the project ip?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-4">
                you keep full ownership. we just request permission to showcase
                your work post-hackathon.
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_07 / 質問_07: <br />
                any beginner-friendly resources?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-5">
                <span className="text-wrapper-23">yes, check our </span>
                <TronSoundLink>
                  <a href="https://support.bolt.new/home" target="_blank" rel="noopener noreferrer" className="text-wrapper-24">
                    resources
                  </a>
                </TronSoundLink>
                <span className="text-wrapper-23">
                  {" "}
                  page for vibe-coding tutorials, ai tooling docs, and community
                  support.
                </span>
              </p>
            </div>
          </div>

          <div className="frame-3">
            <div className="english-header-wrapper">
              <p className="english-header-3">
                q_08 / 質問_08: <br />
                where do i go for more help?
              </p>
            </div>

            <div className="english-header-wrapper">
              <p className="english-header-5">
                <span className="text-wrapper-23">join our </span>
                <TronSoundLink>
                  <a href="https://discord.com/invite/stackblitz" target="_blank" rel="noopener noreferrer" className="text-wrapper-24">
                    discord
                  </a>
                </TronSoundLink>
                <span className="text-wrapper-23"> or email </span>
                <TronSoundLink>
                  <a href="mailto:hello@stackblitz.com" className="text-wrapper-24">
                    hello@stackblitz.com
                  </a>
                </TronSoundLink>
                <span className="text-wrapper-23">. we're here to assist.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
