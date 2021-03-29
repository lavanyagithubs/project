




const exp=require("express")
const notesApiObj=exp.Router();
notesApiObj.use(exp.json())


require("dotenv").config();

notesApiObj.post("/addnote", async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let userObj = req.body;

    let success = await notesCollectionObj.insertOne(userObj)
    res.send({message:"notes created"})
})


notesApiObj.get("/getdetails/:username",async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let userObj = req.body;

    let notes = await notesCollectionObj.find({username:req.params.username}).toArray();

    res.send({message:notes});
})


notesApiObj.delete("/deletenotes/:id",async(req,res)=>{
    let notesCollectionObj=req.app.get("notesCollectionObj");
    
    let userObj = req.body;

    let success = await notesCollectionObj.deleteOne({id:req.params.id});
    

    res.send({message:"success"});
})














module.exports=notesApiObj;