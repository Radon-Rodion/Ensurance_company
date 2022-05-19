const jwto = require('jsonwebtoken')
module.exports=function(role_id){
    return function (req,res,next){
        try{
           /* if(req.method==="OPTIONS"){
                next()
            }*/
            const token=req.headers.authorization
            console.log(token)
            if (token == null) {
                console.log("111111111111111")
                res.status(401).send("Not authorized 1")
            } else {
                console.log("-----------------------")
                const decoded=jwto.verify(token,"secret_key")
                console.log("!!!!!!!!!!!!!!!!!")

                req.user=decoded
                console.log(decoded)
                if(decoded.role_id!==role_id){
                    console.log("2222222222222")
                    res.status(403).send("No access")
                }else {
                    console.log("333333333333")
                    next()
                }
            }
        }catch (e) {
            res.status(401).send(e.message)
        }
    }
}






