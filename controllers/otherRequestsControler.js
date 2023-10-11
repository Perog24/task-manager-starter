const { pool } = require("../database/dbCreatePool");

async function postNewTask (req, res, next) {
   try {
      const taskName = req.body.name;
      await pool.query(`INSERT INTO tasks (name) VALUES (?)`, [taskName]);
      res.status(201).json({message: "Success"});      
   } catch (err) {
      next(err);
   }}

async function putchTaskByID (req, res, next) {
   try {
      const tasksId = req.params.id;
      const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [tasksId]);
      if (tasks.length === 0) {
         throw new Error("Task not found");     
      } 
         const updTask = req.body;
         await pool.query(`UPDATE tasks SET ? WHERE id = ?`, [updTask, tasksId]);
         res.status(200).json({message: 'Success', task:{...tasks[0], ...updTask}});
   } catch (err) {
      next(err);
   }}

async function deleteTaskByID (req, res, next) {
   try {
      const tasksId = req.params.id;
      await pool.query("DELETE FROM tasks WHERE id = ?", [tasksId]);
      res.status(204).json({message: 'Task deleted'});      
   } catch (err) {
      next(err)
   }
}

module.exports = {
   postNewTask,
   putchTaskByID,
   deleteTaskByID
}