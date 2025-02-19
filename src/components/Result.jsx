
const Result = ({ score, total, onRetake }) => {
  return (
    <div className="result">
      <h2>
        Your Score: {score} out of {total}
      </h2>
      <button onClick={onRetake}>Retake Quiz</button>
    </div>
  );
};

export default Result;
