import React from "react";
import { Container } from "./sections/Container";
import { FaqContainerWrapper } from "./sections/FaqContainerWrapper";
import { FrameWrapper } from "./sections/FrameWrapper";
import { JudgesContainerWrapper } from "./sections/JudgesContainerWrapper";
import { PageContainer } from "./sections/PageContainer";
import { PrizesContainer } from "./sections/PrizesContainer";
import { LoadingAnimation } from "../../components/LoadingAnimation";
import { ThemeToggle } from "../../components/ThemeToggle";
import { CoordinateToggle } from "../../components/CoordinateToggle";
import "./style.css";

export const LandingPage = () => {
  return (
    <div className="landing-page">
      <LoadingAnimation />
      <ThemeToggle />
      <CoordinateToggle />
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
