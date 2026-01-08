const mongoose = require('mongoose')
let cached = global.mongoose;
require('dotenv').config();

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

const dbConnection = async () => {
    if (cached.conn) {
        return cached.conn
    }
    if (!cached.promise) {
        cached.promise = mongoose.connect(process.env.DATABASE_URL)
            .then((mongoose) => {
                console.log("Database Connection Successfully")
                return mongoose;
            })
    }
    cached.conn = await cached.promise;
    return cached.conn
}

module.exports = dbConnection;