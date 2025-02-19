import React from "react";
import quizLogo from "../assets/quiz.png";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <header className="header">
      <Link to="/">
        <div className="logo">
          <img src={quizLogo} alt="quiz-logo" />
        </div>
      </Link>
    </header>
  );
};

export default Header;
