const express = require('express');
const app = express();
const port = 3000;

const task = [{
    id: '123456',
    isCompleted: false,
    description: "Walk the dog",
}];

// Importa los routers
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Middleware para gestionar solicitudes HTTP válidas
const validateHTTPMethods = (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'POST' && req.method !== 'PUT' && req.method !== 'DELETE') {
        return res.status(400).send('Método HTTP no válido');
    }
    next();
};

app.use(express.json());

// Implementa los middleware de aplicación
app.use(validateHTTPMethods);

// Implementa los routers en rutas específicas
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

// Middleware para gestionar parámetros incorrectos
app.use((err, req, res, next) => {
    if (err) {
        res.status(400).send('Parámetros incorrectos');
    } else {
        next();
    }
});

app.listen(port, () => {
    console.log(`Servidor funcionando en el puerto ${port}`);
});