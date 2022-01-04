const mongoose = require('mongoose');

// the data model that we need to specify as below
// name of the model and schema of model (schema will be an object)
const admin = mongoose.model('admin',{
    uname : {type: 'string'},
    password : {type: 'string'}
});

module.exports = admin;