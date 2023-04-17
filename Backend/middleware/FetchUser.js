const jwt = require('jsonwebtoken');
const JWT_SECRET = 'This is a string'

const fetchuser= (req, res, next)=>{
    // geting the user from jwt token and add id to req object
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQzYWQ2MzEyNDg5YmZlZjI1ZmE0Mzk3In0sImlhdCI6MTY4MTczMTQ2MX0.W8clkM8cRBxmseR2A5nxJy3m2SQPX9OW7yY-J_tYF-w"

    // const authHeader = req.headers.authorization;
    // const token = authHeader.split(' ')[1];

    //     console.log(authHeader)
    //     // console.log(token)

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