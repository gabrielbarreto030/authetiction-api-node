const User=require("../model/User")
const bcrypt=require("bcryptjs")
const jwt=require("jsonwebtoken")
const {registerValidate,loginValidate}=require("../controllers/validation")

var userController={
    register:async function(req,res){
        let  {error}= registerValidate(req.body)
        if(error)return res.send(error.message)


        emailAlReady= await User.findOne({email:req.body.email})
        if(emailAlReady){
            res.status(400).send("Email already exists")
            //checando se o email ja existe,caso ss enviar erro
        }
       
       
       let user= new User({
           name:req.body.name,
           email:req.body.email,
           password:bcrypt.hashSync(req.body.password) //Criptografando a senha,é necessario apenas colocar a senha dentro da funcao
           //colocando os dados no modelo
       })
       
       try {
           let userSave= await user.save()
           //salvando modelo e enviando resposta
           res.send(userSave)
       } catch (error) {
           res.status(400).send(error)
           //indicando erro e o status
       }
    },
    login:async function(req,res){
        let  {error}= loginValidate(req.body)
        if(error)return res.send(error.message)
        userDB= await User.findOne({email:req.body.email})//
        if(!userDB){
            res.status(400).send("Email or Password incorrect")
            //enviar erro caso n ache o email
        }
        const PasswordCompare=await bcrypt.compareSync(req.body.password,userDB.password)
        //comparando a senha enviada do usuario com a do banco de dados
        //essa comparacao retorna true se as senhas foram iguais ou false se nao sao
        if(!PasswordCompare) res.status(400).send("Email or Password incorrect")
       let token= jwt.sign({id:userDB._id,admin:userDB.admin},process.env.SECRET_TO_TOKEN)
       //no admin ele define no token tbm para saber se o user é admin ou n
       /*Criando um Token para o sistema identificar o usuario durante o funcionamento do sistema 
       ele devolve o token e como parametro recebe um objeto ou um dado,neste caso estamos enviando
       apenas o id , e como 2 paramentro ele recebe o segredo QUE Nós TEMOS Q TER NO sistema
       */
        res.header({"authorization-token":token})
        //enviamos o token do header,mas q fique claro acima poderiamos colocar qq chave
        //
        res.send("User logged!")
      
    }
}//Objeto com os metodos de Regra de negocio
module.exports=userController