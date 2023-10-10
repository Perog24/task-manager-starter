const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool(process.env.DATABASE_URL);

async function postNewTask (req, res) {
   const taskName = req.body.name;
   await pool.query(`INSERT INTO tasks (name) VALUES (?)`, [taskName]);
   res.status(201).json({message: "Success"});
}

async function putchTaskByID (req, res) {
   const tasksId = req.params.id;
   const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [tasksId]);
   if (tasks.length === 0) {
      return res.status(404).json({message: "Task not found"});
   }
   const updTask = req.body;
   await pool.query(`UPDATE tasks SET ? WHERE id = ?`, [updTask, tasksId]);
   res.status(200).json({message: 'Success', task:{...tasks[0], ...updTask}});

}

async function deleteTaskByID (req, res) {
   const tasksId = req.params.id;
   await pool.query("DELETE FROM tasks WHERE id = ?", [tasksId]);
   res.status(204).json({message: 'Task deleted'});
}

module.exports = {
   postNewTask,
   putchTaskByID,
   deleteTaskByID
}