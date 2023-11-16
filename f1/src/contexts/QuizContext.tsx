import React, { createContext, useState, useContext, ReactNode } from "react";

// Assuming you have a type for Quiz, import or define it here
// import { Quiz } from './path-to-quiz-type';

interface QuizContextType {
  quiz: any[]; // Replace 'any' with your Quiz type if available
  setQuiz: React.Dispatch<React.SetStateAction<any[]>>; // Use the same type as for quiz
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
}

export const useRaces = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useRaces must be used within a QuizProvider');
  }
  return context;
};

export const QuizProvider: React.FC<QuizProviderProps> = ({ children }) => {
  const [quiz, setQuiz] = useState<any[]>([]); // Replace 'any' with your Quiz type if available

  // Add functions to modify races here
  const getQuizFromService = async () => {
    // Implementation
  };

  return (
    <QuizContext.Provider value={{ quiz, setQuiz }}>
      {children}
    </QuizContext.Provider>
  );
};
