const query = process.argv[2];
const number = Number(process.argv[3]);

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getEvenOrOdd() {
  switch (query) {
    case "par":
      return "impar";
    case "impar":
      return "par";
  }
}
const randomNumber = getRndInteger(1, 10);
const result = randomNumber + number;

function getResult() {
  if (result % 2 === 0) {
    return query === "par" ? "Você venceu!" : "Você perdeu!";
  } else {
    return query === "impar" ? "Você venceu!" : "Você perdeu!";
  }
}

if (!query || !number) {
  console.log(
    "Faltou o argumento esperado: escolher entre par/impar ou o número de 1-10."
  );
} else {
  console.log(
    `Você escolheu ${query} e o computador escolheu ${getEvenOrOdd()}. O resultado foi ${result}. ${getResult()}`
  );
}
