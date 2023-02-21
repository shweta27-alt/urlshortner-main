const mongoose = require('mongoose');

let urlShortnerDb;

function createConnection(dbURL, name, options) {
    let db = mongoose.createConnection(dbURL, options);
    db.on('connected', function () {
        console.log(`${name} connected`);
    });
    return db;
}


//connect mongo db 
function connect() {
    urlShortnerDb = createConnection(
        'mongodb://localhost:27017/urlShortnerDb',
        'urlShortnerDb'
    );
}



module.exports = {
    geturlShortnerDb: () => urlShortnerDb,
    connect,
};