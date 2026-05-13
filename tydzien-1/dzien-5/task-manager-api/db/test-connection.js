require("dotenv").config();

const pool = require("./index");

async function test() {
  try {
    const [rows] = await pool.query("SELECT NOW() AS now");
    console.log("OK:", rows[0]);

    await pool.end();
  } catch (err) {
    console.error(err);
  }
}

test();