const addBoxButton = document.getElementById("togglerulebook");
const hiddenBox = document.querySelector(".rulebook.hidden");
const crossbtn = document.getElementById("cross");

const addBoxButton1 = document.getElementById("addBox");
const hiddenBox1 = document.querySelector(".sub-box.hidden");

const choices = ["rock", "paper", "scissors"];
const buttons = document.querySelectorAll(".number");
const result = document.getElementById("yourchoice");
const mainElement = document.querySelector(".main");

///score changer
let savedCompsScore = localStorage.getItem("compsScore");
let savedUsersScore = localStorage.getItem("usersScore");

let comps = document.getElementById("scorecomp");
let users = document.getElementById("scoreuser");

//toggle hiding of mumma and resgen circles
const hidemumma = document.querySelector(".mumma");
const hideaddbox = document.querySelector(".addBox");
const statusbar = document.getElementById("status");
const hidemainresbox = document.querySelector(".mainresbox");

//toggle rulebook
addBoxButton.addEventListener("click", () => {
  if (hiddenBox.classList.contains("hidden")) {
    hiddenBox.classList.remove("hidden");
  } else {
    hiddenBox.classList.add("hidden");
  }
  //Cross btn action to close rulesbook
  crossbtn.addEventListener("click", function () {
    hiddenBox.classList.add("hidden");
  });
});

//result generator
buttons.forEach((button) => {
  button.addEventListener("click", playGame);
  button.addEventListener("click", function () {
    const backgroundValue =
      getComputedStyle(button).getPropertyValue("background-image");
    const borderColor =
      getComputedStyle(button).getPropertyValue("border-color");

    mainElement.style.backgroundImage = backgroundValue;
    mainElement.style.borderColor = borderColor;
    hidemumma.style.display = "none";
    hideaddbox.style.display = "flex";
    hidemainresbox.style.display = "block";
  });
});

function playGame(event) {
  const playerChoice = event.target.id;
  const computerChoice = choices[Math.floor(Math.random() * 3)];
  const winner = getWinner(playerChoice, computerChoice);
  const secondPulse = document.querySelector(".twopulse");
  const firstPulse = document.querySelector(".onepulse");

  statusbar.textContent = `${winner} `;

  const mainTwoElement = document.querySelector(".main.two");

  switch (computerChoice) {
    case "rock":
      mainTwoElement.style.backgroundImage = "var(--rock)";
      mainTwoElement.style.borderColor = "var(--bx1)";
      break;
    case "paper":
      mainTwoElement.style.backgroundImage = "var(--paper)";
      mainTwoElement.style.borderColor = "var(--bx3)";
      break;
    case "scissors":
      mainTwoElement.style.backgroundImage = "var(--scissors)";
      mainTwoElement.style.borderColor = "var(--bx2)";
      break;
    default:
      break;
  }

  // Update scores and store them in localStorage
  if (winner === "YOU WIN") {
    users.textContent = parseInt(users.textContent) + 1;
    localStorage.setItem("usersScore", users.textContent);
  } else if (winner === "YOU LOST") {
    comps.textContent = parseInt(comps.textContent) + 1;
    localStorage.setItem("compsScore", comps.textContent);
  }

  // Show the "Next" button only if the user's score is higher than the computer's
  if (parseInt(users.textContent) > parseInt(comps.textContent)) {
    hiddenBox1.classList.remove("hidden");
  } else {
    hiddenBox1.classList.add("hidden");
  }

  if (winner === "YOU WIN") {
    toggleAnimation(firstPulse);
  } else if (winner === "YOU LOST") {
    toggleAnimation(secondPulse);
  } else {
    toggleAnimation(firstPulse);
    toggleAnimation(secondPulse);
  }

  function toggleAnimation(pulseElement) {
    console.log("toggled");
    pulseElement.classList.toggle("animate");
  }
}

// Play Again logic for the "Next" button
addBoxButton1.addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  // Hide the "Next" button
  hiddenBox1.classList.add("hidden");

  mainElement.style.backgroundImage = "";
  mainElement.style.borderColor = "";

  const firstPulse = document.querySelector(".onepulse");
  const secondPulse = document.querySelector(".twopulse");
  firstPulse.classList.remove("animate");
  secondPulse.classList.remove("animate");

  hidemumma.style.display = "block";
  hidemainresbox.style.display = "none";
}

function getWinner(player, computer) {
  if (player === computer) {
    return "TIE UP";
  } else if (
    (player === "rock" && computer === "scissors") ||
    (player === "paper" && computer === "rock") ||
    (player === "scissors" && computer === "paper")
  ) {
    return "YOU WIN";
  } else {
    return "YOU LOST";
  }
}
