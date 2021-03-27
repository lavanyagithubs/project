//import expressmodule
const exp = require("express");
const app = exp();

//import path module
const path = require("path");

//import mongodb module
const mc = require("mongodb").MongoClient;
require("dotenv").config();

//import api objects
const userApiObj = require("./APIS/userApi");
const notesApiObj = require("./APIS/notesApi");


//import express-async-handler
//const asyncErrHandler = require("express-async-handler");

//forward



app.use("/user",userApiObj);
app.use("/notes",notesApiObj);
//app.use("/admin",adminApiObj);

app.use(exp.static(path.join(__dirname,"./dist/googlekeep")));


//db url
const dburl=process.env.dburl

//db connectivity
mc.connect(dburl,{useNewUrlParser:true,useUnifiedTopology:true})
.then(client=>{

    //get database object
    const databaseObject = client.db("ToDoList");
    const userCollectionObject = databaseObject.collection("usercollection");
    const notesCollectionObject = databaseObject.collection("notescollection");
    
    //sharing collection object
    app.set("userCollectionObject",userCollectionObject);
    app.set("notesCollectionObject",notesCollectionObject);
    console.log("Connected to database server...");
})
.catch(err=>console.log("err in db connection",err));

//middleware to handle invalid path
app.use((req,res,next)=>{
    res.send({message:`${req.url} is invalid path`});
})


//error handling middleware
app.use((err,req,res,next)=>{
    console.log(err.message)
    res.send({message:"Some error occurred",reason:err.message})
    
})

//assign port number
const port = process.env.port||8000;
app.listen(port, () => {console.log(`Web server is listening on port ${port}..`)});