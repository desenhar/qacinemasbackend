// Copied from Solution for 02
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
const DBURI = `mongodb://localhost:27017/todos`;
const DB = mongoose.connection;
const allTodos = require('./routes/allTodos');
const singleTodo = require('./routes/singleTodo');
const addTodo = require('./routes/addTodo');

app.use('/add', addTodo);
app.use('/todo', singleTodo);
app.use('/', allTodos);


mongoose.connect(DBURI, { useNewUrlParser: true }, error => {
    error ? console.log(`Unable to connect to DB due to: ${error}`) : console.log(`Connection to MongoDB successful`);
});


app.get(`/`, (req, res) => {
    res.send(`Hello World`);
});

const server = app.listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on http://${SERVERHOST}:${SERVERPORT}`);
});

module.exports = server;