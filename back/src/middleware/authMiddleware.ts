const jwt = require('jsonwebtoken')

module.exports=function (req,res,next){
    try{
        if(req.method==="OPTIONS"){
            next()
        }
        const token=req.headers.authorization
        if (token == null) {
            res.status(401).send("Not authorized 1")

        } else {
            const decoded=jwt.verify(token,"secret_key")
            req.user=decoded
            next()
        }
    }catch (e) {
        res.status(401).send("Not authorized 2")
    }
}