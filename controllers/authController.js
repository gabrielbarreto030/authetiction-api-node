const jwt=require("jsonwebtoken")

module.exports=function (req,res,next){
       let token= req.header("authorization-token")
       //pega no header  a essa propriedade q tem o token
       if(!token)  return res.status(401).send("Access Denied")
       //checa se foi enviado o token,se n tem token no header ele breca o resto
       authUser= jwt.verify(token,process.env.SECRET_TO_TOKEN)
       //verifica se este token é valido
       req.user=authUser
       //define um valor para uma nova propriedade na requisicao,para identificao se tem usuario
       next() ///autoriza o prox middleware executar
}