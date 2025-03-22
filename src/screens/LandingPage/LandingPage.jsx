import React from "react";
import { Container } from "./sections/Container";
import { FaqContainerWrapper } from "./sections/FaqContainerWrapper";
import { FrameWrapper } from "./sections/FrameWrapper";
import { JudgesContainerWrapper } from "./sections/JudgesContainerWrapper";
import { PageContainer } from "./sections/PageContainer";
import { PrizesContainer } from "./sections/PrizesContainer";
import "./style.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="centered-content">
        <PageContainer />
        <PrizesContainer />
        <Container />
        <JudgesContainerWrapper />
        <FaqContainerWrapper />
        <FrameWrapper />
      </div>
    </div>
  );
};
