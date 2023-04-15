const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'

const fetchuser= (req, res, next)=>{
    // geting the user from jwt token and add id to req object
    // const token = req.header('auth-token');
// const token = req.cookies.Token;

const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

    if(!token){
        res.status(401).send({error:"please Authenticate using valid token"})
    }
    try {
        const data = jwt.verify(token,JWT_SECRET)
        req.user= data.user;
        next()
    } catch (error) {
        res.status(401).send({error:"please Authenticate using valid token"})
    }
   
}


module.exports = fetchuser;