import React, { useEffect, useState } from "react";
import { useQuiz } from "../../contexts/QuizContext";
import QuizService from "../../services/QuizService";

function Quiz() {
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    isQuizFinished,
    setIsQuizFinished,
  } = useQuiz();

  const [questions, setQuestions] = useState([]);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }

    const loadQuizData = async () => {
      const drivers = await QuizService.getAllDrivers();
      const races = await QuizService.getAllRaces();
      const teams = await QuizService.getAllTeams();
      const generatedQuestions = generateQuestions(drivers, races, teams);
      setQuestions(generatedQuestions);
    };

    loadQuizData();
  }, []);

  const generateQuestions = (drivers, races, teams) => {
    if (!drivers.length || !races.length || !teams.length) {
      return [];
    }

    const raceQuestions = races.map((race) => {
      const options = new Set(
        shuffleArray(drivers.map((driver) => driver.name)).slice(0, 3)
      );
      options.add(race.winnerName); // Ensure correct answer is included
      return {
        question: `Who won the ${race.grandPrix}?`,
        options: shuffleArray(Array.from(options)),
        answer: race.winnerName,
      };
    });

    const driverNationalityQuestions = drivers.map((driver) => ({
      question: `What is the nationality of ${driver.name}?`,
      options: new Set(
        shuffleArray([
          driver.nationality,
          ...randomNationalities(drivers, driver.nationality),
        ])
      ),
      answer: driver.nationality,
    }));

    const teamQuestions = teams.map((team) => {
      const teamDriverNames = [team.driverName, team.driverName2];
      const otherDrivers = shuffleArray(
        drivers.filter((driver) => !teamDriverNames.includes(driver.name))
      ).slice(0, 2);
      const options = shuffleArray([
        ...teamDriverNames,
        ...otherDrivers.map((driver) => driver.name),
      ]);
      return {
        question: `Which drivers are part of the ${team.manufacturer} team?`,
        options,
        answer: teamDriverNames,
      };
    });

    return shuffleArray([
      ...raceQuestions,
      ...driverNationalityQuestions.map((question) => ({
        ...question,
        options: Array.from(question.options),
      })),
      ...teamQuestions,
    ]);
  };

  const handleAnswerButtonClick = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    // For team questions, check if the selected option is one of the correct answers
    if (Array.isArray(currentQuestion.answer)) {
      isCorrect = currentQuestion.answer.includes(selectedOption);
    } else {
      // For other questions, check if the selected option matches the answer
      isCorrect = selectedOption === currentQuestion.answer;
    }

    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore.toString());
      }
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished) {
    return (
      <div className="score-section">
        <div>Your Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
    );
  }

  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  function randomNationalities(drivers, excludeNationality) {
    return shuffleArray(
      drivers
        .filter((driver) => driver.nationality !== excludeNationality)
        .map((driver) => driver.nationality)
    ).slice(0, 3);
  }

  return (
    <div className="quiz">
      <div className="question-section">
        <div className="question-count">
          <span>Question {currentQuestionIndex + 1}</span>/{questions.length}
        </div>
        <div className="question-text">
          {questions[currentQuestionIndex]?.question}
        </div>
      </div>
      <div className="answer-section">
        {questions[currentQuestionIndex]?.options.map((option, index) => (
          <button key={index} onClick={() => handleAnswerButtonClick(option)}>
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;

