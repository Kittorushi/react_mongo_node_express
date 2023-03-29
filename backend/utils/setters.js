'use strict'
const sha1 = require('sha1')

/**
 * The function hashes and returns the string
 * @param {String} v 
 * @returns  {String}
 */
exports.hash = function (v) {
    return sha1(v)
}
