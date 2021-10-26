const express = require('express');
const router = express.Router();
const axios = require('axios').default;
const jwtAuth = require('../jwtAuthentication/jwtAuthentication');


router.get('/',jwtAuth, async (req,res)=>{
    try{
        const numberOfPosts = req.query.qt
    
    const getPosts = await axios.get('https://jsonplaceholder.typicode.com/posts')
    if(!numberOfPosts){
        return res.json(getPosts.data)
    }
    const posts = getPosts.data.splice(0,numberOfPosts)
    res.json(posts)
}catch(err){
    console.log(err)
}
})

module.exports = router