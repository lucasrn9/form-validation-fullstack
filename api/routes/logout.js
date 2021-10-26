const express = require('express');
const router = express.Router();

router.get('/',(req,res)=>{
    res.clearCookie('authToken').status(200).json({message: 'You are logged out'})
})

module.exports = router