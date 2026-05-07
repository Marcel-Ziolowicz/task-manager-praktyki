const express = require("express");

const app = express();

const PORT = 3000;


// middleware do JSON
app.use(express.json());


// dane w pamięci
const tasks = [
  {
    id: 1,
    title: "Nauka Express",
    done: false,
  },
  {
    id: 2,
    title: "Ćwiczenie API",
    done: true,
  },
  {
    id: 3,
    title: "Pisanie endpointów",
    done: false,
  },
];


// GET /
app.get("/", (req, res) => {
  res.json({
    message: "Task Manager API działa",
  });
});


// ==========================
// GET /tasks
// zwraca wszystkie zadania
// status 200
// ==========================

app.get("/tasks", (req, res) => {
  res.status(200).json(tasks);
});


// ==========================
// GET /tasks/:id
// zwraca jedno zadanie
// status 200 lub 404
// ==========================

app.get("/tasks/:id", (req, res) => {
  // params zawsze są stringiem
  const taskId = Number(req.params.id);

  const task = tasks.find((t) => t.id === taskId);

  // jeśli brak zadania
  if (!task) {
    return res.status(404).json({
      error: "Task not found",
    });
  }

  // jeśli znaleziono
  res.status(200).json(task);
});


// ==========================
// POST /tasks
// dodaje nowe zadanie
// status 201
// ==========================

app.post("/tasks", (req, res) => {
  // dane z body
  const { title } = req.body;

  // nowe ID
  const newId =
    tasks.length > 0
      ? Math.max(...tasks.map((t) => t.id)) + 1
      : 1;

  // nowe zadanie
  const newTask = {
    id: newId,
    title,
    done: false,
  };

  // dodanie do tablicy
  tasks.push(newTask);

  // odpowiedź
  res.status(201).json(newTask);
});


// start serwera
app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});