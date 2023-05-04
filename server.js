const express=require("express");
const jswn=require("jsonwebtoken");
const bodyParser = require("body-parser");
const app=express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
const users=require("./users.json");
app.post("/login",(req,res)=>{
    const user= users.find((usr)=>usr.username===req.body.username);
    if(user){
        if(user.password===req.body.password){
            const token=jswn.sign({Password:user.password},'secretkey');
            res.status(200).send({token:token})
        }
        else{
            res.status(401).send({message:"access denied"})
        }

    }
    else{
        res.status(401).send({message:"access denied"});
    }
   
})
app.listen(8000,()=>{
    console.log("port running at 8000....");
})