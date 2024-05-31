/*
|--------------------------------------------------------------------------
| Create The Application
|--------------------------------------------------------------------------
|
| Here is the place where the ExpressJS application instance is created
| and all app related stuffs should live here
|
*/
const express = require('express');
const routes = require('../routes');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Load routes
routes(app);

module.exports = app;
