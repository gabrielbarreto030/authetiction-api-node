const express=require("express")
var route=express.Router()
const userController=require("../controllers/userControl")

route.post("/register",userController.register)
route.post("/login",userController.login)
//2 rostas para executar o registro e login
module.exports=route