// ===== greet =====

// klasyczna
function greet(name) {
  return `Cześć, ${name}!`;
}

// strzałkowa
const greetArrow = (name) => `Cześć, ${name}!`;


// ===== isEven =====

// klasyczna
function isEven(number) {
  return number % 2 === 0;
}

// strzałkowa
const isEvenArrow = (number) => number % 2 === 0;


// ===== getMax =====

// klasyczna
function getMax(arr) {
  return Math.max(...arr);
}

// strzałkowa
const getMaxArrow = (arr) => Math.max(...arr);


// ===== filterPositive =====

// klasyczna
function filterPositive(arr) {
  return arr.filter((num) => num > 0);
}

// strzałkowa
const filterPositiveArrow = (arr) =>
  arr.filter((num) => num > 0);


// ===== TESTY =====

console.log(greet("Adam"));
console.log(greetArrow("Ola"));

console.log(isEven(4));
console.log(isEvenArrow(7));

console.log(getMax([1, 9, 3, 15]));
console.log(getMaxArrow([2, 5, 8]));

console.log(filterPositive([-3, 5, -1, 10]));
console.log(filterPositiveArrow([-2, 7, 0, 12]));