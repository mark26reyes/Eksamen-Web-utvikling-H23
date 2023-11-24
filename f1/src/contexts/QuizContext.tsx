import React, { createContext, useState, useContext } from "react";
import { IQuiz } from "../interfaces/IQuiz";

const QuizContext = createContext<IQuiz | undefined>(undefined);

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  return (
    <QuizContext.Provider
      value={{
        currentQuestionIndex,
        setCurrentQuestionIndex,
        score,
        setScore,
        isQuizFinished,
        setIsQuizFinished,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
