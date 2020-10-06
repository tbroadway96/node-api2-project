const express = require('express');
const server = require('./server');

server.use(express.json());

const PORT = 5000;

server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})
