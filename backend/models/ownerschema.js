'use strict'
const mongoose = require('mongoose');



// Creating a sample schema for user management 
const ownerWalletSchema = new mongoose.Schema({
    owner_account: {
        type: String,
    },
    amount: {
        type: Number,
    }
})

// String  all the schema structured data in a collection 'User'
module.exports = mongoose.model('Ownerwallet', ownerWalletSchema)
