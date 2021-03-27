// create mini express app
const exp=require("express");
const userApiObj=exp.Router();
const errorHandler=require("express-async-handler");
const bcryptjs=require("bcryptjs")
const jwt=require("jsonwebtoken")


userApiObj.use(exp.json());






// for user registration

// get req handler
userApiObj.post("/register",errorHandler( async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject");
    let userObj=req.body;
    
//   check for user in database
let user=await userCollectionObject.findOne({username:userObj.username})
// if user existed
if(user!==null){
res.send({message:"user existed"})
}
else{
let hashedpw=await bcryptjs.hash(userObj.password,5)
userObj.password=hashedpw;

let success=await userCollectionObject.insertOne(userObj)   
    res.send({message:"user created"})
}
}))








// for user login

userApiObj.post("/userDashboard",errorHandler(async(req,res,next)=>{
    userCollectionObject=req.app.get("userCollectionObject");
    userCredObj=req.body;
user=await userCollectionObject.findOne({username:userCredObj.username});
if(user==null)
{
    res.send({message:"Invalid username"})
    
}
else{
    status=await bcryptjs.compare(userCredObj.password,user.password);
    if(status)
    {
        token=await jwt.sign({username:user.username},"abcd",{expiresIn:10});
        res.send({message:"success",signedToken:token,username:user.username});

    }
    else{
        res.send({message:"Invalid Password"});
    }
}}))



// for password reset
userApiObj.post("/passwordreset",errorHandler(async(req,res,next)=>{
    let userCollectionObject=req.app.get("userCollectionObject")
    let obj=req.body;
    let hash=await bcryptjs.hash(obj.password1,6)
    let success=await userCollectionObject.updateOne({username:obj.username},{$set:{
        password:hash}
    })
    res.send({message:"success"})
}))




// export
module.exports=userApiObj;
