const mongoose = require('mongoose');

let database = process.env.DB_URL;

process.env.DB_PASS ? database = database.replace('<PASSWORD>', process.env.DB_PASS) : database = database.replace(':<PASSWORD>', '');

module.exports = {
    mongoose,
    connect: () => {
        mongoose.Promise = Promise;
        mongoose.connect(database);
        if (process.env.NODE_ENV !== 'testing') console.log(`Connected to ${database}...`)
    },
    disconnect: done => {
        mongoose.disconnect(done);
        if (process.env.NODE_ENV !== 'testing') console.log(`Disconnect from ${database}...`)
    }
}