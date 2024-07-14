const List= require('../models/list')
const User = require('../models/user')
const router=require('express').Router()


//create 
router.post('/task',async(req,res)=>{
    try {
        const {title,description,id }=req.body;
    const user=await User.findById(id);
    if(user){
        const list= new List({title,description,user:user})
        await list.save().then(()=>res.status(201).json({message:"Your task is Added and Saved"}))
        user.list.push(list)
        await user.save()
        
        }
        else{
           return res.status(201).json({message:"No user found "})
        }
    } catch (error) {
        return res.status(404).json({message : "Server connection error"})
    }

})

//update todo
router.put('/updateTask/:id',async(req,res)=>{
    try {
        const {title,description,id }=req.body;
    const user=await User.findById(id);
    if(user){
        
       const list=List.findByIdAndUpdate(req.params.id,{title,description}).then(()=>res.status(201).json({message: "List update successfully"}))
        
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Server connection error"})
    }

})


//delete todo
router.delete('/deleteTodo/:id',async(req,res)=>{
    try {
        const { id }=req.body;
    const user=await User.findByIdAndUpdate(id,{$pull:{list :req.params.id}});
    if(user){
        
       const list=List.findByIdAndDelete(req.params.id).then(()=>res.status(201).json({message: "List deleted successfully"}))
        
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({message : "Server connection error"})
    }

})

//gettask
router.get('/getTodo/:id',async(req,res)=>{
    try {
    const list =await List.find({user:req.params.id}).sort({createdAt:-1});
    if(list.length !=0){
        res.status(201).json({list})
       
        }
        else{
            res.status(201).json({message: "No task found"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({message : "Server connection error"})
    }

})




module.exports =router
