const pool = require("../db");

const getAllTasks = async (req, res, next) => {
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
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

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
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    const { title, category_id } = req.body;

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (title.length > 255) {
      return res.status(400).json({
        message: "Title cannot exceed 255 characters",
      });
    }

    if (category_id) {
      const [category] = await pool.query(
        "SELECT * FROM categories WHERE id = ?",
        [category_id]
      );

      if (category.length === 0) {
        return res.status(400).json({
          message: "Category does not exist",
        });
      }
    }

    const [result] = await pool.query(
      `
      INSERT INTO tasks (title, category_id)
      VALUES (?, ?)
    `,
      [title.trim(), category_id || null]
    );

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, done, category_id } = req.body;

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        message: "Title is required",
      });
    }

    if (title.length > 255) {
      return res.status(400).json({
        message: "Title cannot exceed 255 characters",
      });
    }

    if (category_id) {
      const [category] = await pool.query(
        "SELECT * FROM categories WHERE id = ?",
        [category_id]
      );

      if (category.length === 0) {
        return res.status(400).json({
          message: "Category does not exist",
        });
      }
    }

    const [result] = await pool.query(
      `
      UPDATE tasks
      SET title = ?, done = ?, category_id = ?
      WHERE id = ?
    `,
      [title.trim(), done, category_id || null, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Task not found",
      });
    }

    const [rows] = await pool.query(
      "SELECT * FROM tasks WHERE id = ?",
      [id]
    );

    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (isNaN(id)) {
      return res.status(400).json({
        message: "Invalid task id",
      });
    }

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
    next(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};