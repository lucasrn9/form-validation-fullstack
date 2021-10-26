const express = require('express');
const router = express.Router();
const joi = require('joi');
const registerValidation = require('../validations/registerValidation');
const registerModel = require('../models/registerModel');
const bcrypt = require('bcrypt');

router.post('/', async (req,res)=>{
    const {name,email,password} = req.body
    
    try{
    // validate request data
    const validation = registerValidation.validate({
        name: name,
        email: email,
        password: password
    })
    
    const {value,error} = validation
    
    if(error){
    return res.json({type:'error',message: error.details[0].message}).status(401)
    }

    // verify if user already exists in data base
    const searchUser = await registerModel.findOne({email: value.email})
    
    if(searchUser){
        return res.json({type: 'error',message: `The email ${searchUser.email} already exists`})
    }

    //hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(value.password,salt)

    // creates a new user in data base
    const user = new registerModel({
    name: value.name,
    email: value.email,
    password: hashedPassword
    })

    user.save().then(user=>res.json({type: 'success', message: `${user.email} registred succefully`}).status(201)).catch(err=>res.json({type: 'error',message: err.message}))
}catch(err){res.json({error:'Internal server error'})}
})

module.exports = router