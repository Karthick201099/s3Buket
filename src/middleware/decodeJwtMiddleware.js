const jwt = require("jsonwebtoken");
const {SECRET_KEY} = require("../config");

const decodeJwtMiddleware = (req,res,next)=>{
    const auth_header = req.headers.authorization;
    if(auth_header) {
        const token = auth_header.split("")[1];
        if(token){
            jwt.verify(token,SECRET_KEY,(err,decoded)=>{
                if(err){
                    return res.status(401).json({success:false,message:'Invalid token'})
                }
                const {_id,mobileNumber,role} = decoded;
                 req.user = {
                    id:_id,
                    mobileNumber:mobileNumber,
                    role:role
                }
                next()
})  
        }
    }else{
        return res.status(401).json({success:false,message:'Authorization header missing'})

    }
}