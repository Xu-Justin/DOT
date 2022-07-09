const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

mongoose.connect(process.env.DB_CONNECTION, () => console.log('Connected to DB!'));

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

const usersRoutes = require('./routes/users.js');
const tasksRoutes = require('./routes/tasks.js');


app.use('/users', usersRoutes);
app.use('/tasks', tasksRoutes);

app.use(function(err, req, res, next){
    console.log(err);
    res.status(500).send({ message: 'Error.' });
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`));