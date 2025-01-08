import express from "express";
import cors from "cors";
import pool from "./db.js";
const app = express();

// medlleware
app.use(cors());
// app.use(cors()); to allow cross-origin requests
app.use(express.json());
// to access the body of the request

// ROUTS

// create to do
app.post("/todo", async (req, res) => {
  try {
    const { description } = req.body;

    // console.log(req.body)

    const result = await pool.query(
      "Insert into todo (descreption) VALUES($1) RETURNING *",
      [description]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.log(error);
  }
});

app.get("/todo", async (req, res) => {
  try {
    const data = await pool.query("select * from todo ");
    res.json(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await pool.query("delete from todo where todo_id = $1", [id]);
    res.json(data.rows);
    console.log(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    console.log(description);
    console.log(id);
    const data = await pool.query(
      "update todo set descreption = $1 where todo_id = $2",
      [description, id]
    );
    res.json(data.rows);
    console.log(data.rows);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 300 at http://localhost:3000");
});
