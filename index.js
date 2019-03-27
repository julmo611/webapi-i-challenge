// implement your API here
const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());


// find
server.get('/api/users', (req, res) => {
    db
      .find()
      .then(users => { 
        res.status(200).json(users);
      })
      .catch(error => {
        res.status(500).json({ message: 'error retrieving users' });
      });
  });

// findById

  server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;
  
    db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res
          .status(404)
          .json({ message: "User Not found" });
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ message: 'error retrieving users' })
    );
});

// Insert
  server.put("/api/users", (req, res) => {
    const user = req.body;
  
    if (user.name && user.bio) {
      db
        .insert(user)
        .then(user => res.status(201).json(user))
        .catch(err =>
          res.status(500).json({ message: "Server error inserting new user"})
        );
    } else {
      res.status(400).json({ message: "Error inserting new user" });
    }
  });


// Delete 

  server.delete("/api/users/:id", (req, res) => {
    const id = req.params.id;  
    db
      .remove(id)
      .then(deleted => {
          res.status(204).end();
      })
      .catch(error => {
        res.status(500).json({ message: 'Error deleting the user' });
      });
  });


// Update

server.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  db
    .update(id, changes)
    .then(updated => {
      if (updated) {
        res.status(200).json(updated);
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'error updating user' });
    });
});




server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
});