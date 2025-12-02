const taskServices = require('../services/taskServices');

const taskController = {};

taskController.getAllTasks = async (req, res) => {
    try {
        const tasks = await taskServices.getAllTasks();
        res.status(200).json({ message: "All tasks fetched successfully", total : tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

taskController.getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskServices.getTaskById(id);
        res.status(200).json({ message: "Task fetched successfully", total: task.length, data: task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

taskController.createTask = async (req, res) => {
    try {
        const { title, description, deadline } = req.body;
        const task = await taskServices.createTask({ title, description, deadline });
        res.status(201).json({ message: "Task created successfully", data: task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

taskController.updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, status, deadline } = req.body;
        const task = await taskServices.updateTask(id, { title, description, status, deadline });
        res.status(200).json({ message: "Task updated successfully", data: task });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

taskController.deleteTask = async (req, res) => {
    try {
        const { id } = req.params;
        const task = await taskServices.deleteTask({ id });
        res.status(200).json({ message: "Task deleted successfully"});
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

taskController.getTasksByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const tasks = await taskServices.getTasksByStatus({ status });
        res.status(200).json({ message: "Tasks fetched successfully", total: tasks.length, data: tasks });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

taskController.getDeadline = async (req, res) => {
    try {
        const { id } = req.params;
        const deadline = await taskServices.getDeadline(id);
        res.status(200).json({ message: "Deadline fetched successfully", data: deadline });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

module.exports = taskController;