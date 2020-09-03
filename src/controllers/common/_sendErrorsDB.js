const _ = require('lodash');

function dbError(res, dbErrors, rotina = '') {
    const errors = [];
    if ( rotina !== '') {
        errors.push({message:'Rotina:'+rotina})
    };
    _.forIn(dbErrors.errors, error => errors.push(error.message));
    return res.status(400).json({ errors });
}

module.exports = dbError;

