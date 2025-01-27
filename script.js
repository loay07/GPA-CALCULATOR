const addRow = document.querySelector(".add");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const gpaText = document.querySelector(".gpa-text");
//array of objects for the grades
const grades = [
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

// function to make extra div
const container = document.querySelector(".subject");
let subjects = 0;
addRow.addEventListener("click", function () {
  subjects++;
  const html = `  <div class="subject__row">
  <input class="subject__type" id="${subjects}-name" placeholder="Subject Name"  />
  <input class="subject__credit" id="${subjects}-cr" placeholder="Credit Hours" />
          <div class="dropdown">
          <input class="dropbtn" id="${subjects}-grade" placeholder="Grade" />
          
          </div>
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

    if (findGrade(currentGrade, grades) === false) {
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
      GPA: findGrade(currentGrade, grades),
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
