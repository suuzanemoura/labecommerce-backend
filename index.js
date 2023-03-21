console.log("O aplicativo foi iniciado!");

const query = process.argv[2];

if (!query) {
  console.log("Faltou o argumento esperado.");
} else {
  console.log(query);
}
