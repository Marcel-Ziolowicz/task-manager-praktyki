const pool = require("../db");

const getAllTasks = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT 
        tasks.id,
        tasks.title,
        tasks.done,
        tasks.created_at,
        tasks.updated_at,
        categories.name AS category
      FROM tasks
      LEFT JOIN categories
      ON tasks.category_id = categories.id
      ORDER BY tasks.id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      `
      SELECT 
        tasks.id,
        tasks.title,
        tasks.done,
        tasks.created_at,
        tasks.updated_at,
        categories.name AS category
      FROM tasks
      LEFT JOIN categories
      ON tasks.category_id = categories.id
      WHERE tasks.id = ?
    `,
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const { title, category_id } = req.body;

    if (!title) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO tasks (title, category_id)
      VALUES (?, ?)
    `,
      [title, category_id || null]
    );

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done, category_id } = req.body;

    await pool.query(
      `
      UPDATE tasks
      SET title = ?, done = ?, category_id = ?
      WHERE id = ?
    `,
      [title, done, category_id, id]
    );

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM tasks WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};