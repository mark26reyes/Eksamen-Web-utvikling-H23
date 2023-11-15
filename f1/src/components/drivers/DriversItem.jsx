const DriversItem = ({ name, image }) => {
  return (
    <section>
      <h3>{name}</h3>
      <img src={`http://localhost:5008/${image}`} alt="Bilde av drivers" />
    </section>
  );
};

export default DriversItem;
