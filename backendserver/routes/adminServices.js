/*const express = require('express');
const { isValidObjectId } = require('mongoose');
const router = express.Router()

const adminUser = require('../models/adminUser.js')
const fooditem = require('../models/fooditem')
const ObjectId = require('mongoose').Types.ObjectId

// api needs to be created for Get, Post, Put, Delete
// Base path for employee requests consider http://localhost:3000/adminservices
// '/' in post refers to base path


//update password
router.put('/updatepassword/', (request, response) =>{
    console.log("request.session.userid: " + request.session.userid)
    console.log("request.session.userid: " + request.session.userid + ",request.body.oldPassword: "+ request.body.oldPassword + ",request.body.newPassword: " + request.body.newPassword)
    if(ObjectId.isValid(request.session.userid)){
        request.cookies.username=request.session.username;

        let adminUserObj = new adminUser({
            uname : request.body.uname,
            password: request.body.password,
        })
        adminUser.findOneAndUpdate({"_id": request.session.userid,"password": request.body.oldPassword}, {$set : {"password" : request.body.newPassword}}, {new : true},(err, doc) => {
            if(err){
                        console.log(err)
                    }else{
                        if (doc){
                            request.cookies.msg="Password Update Successfully"
                            request.cookies.updateStatus=1
                        }else{
                            request.cookies.msg="Password old password not correct"
                            request.cookies.updateStatus=0
                        }
                        console.log(doc)
                        response.status(200).send(request.cookies)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
    
})

//logout
router.get('/logout',(request,response)=>{
    console.log(request.session)
    request.session.destroy();
    response.send('logout successfully')
})

//create food items
router.post('/addfooditem',(request,response)=>{
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        console.log(request);
        let itemObj = new fooditem({
            name : request.body.name,
            category: request.body.category,
            price : request.body.price
        })
    
    
        itemObj.save((err, doc) =>{
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

//update food items
router.put("/updatefooditem",(request,response)=>{
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        let itemObj = new fooditem({
            name : request.body.name,
            category: request.body.category,
            price : request.body.price
        })
        //Employee.findByIdAndUpdate(request.params.id, {$set : emp}, {new : true},(err, doc)     
        fooditem.findByIdAndUpdate(request.body.ObjectId,{$set : itemObj},{new : true},(err,doc)=>{
            if(err){
                console.log(err)
            }else{
                request.cookies.doc=doc
                response.status(200).send(request.cookies)
            }
        })

    }else{
        response.status(403).send({
            errMessage: "Permission Denied"
        })
    }
})

//delete food item
router.delete('/delete/:id',(request,response)=>{
    if (typeof request.session.username !== 'undefined' || request.session.username !== null){
        request.cookies.username=request.session.username;
        fooditem.findByIdAndRemove(request.params.id,(err,doc)=>{
            if(err){
                console.log("Error in delete food items data " + err)
            }else{
                request.cookies.doc=doc
                response.send(request.cookies)
            }
        })

    }else{
        response.status(403).send({
            errMessage: "Permission Denied"
        })
    }
})
*/

/*
if(ObjectId.isValid(request.params.id)){
        Employee.findByIdAndRemove(request.params.id, (err, doc) => {
            if(err){
                        console.log("Error in delete employee data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
*/
/*
// get api for one employee data fetch
router.get('/:id', (request, response) =>{
    if(ObjectId.isValid(request.params.id)){
        Employee.findById(request.params.id, (err, doc) => {
            if(err){
                        console.log("Error in get data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
    
})


// Post api as unless data is posted nothing can be retrieved
// the data received from angular application will be available in request 
// the employee object will be received in the request
router.post('/',(request, response) => {
    let emp = new Employee({
        name : request.body.name,
        designation: request.body.designation,
        dept : request.body.dept
    })


    emp.save((err, doc) =>{
        if(err){
            console.log("Error in post data " + err)
        }else{
            response.send(doc)
        }
    })
})

// delete api 
router.delete('/:id', (request, response) =>{
    if(ObjectId.isValid(request.params.id)){
        Employee.findByIdAndRemove(request.params.id, (err, doc) => {
            if(err){
                        console.log("Error in delete employee data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
    
})

// put api 
router.put('/:id', (request, response) =>{
    if(ObjectId.isValid(request.params.id)){

        let emp = {
        name : request.body.name,
        designation: request.body.designation,
        dept : request.body.dept
    }
        Employee.findByIdAndUpdate(request.params.id, {$set : emp}, {new : true},(err, doc) => {
            if(err){
                        console.log("Error in update employee data " + err)
                    }else{
                        response.send(doc)
                    }
        })
    } else {
        return response.status(404).send("No record found")
    }
    
})*/

//module.exports = router;