const tasks = require('../models/task');


const taskServices = {};

taskServices.getAllTasks = () => {
    return tasks.find();
};

taskServices.getTaskById = (id) => {
    return tasks.findById(id);
};

taskServices.createTask = (body) => {
    const { title, description, deadline } = body;
    return tasks.create({
        title: title.trim(),
        description: description.trim(),
        deadline: new Date(deadline),
    });
};

taskServices.updateTask = (id, data) => {
    const { title, description, status, deadline } = data;
    const tasks = tasks.findById(id);

    title = title !== undefined ? title.trim() : tasks.title;
    description = description !== undefined ? description.trim() : tasks.description;
    status = status !== undefined ? status : tasks.status;
    deadline = deadline !== undefined ? new Date(deadline) : tasks.deadline;

    return tasks.findByIdAndUpdate({ _id: id }, {
        title: title,
        description: description,
        deadline: deadline
    });
};

taskServices.deleteTask = ({ id }) => {
    return tasks.findByIdAndDelete(id);
};

taskServices.getTasksByStatus = ({ status }) => {
    return tasks.find({ status });
};

taskServices.getDeadline = (id) => {
    const task = tasks.findById(id);

    const balance = task.deadline.getTime() - Date.now();
    return balance;
};

module.exports = taskServices;
