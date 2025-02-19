import React from "react";

const Question = ({ question, index, answer, onAnswerChange, disabled }) => {
  return (
    <div className="quiz-container">
      <h3 className="quiz-question">{question.question}</h3>

      {question.type === "multiple-choice" && (
        <div className="quiz-options">
          {question.options.map((option, i) => (
            <label
              key={i}
              className={`quiz-item ${
                answer === option.charAt(0) ? "selected" : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={option.charAt(0)}
                checked={answer === option.charAt(0)}
                onChange={() => onAnswerChange(index, option.charAt(0))}
                disabled={disabled}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === "integer" && (
        <div className="quiz-option">
          <input
            type="number"
            value={answer || ""}
            onChange={(e) => onAnswerChange(index, parseInt(e.target.value))}
            disabled={disabled}
            className="quiz-input"
          />
        </div>
      )}
    </div>
  );
};

export default Question;
