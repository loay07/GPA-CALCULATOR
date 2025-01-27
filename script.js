const addRow = document.querySelector(".add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const gpaText = document.querySelector(".gpa-text");
//array of objects for the grades
const AmericanGrades = [
  { grade: "A+", gpa: 4.0 },
  { grade: "A", gpa: 4.0 },
  { grade: "A-", gpa: 3.7 },
  { grade: "B+", gpa: 3.3 },
  { grade: "B", gpa: 3.0 },
  { grade: "B-", gpa: 2.7 },
  { grade: "C+", gpa: 2.3 },
  { grade: "C", gpa: 2.0 },
  { grade: "C-", gpa: 1.7 },
  { grade: "D+", gpa: 1.3 },
  { grade: "D", gpa: 1.0 },
  { grade: "F", gpa: 0.0 },
];
const GermanGrades = [
  { grade: "A+", gpa: 0.7 },
  { grade: "A", gpa: 1 },
  { grade: "A-", gpa: 1.3 },
  { grade: "B+", gpa: 1.7 },
  { grade: "B", gpa: 2 },
  { grade: "B-", gpa: 2.3 },
  { grade: "C+", gpa: 2.7 },
  { grade: "C", gpa: 3 },
  { grade: "C-", gpa: 3.3 },
  { grade: "D+", gpa: 3.7 },
  { grade: "D", gpa: 4 },
  { grade: "F", gpa: 5 },
];
//function to choose grade
let currentSystem = AmericanGrades;
const options = document.querySelectorAll(".option");

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    let chosenOption = e.target.id;
    if (chosenOption === "american") {
      currentSystem = AmericanGrades;
      currentSystemType.textContent = "AMERICAN";
      console.log(currentSystem);
    }
    if (chosenOption === "german") {
      currentSystem = GermanGrades;
      currentSystemType.textContent = "GERMAN";
      console.log(currentSystem);
    }
  });
});
//close custom
const closeCustom = document.querySelector(".close-options");
closeCustom.addEventListener("click", () => {
  customModal.classList.add("hidden");
  overlay.classList.add("hidden");
  for (let i = 0; i <= 11; i++) {
    let gr = document.getElementById(`${i}`);
    gr.style.background = "#baaeae";
    errorText.style.opacity = 0;
  }
});

//event listener for clicking on custom
const customModal = document.querySelector(".custom-option");
const custom = document.getElementById("custom");
const saveBtn = document.querySelector(".save");
const errorText = document.querySelector(".error");
const currentSystemText = document.querySelector(".current-system");
const currentSystemType = document.querySelector(".system-type");

let active = false;
custom.addEventListener("click", () => {
  customModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

saveBtn.addEventListener("click", () => {
  errorText.style.opacity = 0;
  let validInput = true;

  for (let i = 0; i <= 11; i++) {
    let gr = document.getElementById(`${i}`);
    if (gr.value === "" || isNaN(gr.value)) {
      validInput = false;
      gr.style.backgroundColor = "#ee7272";
      errorText.style.opacity = 1;
      currentSystem = AmericanGrades;
    } else {
      gr.style.backgroundColor = "#baaeae";
    }
  }
  let customGrades = [];
  if (validInput) {
    customGrades = [
      { grade: "A+", gpa: document.getElementById("0").value },
      { grade: "A", gpa: document.getElementById("1").value },
      { grade: "A-", gpa: document.getElementById("2").value },
      { grade: "B+", gpa: document.getElementById("3").value },
      { grade: "B", gpa: document.getElementById("4").value },
      { grade: "B-", gpa: document.getElementById("5").value },
      { grade: "C+", gpa: document.getElementById("6").value },
      { grade: "C", gpa: document.getElementById("7").value },
      { grade: "C-", gpa: document.getElementById("8").value },
      { grade: "D+", gpa: document.getElementById("9").value },
      { grade: "D", gpa: document.getElementById("10").value },
      { grade: "F", gpa: document.getElementById("11").value },
    ];
    currentSystem = customGrades;
    customModal.classList.add("hidden");
    overlay.classList.add("hidden");
    currentSystemType.textContent = " CUSTOM";
    console.log(currentSystem);
  }
});

// function to make extra div
const container = document.querySelector(".subject");
let subjects = 0;
addRow.addEventListener("click", function () {
  subjects++;
  const html = `  <div class="subject__row">
  <input class="subject__type" id="${subjects}-name" placeholder="Subject Name"  />
  <input class="subject__credit" id="${subjects}-cr" placeholder="Credit Hours" />
          <input class="dropbtn" id="${subjects}-grade" placeholder="Grade" />
          
          </div>`;
  container.insertAdjacentHTML("beforeend", html);
});
//function to remove div
const removeBtn = document.querySelector(".remove");

removeBtn.addEventListener("click", () => {
  const lastRow = container.lastElementChild;
  if (lastRow && subjects > 0) {
    subjects--;
    lastRow.remove();
  }
});

// function to take course details from each div and push into array
const calcBtn = document.querySelector(".calculate");

calcBtn.addEventListener("click", function () {
  let valid = true;
  let subjectDetails = [];
  gpaText.textContent = "";

  for (let i = 0; i <= subjects; i++) {
    let currentCR = parseFloat(document.getElementById(`${i}-cr`).value);
    let currentGrade = alterGrade(document.getElementById(`${i}-grade`).value);

    //check credit hours

    if (currentCR <= 0) {
      alert("Must enter valid credit hours");
      valid = false;
      break;
    }
    //check grade

    if (findGrade(currentGrade, currentSystem) === false) {
      alert("Must enter valid Grade");
      valid = false;
      break;
    }
    //check empty values

    if (!currentGrade || !currentCR) {
      alert("All fields must be filled!");
      valid = false;
      break;
    }

    //pushing values into array
    subjectDetails.push({
      creditHours: currentCR,
      GPA: findGrade(currentGrade, currentSystem),
    });
  }
  if (valid) {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
    gpaText.textContent = finalGPA(subjectDetails);
  }
});
//function to alter Grade into a valid one

const alterGrade = function (string) {
  return string.toUpperCase().split(/\s+/).join("");
};
//function to check grade
function findGrade(gr, array) {
  const found = array.find(({ grade }) => grade === gr);
  return found ? found.gpa : false;
}

// function to calculate gpa from array

function finalGPA(array) {
  let totalPoints = 0;
  let totalCR = 0;
  array.forEach((subject) => {
    totalPoints += subject.GPA * subject.creditHours;
    totalCR += subject.creditHours;
  });
  return (totalPoints / totalCR).toFixed(3);
}

/// clear button

const clearBtn = document.querySelector(".clear");

clearBtn.addEventListener("click", () => {
  for (let i = 0; i <= subjects; i++) {
    document.getElementById(`${i}-cr`).value = "";
    document.getElementById(`${i}-grade`).value = "";
    document.getElementById(`${i}-name`).value = "";
  }
});

//modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnCloseModal.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
});
