const express = require('express');
const app = express();
const port = 3000;

// Lista de tareas
const tasks = [
    { id: 1, description: "Buy groceries", isCompleted: false },
    { id: 2, description: "Finish homework", isCompleted: false },
    { id: 3, description: "Walk the dog", isCompleted: true },
];

app.use(express.json());

// Obtener todas las tareas
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// Crear una nueva tarea
app.post('/tasks', (req, res) => {
    const newTask = {
        id: tasks.length + 1,
        description: req.body.description,
        isCompleted: false,
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});

// Obtener una tarea por su ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

// Actualizar una tarea por su ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.description = req.body.description || task.description;
        task.isCompleted = req.body.isCompleted || task.isCompleted;
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

// Eliminar una tarea por su ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.json({ message: 'Tarea eliminada con éxito' });
    } else {
        res.status(404).json({ error: 'Tarea no encontrada' });
    }
});

// Obtener tareas completas
app.get('/tasks/completed', (req, res) => {
    const completedTasks = tasks.filter(t => t.isCompleted);
    res.json(completedTasks);
});

// Obtener tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
    const incompleteTasks = tasks.filter(t => !t.isCompleted);
    res.json(incompleteTasks);
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});