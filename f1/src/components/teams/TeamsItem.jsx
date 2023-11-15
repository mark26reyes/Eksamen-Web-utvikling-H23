const TeamsItem = ({ manufactur, image, driverName, driverName2 }) => {
  return (
    <section>
      <h3>{manufactur}</h3>
      <img
        src={`http://localhost:5008${image}`}
        width={"400px"}
        alt="Bilde av teams"
      />
      <p>{driverName}</p>
      <p>{driverName2}</p>
    </section>
  );
};

export default TeamsItem;
