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
    // Load high score from localStorage on component mount
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

    // Questions about race winners
    const raceQuestions = races.map((race) => {
      let options = shuffleArray(drivers.map((driver) => driver.name)).slice(
        0,
        3
      );
      if (!options.includes(race.winnerName)) {
        options[2] = race.winnerName; // Ensure correct answer is included
      }
      return {
        question: `Who won the ${race.grandPrix}?`,
        options: shuffleArray([...options, race.winnerName]),
        answer: race.winnerName,
      };
    });

    // Questions about driver nationalities
    const driverNationalityQuestions = drivers.map((driver) => ({
      question: `What is the nationality of ${driver.name}?`,
      options: shuffleArray([
        driver.nationality,
        ...randomNationalities(drivers, driver.nationality),
      ]),
      answer: driver.nationality,
    }));

    // Questions about team drivers
    const teamQuestions = teams.map((team) => {
      const teamDriverNames = [team.driverName, team.driverName2];
      const otherDrivers = drivers.filter(
        (driver) => !teamDriverNames.includes(driver.name)
      );
      const randomOtherDrivers = shuffleArray(otherDrivers).slice(0, 2);
      const options = shuffleArray([
        ...teamDriverNames,
        ...randomOtherDrivers.map((driver) => driver.name),
      ]);
      return {
        question: `Which drivers are part of the ${team.manufacturer} team?`,
        options,
        answer: teamDriverNames.join(" and "),
      };
    });

    // Combine all questions and shuffle them
    return shuffleArray([
      ...raceQuestions,
      ...driverNationalityQuestions,
      ...teamQuestions,
    ]);
  };

  const handleAnswerButtonClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestionIndex].answer) {
      const newScore = score + 1;
      setScore(newScore);

      // Update high score and save to localStorage if it's a new high score
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

// Helper functions
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

export default Quiz;
