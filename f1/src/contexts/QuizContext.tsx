import React, { createContext, useState, useContext } from "react";
import { IQuiz } from "../interfaces/IQuiz";

// Opprettelse av en kontekst for Quiz med startverdi undefined
const QuizContext = createContext<IQuiz | undefined>(undefined);

export const useQuiz = () => {
  // Bruker useContext-hook for å hente verdien fra QuizContext
  const context = useContext(QuizContext);
  // Kaster en feil hvis useQuiz brukes utenfor en QuizProvider
  if (!context) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
};

// Provider-komponent for Quiz som gir tilgang til kontekstverdier for komponentene i treet
export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // Tilstand (state) for nåværende spørsmålindeks, poeng og quiz-status
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Returnerer Provider-komponenten for Quiz med kontekstverdier
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
