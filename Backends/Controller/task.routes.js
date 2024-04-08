const express = require("express");
const { taskModel } = require("../Model/task.model");
const taskRoutes = express.Router();

// Create a task
taskRoutes.post("/addtask", async (req, res) => {
    try {
        // Create a new task instance using the request body
        const newTask = new taskModel(req.body);
        // Save the new task to the database
        await newTask.save();
        // Respond with a success message
        res.json({ msg: "Task added successfully" });
    } catch (error) {
        // If an error occurs, respond with an error message
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Read all tasks
taskRoutes.get("/", async (req, res) => {
    try {
        // Find all tasks in the database
        const tasks = await taskModel.find();
        // Respond with the tasks to the client
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Update a task
taskRoutes.put("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        const updatedTask = req.body;
        // Find the task by ID and update it
        const result = await taskModel.findByIdAndUpdate(taskId, updatedTask, { new: true });
        if (!result) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.json({ msg: "Task updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// Delete a task
taskRoutes.delete("/:id", async (req, res) => {
    try {
        const taskId = req.params.id;
        // Find the task by ID and delete it
        const result = await taskModel.findByIdAndDelete(taskId);
        if (!result) {
            return res.status(404).json({ msg: "Task not found" });
        }
        res.json({ msg: "Task deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});

// sort by tie

// Read all tasks sorted by time
taskRoutes.get("/sortByTime", async (req, res) => {
    try {
        // Find all tasks in the database and sort them by createdAt field in descending order
        const tasks = await taskModel.find().sort({ createdAt: -1 });
        // Respond with the tasks to the client
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
});


module.exports = {
    taskRoutes
};
