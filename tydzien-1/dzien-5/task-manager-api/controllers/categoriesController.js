const pool = require("../db");

const getAllCategories = async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT *
      FROM categories
      ORDER BY id
    `);

    res.json(rows);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: "Name is required",
      });
    }

    const [result] = await pool.query(
      `
      INSERT INTO categories (name)
      VALUES (?)
    `,
      [name]
    );

    const [rows] = await pool.query(
      "SELECT * FROM categories WHERE id = ?",
      [result.insertId]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        message: "Category already exists",
      });
    }

    res.status(500).json({
      error: error.message,
    });
  }
};

module.exports = {
  getAllCategories,
  createCategory,
};