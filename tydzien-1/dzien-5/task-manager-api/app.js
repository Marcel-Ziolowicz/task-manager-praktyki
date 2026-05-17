require("dotenv").config();

const express = require("express");

const tasksRouter = require("./routes/tasks");
const categoriesRouter = require("./routes/categories");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(express.json());

app.use("/tasks", tasksRouter);
app.use("/categories", categoriesRouter);

module.exports = app;