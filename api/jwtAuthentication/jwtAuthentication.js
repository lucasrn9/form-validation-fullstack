const jwt = require('jsonwebtoken')

const jwtAuthentication = (req,res,next)=>{
const token = req.cookies.authToken
if(!token){
   return res.status(401).json({error: 'You must be logged !'})
}

try{
const authToken = jwt.verify(token,process.env.JWT_SECRET)
}catch(err){
    res.json({error: err})
}

next()
}

module.exports = jwtAuthentication