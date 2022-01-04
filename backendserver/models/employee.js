const mongoose = require('mongoose');

// the data model that we need to specify as below
// name of the model and schema of model (schema will be an object)
const Employee = mongoose.model('Employee', {
    name : {type: 'string'},
    designation: {type: 'string'},
    dept : {type: 'string'}
});

module.exports = Employee;