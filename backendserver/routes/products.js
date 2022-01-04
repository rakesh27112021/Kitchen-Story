const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router()
const product = require('../models/products')
const ObjectId = require('mongoose').Types.ObjectId

//getfood items
router.get('', (request, response) =>{
    product.find((err, doc) => {
        if(err){
            console.log("Error in get data " + err)
        }else{
            response.send(doc)             
        }
        
    })
})

module.exports = router;