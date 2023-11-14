import React, { createContext, useState, useContext } from "react";

const QuizContext = createContext();

export const useRaces = () => useContext(QuizContext);

export const QuizProvider = ({ children }) => {
  const [quiz, setQuiz] = useState([]);

  // Add functions to modify races here
  const getQuizFromService = async () => {};

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
