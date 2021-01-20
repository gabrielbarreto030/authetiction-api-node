const mongoose=require("mongoose")
//Criando um usuario com nome,email,senha e data de criacao
const userSchem= mongoose.Schema({
    name:{type:String,required:true,minlength:4,maxlength:50},
    email:{type:String,required:true,minlength:4,maxlength:100},
    password:{type:String,required:true,minlength:6,maxlength:200},
    admin:{type:Boolean,default:false}, //propriedade pra checar se é admin ou n
    create_date:{type:Date,default: Date.now()}
})


module.exports =  mongoose.model("User",userSchem)
