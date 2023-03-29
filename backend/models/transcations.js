'use strict'
const mongoose = require('mongoose')
const utils = require('../utils/random_string_gen')
const connection = require("../config/connection.json")
const validators = require("../utils/validators.js")


const getters = require("../utils/getters.js")
// Generating the  mongo connection string

// Creating a sample schema for user managgement 
const schema = new mongoose.Schema({
    destination_account: {
        // Setting the key as the Primary id for the schema 

        require: true,
        type: String,
        // Adding the error check if the null/undefined/empty string is inputed
        sparse: true,
        // Cleaning the string for any whitespaces
        trim: true,
        required: [true, "destination account does not exists"],
        // Making sure the value does not get updated in the future
        immutable: true,

    },

    source_account: {
        type: String,
        sparse: true,
        trim: true,
        // Making sure the value is must 
        required: [true, "source account does not exists"],
        immutable: true,

    },

    tnx_hash: {
        type: String,

    },

    block_hash: {
        type: String,
        immutable: true,

    },

    block_num: {
        type: Number,

        immutable: true

    },

    gas_used: {
        type: Number,
        immutable: true
    },


    amount: {
        type: Number,
        sparse: true,
        trim: true,
        required: [true, "Enter Amount"],
        immutable: true,


    },


    timestamp: {
        type: Date,
        default: Date.now(),
        immutable: true,
        get: getters.timestamp
    }


})


// String  all the schema structured data in a collection 'User'
module.exports = mongoose.model('Transcations', schema)
