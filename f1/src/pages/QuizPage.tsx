// Importerer Quiz-komponenten
import Quiz from "../components/quiz/Quiz";

// Funksjonell komponent som representerer siden for F1 Quiz
const QuizPage = () => {
  return (
    <>
      <section className="container">
        <br />
        <br />
        <h3 className="border-bottom border-dark pt-5 pb-5 f1-black-font fs-1">
          F1 Quiz
        </h3>
        {/* Inkluderer Quiz-komponenten */}
        <Quiz />
      </section>
      <br />
      <img
        src="/public/pitstop.jpg"
        width={"100%"}
        alt="Bilde av redbull bil"
        className="img-fluid mx-auto d-block pt-5"
      />
    </>
  );
};

export default QuizPage;
