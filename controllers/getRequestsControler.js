const {pool} = require("../database/dbCreatePool.js");

async function getAllTasks(req, res, next) {
   try {
      const [tasks] = await pool.query("SELECT * FROM tasks"); // повертає массив, требе диструктурізація  
   res.json({tasks: tasks});
   } catch (err) {
      next(err);
   }
}

async function getTaskByID(req, res, next) {
   try {
   const tasksId = req.params.id
   const [tasks] = await pool.query("SELECT * FROM tasks WHERE id = ?", [tasksId]); 
   if (tasks.length === 0) {
      throw new Error('Task not found')
   }
   res.json({task: tasks[0]});
} catch (err) {
   next(err)
}
}

module.exports = {
   getAllTasks,
   getTaskByID
}