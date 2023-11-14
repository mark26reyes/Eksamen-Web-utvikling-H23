import React, { useState } from "react";

function AddDrivers() {
  const [driverName, setDriverName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here
    console.log("New Driver Added:", driverName);
    setDriverName("");
  };

  return (
    <section>
      <h1>Register as new driver</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Team:
          <input type="text" name="" id="" />
        </label>
        <br />
        <br />
        <button type="submit">Add Driver</button>
      </form>
    </section>
  );
}

export default AddDrivers;
