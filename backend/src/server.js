const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const routes = require('./routes');

const server = express();

mongoose.connect('mongodb+srv://aircnc:admin@cluster-dwkcf.mongodb.net/aircnc?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

server.use(cors({ origin: 'http://localhost:3000'}));
server.use(express.json());
server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
server.use(routes);
server.listen(8080);