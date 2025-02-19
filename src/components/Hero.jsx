import React from "react";
import { Link } from "react-router-dom";
import QuizHistory from "./QuizHistory";

const Hero = () => {
  return (
    <div className="hero__container">
      <h1>Welcome to the Quiz Platform</h1>
      <Link className="start__button" to="/quiz">
        Start Quiz
      </Link>
      <QuizHistory />
    </div>
  );
};

export default Hero;
