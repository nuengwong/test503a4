// This file will store code for connecting our project to database
const mongoose = require('mongoose');

// Async Function (waiting for start using app / recieve data from other) for connect with Database
const connectDB = async () => {
    mongoose.set('strictQuery', true);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`MongoDB Connected: ${conn.connection.host}`); 
}

module.exports = connectDB;