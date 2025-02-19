import React, { useState, useEffect } from "react";
import { getAllAttempts } from "../utils/indexedDB";

const QuizHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const attempts = await getAllAttempts();
        setHistory(attempts);
      } catch (error) {
        throw new Error("oops history not found: " + error);
      }
    };
    loadHistory();
  }, []);
  return (
    <div className="history__container">
      {history?.length > 0 ? (
        history?.map((attempt, index) => (
          <div key={index} className="history-entry">
            <p>
              <strong>Attempt {index + 1}:</strong> Score: {attempt.score} (
              {new Date(attempt.timestamp).toLocaleString()})
            </p>
            <ul>
              {Object.entries(attempt.answers).map(
                ([questionIndex, answer]) => (
                  <li key={questionIndex}>
                    Question {parseInt(questionIndex) + 1}: {answer}
                  </li>
                )
              )}
            </ul>
          </div>
        ))
      ) : (
        <p>No quiz attempts recorded yet.</p>
      )}
    </div>
  );
};

export default QuizHistory;
