// implement your API here
const express = require('express');

const db = require('./data/db');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Here');
  });

server.listen(4000, () => {
    console.log('\n** API up and running on port 4k **');
});