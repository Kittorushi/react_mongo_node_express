'use strict'
const randomstring = require("randomstring");

/**
 * The function generates the mongo connection string from the JSON file
 * @param {JSON} obj 
 * @returns {String} 
 */
exports.connectionString = function (obj) {
    return `mongodb+srv://${obj.username}:${obj.password}@${obj.url}/${obj.dbname}`
}



/**
 * The function genrates the new random username
 * @returns {String}
 */
exports.newUserName = function () {
    return randomstring.generate(7)
}

exports.walletAddress = function () {
    return "21312312qwsqwsqw2q3e32ed3"
}


/**
 * The generic callabck function to console the resposne or the error
 * @param {Error} err 
 * @param {*} res 
 */
exports.callback = function (err, res) {

    if (err) {
        console.log('Error: ', err)
    } else {
        console.log("====================")
        console.log(res)
        console.log("====================")

    }
}