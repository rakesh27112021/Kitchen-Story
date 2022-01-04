const mongoose = require('mongoose');

// the data model that we need to specify as below
// name of the model and schema of model (schema will be an object)
const product = mongoose.model('product', {
    title : {type: 'string'},
    name : {type: 'string'},
    category: {type: 'string'},
    description: {type : 'string'},
    image: {type : 'string'},
    price : {type: 'string'}
});

module.exports = product;