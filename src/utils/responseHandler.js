 const responseHandler = {
    ok:(res,data,message="success")=>{
        res.status(200).json({success:true, statusCode:200, data, message})
    },
    created:(res,data,message="Resource Created")=>{
        res.status(201).json({success:true,statucCode:201, data, message})
    },
    badRequest:(res,message="Bad Request")=>{
        res.status(400).json({success:false,statusCode:400, data:null, message})
    },
    unAuthorized:(res,message="Unauthorized")=>{
        res.status(401).json({success:false, statucCode:401, data:null, message})
    },
    forBidden:(res,message="For Bidden")=>{
        res.status(403).json({success:false, statucCode:403, data:null,message})
    },
    notFound:(res,message="Resource Not Found")=>{
        res.status(404).json({success:false, statusCode:404, data:null, message})
    },
     serverError:(res,message="Internal server error")=>{
        res.status(500).json({success:false, ststusCode:500, data:null, message})
     }
}

module.exports = responseHandler