const express = require('express');

const Hobbits = require('../hobbits/hobbitsModel.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.status(200).json({ api: 'up' });
});

server.get('/hobbits', (req, res) => {
  Hobbits.getAll()
    .then((hobbits) => {
      res.status(200).json(hobbits);
    })
    .catch((error) => {
      const err = {
        message: error.message,
        stack: error.stack,
      };
      res.status(500).json(err);
    });
});

server.post('/hobbits', (req, res) => {
  const { name } = req.body;
  Hobbits.insert({ name })
    .then((hobbits) => {
      res.status(201).json({ message: 'Hobbit created successfully' });
    })
    .catch((error) => {
      const err = {
        message: error.message,
        stack: error.stack,
      };
      res.status(500).json(err);
    });
});

server.delete('/hobbits/:id', (req, res) => {
  const { id } = req.params;
  Hobbits.remove(id)
    .then(() => {
      res.status(200).json({ message: 'Hobbit deleted successfully' });
    })
    .catch((error) => {
      const err = {
        message: error.message,
        stack: error.stack,
      };
      res.status(500).json(err);
    });
});

module.exports = server;
