const tasks = [
  { id: 1, title: "Nauka JavaScript", done: true },
  { id: 2, title: "Ćwiczenie Git", done: false },
  { id: 3, title: "Node.js basics", done: true },
  { id: 4, title: "API practice", done: false },
];


// ===== map =====
// tworzy nową tablicę z samymi tytułami

const titles = tasks.map((task) => task.title);

console.log("Titles:");
console.log(titles);


// ===== filter =====
// tylko niezrobione zadania

const undoneTasks = tasks.filter((task) => !task.done);

console.log("Undone tasks:");
console.log(undoneTasks);


// ===== find =====
// szukanie zadania po id

const foundTask = tasks.find((task) => task.id === 3);

console.log("Found task:");
console.log(foundTask);


// ===== some =====
// sprawdza czy istnieje choć jedno wykonane zadanie

const hasDoneTask = tasks.some((task) => task.done);

console.log("Any completed?");
console.log(hasDoneTask);


// ===== forEach =====
// wypisanie każdego zadania

console.log("Task list:");

tasks.forEach((task) => {
  const mark = task.done ? "[x]" : "[ ]";
  console.log(`${mark} ${task.title}`);
});