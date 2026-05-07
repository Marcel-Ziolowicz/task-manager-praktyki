// let pozwala zmieniać wartość zmiennej
let age = 18;

// const blokuje ponowne przypisanie zmiennej
const name = "Marcel";

// podstawowe typy danych
const isStudent = true;

const hobbies = ["coding", "music", "gaming"];

const user = {
  id: 1,
  city: "Warszawa",
};

// typeof sprawdza typ danych
console.log(typeof age); // number
console.log(typeof name); // string
console.log(typeof isStudent); // boolean
console.log(typeof hobbies); // object (tablice w JS są obiektami)
console.log(typeof user); // object

user.city = "Sosnowiec";

console.log(user);