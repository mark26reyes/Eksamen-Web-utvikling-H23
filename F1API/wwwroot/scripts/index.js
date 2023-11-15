const outputSection = document.querySelector("#output-section");
const getAllDriversBtn = document.querySelector("#get-all-drivers-btn");
const getDriverByIdBtn = document.querySelector("#get-driver-by-id-btn");
const postDriverBtn = document.querySelector("#post-driver-btn");
const deleteDriverBtn = document.querySelector("#delete-driver-btn");
const editDriverBtn = document.querySelector("#edit-driver-btn");

// Http funskjoner
const getAllDrivers = async () => {
  try {
    const result = await axios.get("http://localhost:5008/api/drivers");
    showDrivers(result.data);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

const getDriverById = async () => {

};

const postDriver = async () => {

};

const deleteDriver = async () => {
 
};

const editDriver = async () => {
 
};


  //Output funksjoner

const showDrivers = (driverArray) => {
  driverArray.forEach((driver) => {
    showDriver(driver);
  });
};

const showDriver = (driver) => {
  let lastName = driver.name.split(" ").pop().toLowerCase();
  let imageUrl = `http://localhost:5008/images/${lastName}.png`;

  let htmlTxt = `
        <article>
            <h3>${driver.name} (${driver.age}, ${driver.nationality})</h3>
            <img src="${imageUrl}" alt="Image of ${driver.name}">
        </article>
    `;
  outputSection.innerHTML += htmlTxt;
};


const clearOutput = () => {
  outputSection.innerHTML = "";
};

//Event lyttere

getAllDriversBtn.addEventListener("click", () => {
  clearOutput();
  getAllDrivers();
});

getDriverByIdBtn.addEventListener("click", () => {
  clearOutput();
  getDriverById();
});

postDriverBtn.addEventListener("click", () => {
  clearOutput();
  postDriver();
});

deleteDriverBtn.addEventListener("click", () => {
  clearOutput();
  deleteDriver();
});

editDriverBtn.addEventListener("click", () => {
  clearOutput();
  editDriver();
});
