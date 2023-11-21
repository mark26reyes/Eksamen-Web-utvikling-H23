import React, { useState } from "react";

const questions = [
  {
    questionText: "Who won the Singapore Grand Prix in 2023?",
    answerOptions: [
      { answerText: "Lewis Hamilton", isCorrect: false },
      { answerText: "Max Verstappen", isCorrect: false },
      { answerText: "Sebastian Vettel", isCorrect: false },
      { answerText: "Daniel Ricciardo", isCorrect: true },
    ],
  },
  {
    questionText: "Which type of tire is considered best for short races?",
    answerOptions: [
      { answerText: "Soft", isCorrect: true },
      { answerText: "Medium", isCorrect: false },
      { answerText: "Hard", isCorrect: false },
      { answerText: "Intermediate", isCorrect: false },
    ],
  },
  {
    questionText: "What is the record for the fastest pitstop in Formula 1?",
    answerOptions: [
      { answerText: "1.82 seconds", isCorrect: false },
      { answerText: "2.31 seconds", isCorrect: false },
      { answerText: "2.02 seconds", isCorrect: true },
      { answerText: "2.57 seconds", isCorrect: false },
    ],
  },
  {
    questionText:
      "Which team did Fernando Alonso drive for before joining Aston Martin?",
    answerOptions: [
      { answerText: "Mercedes", isCorrect: false },
      { answerText: "Ferrari", isCorrect: true },
      { answerText: "Red Bull Racing", isCorrect: false },
      { answerText: "McLaren", isCorrect: false },
    ],
  },
  {
    questionText:
      "Who holds the record for the most Grand Prix wins in a single season?",
    answerOptions: [
      { answerText: "Michael Schumacher", isCorrect: false },
      { answerText: "Lewis Hamilton", isCorrect: true },
      { answerText: "Ayrton Senna", isCorrect: false },
      { answerText: "Sebastian Vettel", isCorrect: false },
    ],
  },
  {
    questionText: "In which year did Formula 1 introduce hybrid power units?",
    answerOptions: [
      { answerText: "2005", isCorrect: false },
      { answerText: "2010", isCorrect: false },
      { answerText: "2014", isCorrect: true },
      { answerText: "2000", isCorrect: false },
    ],
  },
  {
    questionText: "Who is known as the 'Flying Finn' in Formula 1?",
    answerOptions: [
      { answerText: "Kimi Räikkönen", isCorrect: true },
      { answerText: "Valtteri Bottas", isCorrect: false },
      { answerText: "Mika Häkkinen", isCorrect: false },
      { answerText: "Keke Rosberg", isCorrect: false },
    ],
  },
  {
    questionText: "Which Grand Prix is held at the Circuit de Monaco?",
    answerOptions: [
      { answerText: "Monaco Grand Prix", isCorrect: true },
      { answerText: "Italian Grand Prix", isCorrect: false },
      { answerText: "British Grand Prix", isCorrect: false },
      { answerText: "Canadian Grand Prix", isCorrect: false },
    ],
  },
  {
    questionText: "How many world championships did Juan Manuel Fangio win?",
    answerOptions: [
      { answerText: "4", isCorrect: false },
      { answerText: "5", isCorrect: true },
      { answerText: "3", isCorrect: false },
      { answerText: "6", isCorrect: false },
    ],
  },
  {
    questionText: "Which team is known as the 'Prancing Horse' in Formula 1?",
    answerOptions: [
      { answerText: "Red Bull Racing", isCorrect: false },
      { answerText: "Ferrari", isCorrect: true },
      { answerText: "Mercedes", isCorrect: false },
      { answerText: "McLaren", isCorrect: false },
    ],
  },
  {
    questionText:
      "Who holds the record for the most pole positions in Formula 1?",
    answerOptions: [
      { answerText: "Ayrton Senna", isCorrect: false },
      { answerText: "Lewis Hamilton", isCorrect: true },
      { answerText: "Michael Schumacher", isCorrect: false },
      { answerText: "Sebastian Vettel", isCorrect: false },
    ],
  },
];

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="quiz">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerButtonClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Quiz;
