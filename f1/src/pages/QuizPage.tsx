import Quiz from "../components/quiz/Quiz";

const QuizPage = () => {
  return (
    <>
      <img
        src="/public/pitstop.jpg"
        width={"100%"}
        alt="Bilde av redbull bil"
        className="img-fluid mx-auto d-block"
      />
      <section className="container">
        <br />
        <br />
        <h3 className="border-bottom border-dark pb-4 f1-black-font fs-1">
          F1 Quiz
        </h3>
        <Quiz />
      </section>
    </>
  );
};

export default QuizPage;
