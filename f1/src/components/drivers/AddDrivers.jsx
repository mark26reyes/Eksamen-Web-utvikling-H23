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
    <form onSubmit={handleSubmit}>
      <label>
        Driver Name:
        <input
          type="text"
          value={driverName}
          onChange={(e) => setDriverName(e.target.value)}
        />
      </label>
      <button type="submit">Add Driver</button>
    </form>
  );
}

export default AddDrivers;
