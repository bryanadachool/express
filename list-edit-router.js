const express = require('express');
const listEditRouter = express.Router();

// Middleware para manejar errores en solicitudes POST y PUT
const validateRequestData = (req, res, next) => {
    if (req.method === 'POST' || req.method === 'PUT') {
        if (!req.body || (req.method === 'POST' && !req.body.description)) {
            return res.status(400).send('Solicitud no válida');
        }
    }
    next();
};

// Ruta para crear una tarea (POST)
listEditRouter.post('/create', validateRequestData, (req, res) => {
    // Implementa la lógica para crear una nueva tarea
    const newTask = {
        id: '789012',
        isCompleted: false,
        description: req.body.description
    };
    task.push(newTask);
    res.json(newTask);
});

// Ruta para eliminar una tarea (DELETE)
listEditRouter.delete('/:taskId', (req, res) => {
    const taskId = req.params.taskId;
    const index = task.findIndex(t => t.id === taskId);
    if (index !== -1) {
        task.splice(index, 1);
        res.json({ message: 'Tarea eliminada con éxito' });
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

// Ruta para actualizar una tarea (PUT o PATCH)
listEditRouter.put('/:taskId', validateRequestData, (req, res) => {
    const taskId = req.params.taskId;
    const updatedTask = req.body;
    const index = task.findIndex(t => t.id === taskId);
    if (index !== -1) {
        task[index] = updatedTask;
        res.json({ message: 'Tarea actualizada con éxito' });
    } else {
        res.status(404).json({ message: 'Tarea no encontrada' });
    }
});

module.exports = listEditRouter;