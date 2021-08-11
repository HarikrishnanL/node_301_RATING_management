const redis = require('redis');
const port_redis = 6379;
const redis_client = redis.createClient(port_redis);

redis_client.on("connect",(error)=>{
    if(error){
        console.log("redis error",error);
    }else{
        console.log("redis database connected")
    }
})

module.exports = redis_client