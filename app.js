/*API REST
a ideia é fazer uma api rest , sem views,que pode ser consumida por um app mobile tbm*/
const dotenv=require("dotenv").config()//Ja configura as variaveis ambiente
const express=require("express")
const mongoose=require("mongoose")
let app=express()

const userRoute=require("./routes/userRoute")//chamando rota
const adminRoute=require("./routes/adminRoute")
//conectanto no banco com a url passada no env e parametros expostos
mongoose.connect(process.env.MONGO_URL_CONNECT,{useNewUrlParser:true,useUnifiedTopology:true},(err)=>{
    //funcao pra qnd indicar se foi possivel a conexao com banco
    if(err)console.log("Houve um erro")
    else console.log("Mongo Connected")    
})
app.use("/admin",adminRoute)//rota de admin
app.use("/user",express.json(),userRoute)//deixando o acesso a rota para /user
//pegando os dados json
app.listen(process.env.PORT,(err)=>{
    if(!err)console.log("Api is running")
})