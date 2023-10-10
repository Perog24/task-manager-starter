const express = require('express');
const { getAllTasks, getTaskByID } = require('../controllers/getRequestsControler');
const { postNewTask, putchTaskByID, deleteTaskByID } = require('../controllers/otherRequestsControler');
const tasksRouter = express.Router();

tasksRouter.get('/api/v1/tasks', getAllTasks);

tasksRouter.get('/api/v1/tasks/:id', getTaskByID);

tasksRouter.post('/api/v1/tasks', postNewTask);

tasksRouter.patch('/api/v1/tasks/:id', putchTaskByID);

tasksRouter.delete('/api/v1/tasks/:id', deleteTaskByID);

module.exports = tasksRouter;