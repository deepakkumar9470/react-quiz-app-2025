import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import Loader from "./components/Loader";
const Hero = React.lazy(() => import("./components/Hero"));
const QuizQuestions = React.lazy(() => import("./components/QuizQuestions"));
const ResultPage = React.lazy(() => import("./components/Result"));
const Header = React.lazy(() => import("./components/Header"));
const App = () => {
  return (
    <>
      <Suspense fallback={<Loader/>}>
        <Header />
        <div className="main">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/quiz" element={<QuizQuestions />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
};

export default App;
