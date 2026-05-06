console.log("Hello, World!");

const teraz = new Date();
console.log("Data i czas:", teraz.toLocaleString());

const imie = process.argv[2];

if (imie) {
  console.log(`Cześć, ${imie}!`);
} else {
  console.log("Nie podano imienia.");
}