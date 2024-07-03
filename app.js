const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

let items = [];

app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = { id: items.length + 1, name, description };
    items.push(newItem);
    res.status(201).json(newItem);
});

app.get('/items', (req, res) => {
    res.json(items);
});

app.get('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');
    res.json(item);
});

app.put('/items/:id', (req, res) => {
    const item = items.find(i => i.id === parseInt(req.params.id));
    if (!item) return res.status(404).send('Item not found');

    const { name, description } = req.body;
    if (name) item.name = name;
    if (description) item.description = description;

    res.json(item);
});

app.delete('/items/:id', (req, res) => {
    const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
    if (itemIndex === -1) return res.status(404).send('Item not found');

    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
});

app.use((req, res) => {
    res.status(404).send('Route not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
