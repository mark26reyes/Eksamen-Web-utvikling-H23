const RacesItem = ({ winnerName, winnerTime, grandPrix, numberOfLaps }) => {
  return (
    <section>
      <h3>{grandPrix}</h3>
      <p>Winner Name: {winnerName}</p>
      <p>Winner Time: {winnerTime}</p>
      <p>Number of Laps: {numberOfLaps}</p>
    </section>
  );
};

export default RacesItem;
