const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
var path = require("path");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("This works too");
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

app.put("/todos/:id/complete", async (req, res) => {
  try {
    const id = req.params.id;
    const { is_completed } = req.body;
    console.log(is_completed);
    const allTodos = await pool.query(
      "UPDATE todo SET is_completed = $1 WHERE todo_id=$2",
      [is_completed, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const oneTodo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(oneTodo.rows[0]);
  } catch (error) {
    console.log(error.messagegg);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id=$2",
      [description, id]
    );
    res.json("Todo was updated");
  } catch (error) {
    console.log(error.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id=$1", [
      id,
    ]);
    res.json("Todo was deleted");
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(5050, () => {
  console.log("listening on port 5050");
});
