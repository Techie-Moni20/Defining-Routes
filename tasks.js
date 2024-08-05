// routes/tasks.js
const express = require('express');
const router = express.Router();

// In-memory task store
let tasks = [];

// Create / Add a new task to the project dashboard
router.post('/', (req, res) => {
  const newTask = req.body;
  newTask.id = tasks.length + 1; // Simple ID generation
  tasks.push(newTask);
  res.status(201).send('Task created successfully!');
});

// Display a list of all tasks from the dashboard
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

// Display a specific project detail using ID
router.get('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const task = tasks.find(t => t.id === taskId);
  if (task) {
    res.status(200).json(task);
  } else {
    res.status(404).send('Task not found');
  }
});

// Update the details of the specific task based on the id
router.put('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const updatedTaskDetails = req.body;
  let task = tasks.find(t => t.id === taskId);
  if (task) {
    Object.assign(task, updatedTaskDetails);
    res.status(200).send('Task updated successfully!');
  } else {
    res.status(404).send('Task not found');
  }
});

// Delete a specific project detail corresponding to the id
router.delete('/:id', (req, res) => {
  const taskId = parseInt(req.params.id, 10);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    res.status(200).send('Task deleted successfully!');
  } else {
    res.status(404).send('Task not found');
  }
});

module.exports = router;
