const tasks = require('../models/task');


const taskServices = {};

taskServices.getAllTasks = async() => {
    return await tasks.find();
};

taskServices.getTaskById = async(id) => {
    return await tasks.findById(id);
};

taskServices.createTask = async(body) => {
    const { title, description, deadline } = body;
    return await tasks.create({
        title: title.trim(),
        description: description.trim(),
        deadline: new Date(deadline),
    });
};

taskServices.updateTask = async(id, data) => {
    const { title, description, status, deadline } = data;
    const task = await tasks.findById(id);

    title = title !== undefined ? title.trim() : task.title;
    description = description !== undefined ? description.trim() : task.description;
    status = status !== undefined ? status : task.status;
    deadline = deadline !== undefined ? new Date(deadline) : task.deadline;

    return await tasks.findByIdAndUpdate(id, {
        title: title,
        description: description,
        status: status,
        deadline: deadline
    });
};

taskServices.deleteTask = async({ id }) => {
    return await tasks.findByIdAndDelete(id);
};

taskServices.getTasksByStatus = async({ status }) => {
    return await tasks.find({ status: status });
};

taskServices.getDeadline = async(id) => {
    const task = await tasks.findById(id);

    if (!task) {
        throw new Error("Task not found");
    }

    if (!task.deadline) {
        throw new Error("Deadline not set for this task");
    }
    let balance;
    const deadline = new Date(task.deadline).getTime(); // Deadline timestamp
    const now = new Date().getTime();                  // Current timestamp

    const diff = deadline - now; 

    if (diff > 0) {
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60)); 
        balance = hoursLeft + ' hours left';
    } else {
        balance = 'Deadline has passed';
    }
    
    return balance;
};

module.exports = taskServices;
