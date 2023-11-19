import React, { useState, useEffect } from "react";
import DriverService from "../../services/DriverService";

function EditDriver({ driverId }) {
  const [driver, setDriver] = useState(null);
  const [updatedDriverName, setUpdatedDriverName] = useState("");
  const [updatedDriverAge, setUpdatedDriverAge] = useState("");
  const [updatedDriverNationality, setUpdatedDriverNationality] = useState("");
  const [updatedDriverImage, setUpdatedDriverImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchDriver = async () => {
      if (driverId) {
        try {
          const fetchedDriver = await DriverService.getDriverById(driverId);
          setDriver(fetchedDriver);
          setUpdatedDriverName(fetchedDriver?.name || "");
          setUpdatedDriverAge(fetchedDriver?.age || "");
          setUpdatedDriverNationality(fetchedDriver?.nationality || "");
          setUpdatedDriverImage(fetchedDriver?.image || null);
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
        const updatedDriver = {
          ...driver,
          name: updatedDriverName,
          age: updatedDriverAge,
          nationality: updatedDriverNationality,
          image: updatedDriverImage,
        };
        await DriverService.putDriver(driver.id, updatedDriver);
      } else {
        console.error("Driver or driver ID is invalid.");
      }
    } catch (error) {
      console.error("Error updating driver:", error);
    }
  };

  const handleChange = (e) => {
    const selectedImage = e.target.files[0];

    if (selectedImage) {
      setUpdatedDriverImage(selectedImage);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };

      reader.readAsDataURL(selectedImage);
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
          <p>
            Current Driver Name:
            {driver.name || "N/A"}
          </p>
          <p>
            Current Driver Age:
            {driver.age || "N/A"}
          </p>
          <p>
            Current Driver Nationality:
            {driver.nationality || "N/A"}
          </p>
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
          <label>
            Updated Age:
            <input
              type="text"
              value={updatedDriverAge}
              onChange={(e) => setUpdatedDriverAge(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Updated Nationality:
            <input
              type="text"
              value={updatedDriverNationality}
              onChange={(e) => setUpdatedDriverNationality(e.target.value)}
            />
          </label>
          <br />
          <br />
          <label>
            Updated Image:{" "}
            <input name="image" onChange={handleChange} type="file" />
          </label>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{ width: "100px", height: "100px" }}
            />
          )}
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
