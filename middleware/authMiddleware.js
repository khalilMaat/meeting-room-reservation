const userModel = require("../model/userModel");
const blacklistTokenModel = require("../model/blacklistTokenModel");
const { verifyToken, hashPassword } = require("../tools/authTools");

const checkAuth = async (req,res,next)=>{
try{
    const authHeader = req?.headers?.authorization;

    if(!authHeader){
        return res.status(404).send("ERROR: You are Not Authorized !");
    }

    const [bearer, token] = authHeader.split(' ');
    
    if(bearer && bearer.toLowerCase() === 'bearer' && token){
        const blacklistedToken = await blacklistTokenModel.findOne({ token });
   
        if (blacklistedToken && blacklistedToken.expiration > new Date()) {
            return res.status(401).send('Access denied. Token revoked.');
        }

        let verfiyResult = verifyToken(token);
        
        const user = await userModel.findOne({
            email: verfiyResult.email,
        }).select('-password');

        req.authenticated = !!user;

        if (!user){
            return res.status(404).send("ERROR: invalid token");
        }
        
        req.user = user;
        
	   next();
   
    }
}catch(err){
    //return res.status(401).send(err.message);
    next(err);
}
}

const authorizeUser = (req, res, next) => {
    try{
    if (req.user.role !== 'USER_ROLE') return res.status(403).send('Forbidden.');

    next();
    }catch(err){
        next(err);
    }
};

const authorizeAdmin = (req, res, next) => {
    try{
    if (req.user.role !== 'ADMIN_ROLE') return res.status(403).send('Forbidden for USER_ROLE.');

    next();
    }catch(err){
        next(err);
    }
};

module.exports = {checkAuth,authorizeUser,authorizeAdmin};