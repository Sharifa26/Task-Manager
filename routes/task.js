const taskRouter = require('express').Router();
const taskController = require('../controllers/taskController');


taskRouter.get('/', taskController.getAllTasks);
taskRouter.get('/status/:status', taskController.getTasksByStatus);
taskRouter.get('/deadline/:id', taskController.getDeadline);
taskRouter.get('/:id', taskController.getTaskById);
taskRouter.post('/', taskController.createTask);
taskRouter.put('/:id', taskController.updateTask);
taskRouter.delete('/:id', taskController.deleteTask);


module.exports = taskRouter;