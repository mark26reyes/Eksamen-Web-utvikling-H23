import React, { useState, useEffect } from "react";
import DriverService from "../../services/DriverService";

function EditDriver({ driverId }) {
  const [driver, setDriver] = useState(null);
  const [updatedDriverName, setUpdatedDriverName] = useState("");

  useEffect(() => {
    const fetchDriver = async () => {
      if (driverId) {
        try {
          const fetchedDriver = await DriverService.getDriverById(driverId);
          setDriver(fetchedDriver);
          setUpdatedDriverName(fetchedDriver?.name || "");
        } catch (error) {
          console.error("Error fetching driver:", error);
        }
      }
    };

    fetchDriver();
  }, [driverId]);

  const handleUpdate = async () => {
    try {
      if (driver && driver.id) {
        const updatedDriver = { ...driver, name: updatedDriverName };
        await DriverService.putDriver(driver.id, updatedDriver);
      } else {
        console.error("Driver or driver ID is invalid.");
      }
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  if (!driver) {
    return <div>Loading...</div>;
  }

  return (
    <section>
      <h2>Edit Driver</h2>
      {driver && (
        <>
          <p>Current Driver Name: {driver.name || "N/A"}</p>
          <label>
            Updated Name:
            <input
              type="text"
              value={updatedDriverName}
              onChange={(e) => setUpdatedDriverName(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button onClick={handleUpdate} className="rounded border-dark shadow">
            Update Driver
          </button>
        </>
      )}
    </section>
  );
}

export default EditDriver;
