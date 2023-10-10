const express = require('express');
const tasksRouter = express.Router();
const mysql = require('mysql2/promise');
require("dotenv").config();

const pool = mysql.createPool(process.env.DATABASE_URL);

tasksRouter.get('/api/v1/tasks', async (req, res) => {
   // SYNC = BAD
   // connection.query('SELECT * FROM tasks', function(err, results) {
   // res.json({tasks: results});
   // });
   const [tasks] = await pool.query("SELECT * FROM tasks"); // повертає массив, требе диструктурізація  
   res.json({tasks: tasks});
});

tasksRouter.get('/api/v1/tasks/:id', async (req, res) => {
   const tasksId = req.params.id
   const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [tasksId]); 
   if (tasks.length === 0) {
      return res.status(404).json({message: 'Task not found'});
   }
   res.json({task: tasks[0]});
});

tasksRouter.post('/api/v1/tasks', async (req, res) => {
   const taskName = req.body.name;
   await pool.query(`INSERT INTO tasks (name) VALUES (?)`, [taskName]);
   res.status(201).json({message: "Success"});
});

tasksRouter.patch('/api/v1/tasks/:id', async (req, res) => {
   const tasksId = req.params.id;
   const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [tasksId]);
   if (tasks.length === 0) {
      return res.status(404).json({message: "Task not found"});
   }
   const updTask = req.body;
   await pool.query(`UPDATE tasks SET ? WHERE id = ?`, [updTask, tasksId]);
   res.status(200).json({message: 'Success', task:{...tasks[0], ...updTask}});

});

tasksRouter.delete('/api/v1/tasks/:id', async (req, res) => {
   const tasksId = req.params.id;
   await pool.query("DELETE FROM tasks WHERE id = ?", [tasksId]);
   res.status(204).json({message: 'Task deleted'});
});
module.exports = tasksRouter;