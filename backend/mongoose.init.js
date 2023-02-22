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
        'mongodb+srv://shweta277:Poiuytrewq%4012345@cluster0.dbc32st.mongodb.net/UrlShortener?retryWrites=true&w=majority',
        'urlShortnerDb'
    );
}



module.exports = {
    geturlShortnerDb: () => urlShortnerDb,
    connect,
};