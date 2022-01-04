const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router()

const admin = require('../models/admin.js')
const product = require ('../models/products.js')
const ObjectId = require('mongoose').Types.ObjectId

// api needs to be created for Get, Post, Put, Delete
// Base path for admin login requests consider http://localhost:3000/admin
// '/' in post refers to base path

router.post('/login',(request, response) => {
    let user = new admin({
        uname : request.body.uname,
        password: request.body.password,
    })

    try {
        admin.findOne({
            uname : request.body.uname,
            password : request.body.password,
        },(err,admin)=>{
            if (admin.uname == user.uname) {
                console.log("logged in successfully: " + admin._id + "session id: " + request.sessionID);
                request.session.username=user.uname;
                request.session.userid=admin._id;
                request.cookies.username = request.session.username;
                request.cookies.welcomemassage="welcome";
                response.send(request.cookies);
            }else{
                response.send("Invalid Username and password");
            }
    
            if (err){
                console.log("Error onlogin: " + err);
            }
        });
    } catch (error) {
        response.send(error);
    }
})

router.post('/addproduct',(request,response)=>{
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        console.log(request);
        let newProduct = new product({
            name : request.body.name,
            category: request.body.category,
            price : request.body.price,
            image : request.body.image,
            description:request.body.description,
            title:request.body.title,
        })
        newProduct.save((err, doc) =>{
            if(err){
                console.log("Error in post data " + err)
            }else{
                request.cookies.doc=doc
                request.cookies.result=1;
                response.send(request.cookies)
            }
        })

    }else{
        response.status(403).send({
            errMessage: "Permission Denied"
        })
    }
})

//getfood items
router.get('/getproducts', (request, response) =>{
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        console.log(request.cookies.username)
        response.append('username', request.cookies.username)
        product.find((err, doc) => {
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

//update food items
router.put('/updateProduct/:id', (request, response) =>{
    console.log(request.session)
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        console.log(request.cookies.username)
        response.append('username', request.cookies.username)
        let productDetails = new product({
            name : request.body.name,
            category: request.body.category,
            price : request.body.price,
            image : request.body.image,
            description:request.body.description,
            title:request.body.title,
        })
        product.findByIdAndUpdate(request.params.id,{$set : {name : request.body.name,
            category: request.body.category,
            price : request.body.price,
            image : request.body.image,
            description:request.body.description,
            title:request.body.title,
        }},{new : true},(err, doc) => {
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

//delete food items
router.delete('/deleteProduct/:id', (request, response) =>{
    console.log(request.session)
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        console.log(request.cookies.username)
        response.append('username', request.cookies.username)
        product.findByIdAndDelete(request.params.id,(err, doc) => {
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

module.exports = router;
/*
router.get('/login',(request,response) => {
    if (request.session.username="admin"){
        return response.status(200).send({
            username: request.session.username
        })
    }else{
        return response.status(403).send({
            errMessage: "Permission Denied"
        })
    }
})
*/
