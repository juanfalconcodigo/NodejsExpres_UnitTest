/* const newrelic = require('newrelic'); */
const express = require('express');
const app = express();
const { getUsers, postUsers, deleteUsers, apiTests, getProviders, postProviders, putProviders, deleteProviders, getProvidersId } = require('./controllers');
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
const port = process.env.PORT || 8080;

app.get('/users', getUsers);

app.post('/users', postUsers);

app.delete('/users/:id', deleteUsers);

app.get('/apitest', apiTests);

app.get('/owner_provider', getProviders);
app.post('/owner_provider', postProviders);
app.put('/owner_provider/:id', putProviders);
app.delete('/owner_provider/:customer_condition_id', deleteProviders);
app.get('/owner_provider/:login_id/:provider_name', getProvidersId);


let server = app.listen(port, () => {
    console.log(`Application running on ${port}`);
});
module.exports = app;