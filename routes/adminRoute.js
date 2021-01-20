const express=require("express")
var route=express.Router()
const auth=require("../controllers/authController")
//ROTA PARA ADMINISTRADOR


route.get("/",auth,(req,res)=>{
    if(req.user.admin){
        //checa se a propriedade admin é false ou verdadeira,se for verdadeira ele autoriza o acesso a rota
        // se n mostra bloqueado
        res.send("Rota para o administrador")
    }else{
        res.send("admin:Access Denied")
    }
    
})
route.get("/free",auth,(req,res)=>{
    //permite acesso a usuario logado
    if(req.user){
        res.send("Acesso permitido")
    }else{
        res.send("acesso bloqueado")
    }
    
})


//2 rostas para executar o registro e login
module.exports=route