const express = require('express');

const app = express();
const port = 3000;

// ===== MIDDLEWARE =====
app.use(express.json()); // Permet de parser le JSON du body

// ===== DONNÉES =====
let tasks = [
    { id: 1, description: 'Faire les courses' },
    { id: 2, description: 'Faire à manger' }
];

// ===== ROUTES =====

// GET /tasks → toutes les tâches
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

// GET /tasks/:id → une tâche précise
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ error: 'Tâche non trouvée' });
    }
});

// POST /tasks → ajouter une tâche
app.post('/tasks', (req, res) => {
    console.log('BODY REÇU :', req.body);

    if (!req.body || !req.body.description) {
        return res.status(400).json({ error: 'description manquante' });
    }

    const newTask = {
        id: tasks.length + 1,
        description: req.body.description
    };

    tasks.push(newTask);

    res.status(201).json({
        message: 'Tâche ajoutée avec succès',
        task: newTask
    });
});

// PUT /tasks/:id → mettre à jour une tâche
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Tâche non trouvée' });
    }

    if (!req.body || !req.body.description) {
        return res.status(400).json({ error: 'description manquante' });
    }

    task.description = req.body.description;

    res.json({ message: 'Tâche mise à jour avec succès', task });
});

// Delete /tasks/:id → supprimer une tâche
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({message: 'Tache supprimée avec succès'});
});

// ===== LANCEMENT DU SERVEUR =====
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
