const jwt = require("jsonwebtoken");

exports.decode = (verifyToken,secret)=>{
    try{
        let decode = jwt.verify(verifyToken,secret);
        if(decode.payload){
            return decode.payload;
        }else{
            throw new Error("Token expired");
        }
    }catch(error){
        throw error;
    }
}