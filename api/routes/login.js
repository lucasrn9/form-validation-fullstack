const express = require('express');
const router = express.Router();
const registerModel = require('../models/registerModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/', async (req,res)=>{
    const { email,password } = req.body
   try{
       // verify if user's email is registred in data base
    const foundUser = await registerModel.findOne({email: email})
   
    if(!foundUser){
        return res.status(401).json({type: 'error', message: 'This email is not registred'})
    }
    // authentify user password
    const userAuthentication = await bcrypt.compare(password,foundUser.password)
    if(!userAuthentication){
        return res.status(401).json({type: 'error', message: 'Incorrect password'})
    }
    // generates jwt
    const token = jwt.sign({
    _id: foundUser._id,
    name: foundUser.name},process.env.JWT_SECRET)

    res.cookie('authToken',token,{httpOnly: true}).json({type: 'success',message:'Logged in'})

   }catch(err){
       res.status(500).json({error: 'Internal server error'})
   }
    

})

module.exports = router