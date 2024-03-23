const userModel = require("../model/userModel");
const { verifyToken } = require("../tools/authTools");

const checkAuth = async (req,res,next)=>{
try{
    const authHeader = req?.headers?.authorization;
    if(!authHeader){
        return res.status(404).send("ERROR: No credentials sent!");
    }

    const [bearer, token] = authHeader.split(' ');
    
    if(bearer && bearer.toLowerCase() === 'bearer'){
        if(token){
        let verfiyResult = verifyToken(token);
        console.log(verfiyResult);
        const user = await userModel.findOne({
            email: verfiyResult.email,
        });

        req.authenticated = !!user;
        if (!user){
            return res.status(404).send("ERROR: invalid token");
        }
        
        req.user = user;
		return next();
    }
    }
}catch(err){
    return res.status(401).send(err.message);
}
}

module.exports = checkAuth;