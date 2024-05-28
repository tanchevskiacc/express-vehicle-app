/**
 * ExpressJS
 * 
 * @package VehicleAPI
 * @author  tanchevskit
 */
const dotenv = require('dotenv');
dotenv.config({
    path: './.env'
});

if (!process.env.JWT_SECRET) {
    console.error('FATAR ERROR: jwtPrivateKey is not defined');
    process.exit(1);
}

const app = require('./bootstrap/app');

// establish mongodb connection
const mongoDB = require('./database/mongodb');
mongoDB.connect();

// start the server
const server = app.listen(process.env.PORT, (err) => {
    if (err) console.error('Could not start the server', err);
    else console.log(`Listening on port ${process.env.PORT}`);
});

module.exports = server;