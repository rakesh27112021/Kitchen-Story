/*const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router()
const fooditem = require('../models/fooditem')
const ObjectId = require('mongoose').Types.ObjectId

//getfood items
router.get('/getfooditems', (request, response) =>{
    console.log(request.session)
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        console.log(request.cookies.username)
        response.append('username', request.cookies.username)
        fooditem.find((err, doc) => {
            if(err){
                console.log("Error in get data " + err)
            }else{
                try {
                    request.cookies.doc=doc
                    
                } catch (error) {
                    console.log(error)
                }                
            }
            response.send(request.cookies)
        })
    }else{
        response.status(403).send({
            errMessage: "Permission Denied"
        })
    }
})

module.exports = router;*/