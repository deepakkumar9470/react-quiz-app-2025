import React, { useState, useEffect } from "react";
import QuizTimer from "./QuizTimer";
import Question from "./Question";
import Result from "./Result";
import { dummyquestions } from "../data/question-data";
import { getAllAttempts, saveAttempt } from "../utils/indexedDB";

const QuizQuestions = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [quizStarted, setQuizStarted] = useState(false);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers({
      ...answers,
      [questionIndex]: value,
    });
  };

  const handleNextQuestion = () => {
    if (currentIndex < dummyquestions?.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setTimeLeft(30);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    let newScore = 0;
    dummyquestions?.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);

    // saving to indexdb
    const attemptData = {
      timestamp: new Date().toISOString(),
      score: newScore,
      answers,
    };
    await saveAttempt(attemptData);
  };

  const handleRetakeQuiz = () => {
    setAnswers({});
    setSubmitted(false);
    setScore(0);
    setCurrentIndex(0);
    setTimeLeft(30);
    setQuizStarted(false);
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  const handleTimeout = () => {
    handleNextQuestion();
  };

  useEffect(() => {
    setTimeLeft(30);
  }, [currentIndex]);

  useEffect(() => {
    const loadHistory = async () => {
      const attempts = await getAllAttempts();
    };
    loadHistory();
  }, []);
  return (
    <div className="quiz__container">
      <h1 className="quiz__title">Please give answer within 30 seconds</h1>
      {quizStarted && (
        <QuizTimer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          quizStarted={quizStarted}
        />
      )}
      {!quizStarted ? (
        <button className="start_btn" onClick={handleStartQuiz}>
          Start Quiz
        </button>
      ) : (
        <>
          {!submitted && (
            <div>
              <Question
                question={dummyquestions[currentIndex]}
                index={currentIndex}
                answer={answers[currentIndex]}
                onAnswerChange={handleAnswerChange}
                disabled={false}
              />
              <button className="quiz__button" onClick={handleNextQuestion}>
                Next
              </button>
            </div>
          )}

          {submitted && (
            <Result
              score={score}
              total={dummyquestions?.length}
              onRetake={handleRetakeQuiz}
            />
          )}
        </>
      )}
    </div>
  );
};

export default QuizQuestions;
