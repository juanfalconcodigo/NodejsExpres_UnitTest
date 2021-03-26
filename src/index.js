const express = require('express');
const app = express();
const { getUsers, postUsers, deleteUsers, apiTests } = require('./controllers');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const port = process.env.PORT || 8080;

app.get('/users', getUsers);

app.post('/users', postUsers);

app.delete('/users/:id', deleteUsers);

app.get('/apitest', apiTests);


let server = app.listen(port, () => {
    console.log(`Application running on ${port}`);
});
module.exports = server;