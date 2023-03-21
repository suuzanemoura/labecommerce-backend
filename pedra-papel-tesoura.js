const query = process.argv[2].toLowerCase();

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComputerResult() {
  const randomNumber = getRndInteger(1, 3);

  switch (randomNumber) {
    case 1:
      return "pedra";
    case 2:
      return "papel";
    case 3:
      return "tesoura";
  }
}

function getResult(userChoice, computerChoice) {
  return userChoice === computerChoice
    ? `Você escolheu ${userChoice} e o computador escolheu ${computerChoice}. Empate!`
    : (computerChoice === "pedra" && userChoice === "tesoura") ||
      (computerChoice === "papel" && userChoice === "pedra") ||
      (computerChoice === "tesoura" && userChoice === "papel")
    ? `Você escolheu ${userChoice} e o computador escolheu ${computerChoice}. Você perdeu!`
    : `Você escolheu ${userChoice} e o computador escolheu ${computerChoice}. Você ganhou!`;
}

if (!query) {
  console.log(
    "Faltou o argumento esperado: escolher entre pedra, papel e tesoura."
  );
} else {
  console.log(getResult(query, getComputerResult()));
}
