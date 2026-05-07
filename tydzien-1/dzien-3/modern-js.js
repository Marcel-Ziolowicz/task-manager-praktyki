// ===== destrukturyzacja obiektu =====

const task = {
  id: 1,
  title: "Learn JS",
  done: true,
};

// wyciągamy wybrane pola do zmiennych
const { title, done } = task;

console.log(title);
console.log(done);


// ===== destrukturyzacja tablicy =====

const numbers = [10, 20, 30, 40];

// pierwszy element + reszta
const [first, ...rest] = numbers;

console.log(first);
console.log(rest);


// ===== spread - kopiowanie tablicy =====

const original = [1, 2, 3];

const copied = [...original];

console.log(copied);


// ===== spread - łączenie tablic =====

const arr1 = [1, 2];
const arr2 = [3, 4];

const merged = [...arr1, ...arr2];

console.log(merged);


// ===== spread - kopiowanie obiektu =====

const user = {
  name: "Jan",
  age: 25,
};

const copiedUser = {
  ...user,
};

console.log(copiedUser);


// ===== spread - łączenie obiektów =====

const address = {
  city: "Warszawa",
};

const fullUser = {
  ...user,
  ...address,
};

console.log(fullUser);


// ===== template literals =====

const username = "Kasia";
const score = 95;

// interpolacja zmiennych wewnątrz stringa
const message = `Użytkownik ${username} zdobył ${score} punktów`;

console.log(message);
