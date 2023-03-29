'use strict'
const mongoose = require('mongoose');
const utils = require('../utils/random_string_gen')
const getters = require("../utils/getters.js")

// Generating the  mongo connection string
const connection = require("../config/connection.json");
const dbUrl = utils.connectionString(connection)

// //connection to mongoose
// const connectToDatabase = async () => {
//     try {
//         await mongoose.connect(dbUrl, { useNewUrlParser: true });
//         console.log("Mongoose connected successfully to Mongo DB");
//     } catch (error) {
//         console.log("Mongoose could not connect to database: " + error);
//     }
// }

// connectToDatabase();

// Creating a sample schema for user management 
const walletSchema = new mongoose.Schema({
    walletaddress: {
        type: String,
    },
    walletbalance: {
        type: Number,
    }
})

// String  all the schema structured data in a collection 'User'
module.exports = mongoose.model('Wallets', walletSchema)
