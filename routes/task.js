const taskRouter = require('express').Router();
const taskController = require('../controllers/taskController');


taskRouter.get('/', taskController.getAllTasks);
taskRouter.get('/:id', taskController.getTaskById);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:id', taskController.updateTask);
taskRouter.delete('/:id', taskController.deleteTask);
taskRouter.get('/status', taskController.getTasksByStatus);
taskRouter.get('/:id/deadline', taskController.getDeadline);

module.exports = taskRouter;