import React, { useEffect } from "react";

const QuizTimer = ({ timeLeft, setTimeLeft ,quizStarted}) => {
  useEffect(() => {
    let timer;
    if (quizStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, timeLeft]);

  return (
    <div className="quiz__timer">
     { timeLeft+ " sec"}
    </div>
  );
};

export default QuizTimer;
