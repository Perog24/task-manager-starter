const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool(process.env.DATABASE_URL);
async function getAllTasks(req, res) {
   const [tasks] = await pool.query("SELECT * FROM tasks"); // повертає массив, требе диструктурізація  
   res.json({tasks: tasks});
}

async function getTaskByID(req, res) {
   const tasksId = req.params.id
   const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [tasksId]); 
   if (tasks.length === 0) {
      return res.status(404).json({message: 'Task not found'});
   }
   res.json({task: tasks[0]});
}

module.exports = {
   getAllTasks,
   getTaskByID
}