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
        <h1 className="border-bottom border-dark pb-4">Quiz</h1>
        <Quiz />
      </section>
    </>
  );
};

export default QuizPage;
