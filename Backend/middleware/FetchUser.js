const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'


    
const fetchuser= (req, res, next)=>{
    // geting the user from jwt token and add id to req object
const token = req.headers.authorization
const token2 = token.split(' ')[1]
    if(!token2){
        res.status(401).send({error:"please Authenticate using valid token"})
    }try {
        const data = jwt.verify(token2,JWT_SECRET)
        req.user= data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"please Authenticate using valid token"})
    }  
}
module.exports = fetchuser;