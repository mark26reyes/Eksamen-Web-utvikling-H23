import React, { useEffect, useState } from "react";
import { useQuiz } from "../../contexts/QuizContext";
import QuizService from "../../services/QuizService";

// Funksjonell komponent for selve quiz-spillet
function Quiz() {
  // Henter nødvendige tilstander og funksjoner fra QuizContext ved hjelp av useQuiz-hook
  const {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    score,
    setScore,
    isQuizFinished,
    setIsQuizFinished,
  } = useQuiz();

  // Tilstander for quiz-data og høyeste poengsum
  const [questions, setQuestions] = useState([]);
  const [highScore, setHighScore] = useState(0);

  // Effekt som kjører ved komponentens lasting
  useEffect(() => {
    // Henter lagret høyeste poengsum fra lokal lagring
    const storedHighScore = localStorage.getItem("highScore");
    if (storedHighScore) {
      setHighScore(parseInt(storedHighScore));
    }

    // Last inn quiz-data fra QuizService ved hjelp av asynkron funksjon
    const loadQuizData = async () => {
      const drivers = await QuizService.getAllDrivers();
      const races = await QuizService.getAllRaces();
      const teams = await QuizService.getAllTeams();
      const generatedQuestions = generateQuestions(drivers, races, teams);
      setQuestions(generatedQuestions);
    };

    // Kaller loadQuizData-funksjonen når komponenten lastes
    loadQuizData();
  }, []);

  // Funksjon for å generere spørsmål basert på sjåfører, løp og lag
  const generateQuestions = (drivers, races, teams) => {
    // Sjekker om det er nok data for å generere spørsmål
    if (!drivers.length || !races.length || !teams.length) {
      return [];
    }

    // Genererer spørsmål om løp basert på vinnerne
    const raceQuestions = races.map((race) => {
      const options = new Set(
        shuffleArray(drivers.map((driver) => driver.name)).slice(0, 3)
      );
      options.add(race.winnerName); // Sørger for at riktig svar er inkludert
      return {
        question: `Who won the ${race.grandPrix}?`,
        options: shuffleArray(Array.from(options)),
        answer: race.winnerName,
      };
    });

    // Genererer spørsmål om nasjonaliteten til sjåfører
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

    // Genererer spørsmål om hvilke sjåfører som tilhører et lag
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

    // Returnerer en blanding av alle typer spørsmål
    return shuffleArray([
      ...raceQuestions,
      ...driverNationalityQuestions.map((question) => ({
        ...question,
        options: Array.from(question.options),
      })),
      ...teamQuestions,
    ]);
  };

  // Håndterer knappetrykk for svaralternativer
  const handleAnswerButtonClick = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    let isCorrect = false;

    // For lag-spørsmål, sjekk om det valgte alternativet er en av de riktige svarene
    if (Array.isArray(currentQuestion.answer)) {
      isCorrect = currentQuestion.answer.includes(selectedOption);
    } else {
      // For andre spørsmål, sjekk om det valgte alternativet samsvarer med svaret
      isCorrect = selectedOption === currentQuestion.answer;
    }

    // Oppdaterer poengsum og høyeste poengsum hvis svaret er riktig
    if (isCorrect) {
      const newScore = score + 1;
      setScore(newScore);

      if (newScore > highScore) {
        setHighScore(newScore);
        localStorage.setItem("highScore", newScore.toString());
      }
    }

    // Går til neste spørsmål eller markerer at quizen er ferdig hvis det ikke er flere spørsmål
    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
    } else {
      setIsQuizFinished(true);
    }
  };

  // Viser resultatet når quizen er ferdig
  if (isQuizFinished) {
    return (
      <div className="score-section">
        <div>Your Score: {score}</div>
        <div>High Score: {highScore}</div>
      </div>
    );
  }

  // Hjelpefunksjon for å blande rekkefølgen på et array
  function shuffleArray(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  // Hjelpefunksjon for å generere tilfeldige nasjonaliteter ekskludert en gitt nasjonalitet
  function randomNationalities(drivers, excludeNationality) {
    return shuffleArray(
      drivers
        .filter((driver) => driver.nationality !== excludeNationality)
        .map((driver) => driver.nationality)
    ).slice(0, 3);
  }

  // JSX for visning av spørsmål og svaralternativer
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
          <button
            className="btn bg-dark text-light rounded m-2"
            key={index}
            onClick={() => handleAnswerButtonClick(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Quiz;
