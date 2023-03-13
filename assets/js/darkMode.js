


const darkModeIcon = document.getElementById("darkmode");
const bodyContainer = document.body;
const cardBody = document.querySelectorAll(".card-body");

loadMode();

function toggleDarkMode() {
  bodyContainer.classList.toggle("darkMode");
  cardBody.forEach((card) => card.classList.toggle("cardBody"));
  storeDarkmode(bodyContainer.classList.contains("darkMode"));
}

function loadMode() {
  let darkMode = localStorage.getItem("darkmode");

  if (!darkMode) {
    storeDarkmode(false);
  } else if (darkMode === "true") {
    bodyContainer.classList.add("darkMode");
    cardBody.forEach((card) => card.classList.add("cardBody"));
  }
}

function storeDarkmode(value) {
  localStorage.setItem("darkmode", value);
}



