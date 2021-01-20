const join=require("@hapi/joi")


const registerValidate=(dado)=>{
       let schema=join.object({
           name:join.string().required().min(4).max(50),
           email:join.string().required().min(4).max(100),
           password:join.string().required().min(6).max(200)
       })
       return schema.validate(dado)
}
const loginValidate=(dado)=>{
       let schema=join.object({        
           email:join.string().required().min(4).max(100),
           password:join.string().required().min(6).max(200)
       })
       return schema.validate(dado)
}

module.exports.registerValidate=registerValidate
module.exports.loginValidate=loginValidate