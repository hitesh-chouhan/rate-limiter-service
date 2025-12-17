const redis = require("../config/redis");

const USER_LIMIT = 5; //Per Minute
const IP_LIMIT = 20; //Per Minute
const WINDOW = 60; //Seconds

module.exports = async(req,res,next)=>{
    try{
        const userId = req.headers.userId;

        if(!userId){
            return res.status(400).json({message : "userId header is required"});
        }

        const ip = req.headers["x-forwarded-for"]?.split(",")[0] || req.ip;
        const userKey = `rete : user: ${userId}`;
        const ipKey = `rate : ip : ${ip}`;
        const userCount = await redis.incr(userKey);
        const ipCount = await redis.incr(ipKey);

        if(userCount === 1) await redis.expire(userKey,WINDOW);
        if(ipCount === 1) await redis.expire(ipKey,WINDOW);

        if(userCount>USER_LIMIT){
            return res.status(429).json({
                message : "user rate limit exceeded"
            })
        }

        if(ipCount>IP_LIMIT){
            return res.status(429).json({
                message : "IP rate limit exceeded"
            })
        }
        next();
    }
    catch(error){
        console.log("Rate liiter error: ", error);
        res.status(500).json({message: "Internal server error"})
    }
}