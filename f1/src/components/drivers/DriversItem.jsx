const DriversItem = ({ name, age, image }) => {
  return (
    <section>
      <h3>{name}</h3>
      <p>{age}</p>
      <img src={`http://localhost:5008/${image}`} alt="Bilde av drivers" />
    </section>
  );
};

export default DriversItem;
