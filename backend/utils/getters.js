'use strict'
const moment = require('moment')

/**
 * The function returns the timestamp formatted string
 * @param {Date} v 
 * @returns {String}
 */
exports.timestamp = function (v) {
    return moment(v).format('YYYY-MM-DDTHH:mm:ss')
}