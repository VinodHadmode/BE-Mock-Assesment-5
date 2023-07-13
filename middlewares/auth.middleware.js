const jwt=require("jsonwebtoken")

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    if(token){
        const decoded = jwt.verify(token, 'masai');
        if(decoded){
             req.body.userID=decoded.userID
            next()
        }else{
            res.status(200).json({ msg: "Wrong token recieved!!" })
        }
    }else{
        res.status(200).json({ msg: "Token not recieved,Please login to continue!!" })
    }
}


module.exports={
    auth
}