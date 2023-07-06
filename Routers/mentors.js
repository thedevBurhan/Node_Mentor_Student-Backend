import express  from "express";
import { addMentorsData, deleteMentorData,deleteMentorDataByReq, getAllMentors, getAllMentorsById, updateMentorData } from "../Controllers/mentor.js";
//initalize the router
const router=express.Router();

//To get any mentors details
router.get("/all",async(req,res)=>{
    try {
        if(req.query.age){
         //if the data content number we need to change to string from number
         req.query.age=+req.query.age;
    
        }
        if(req.query.experience){
            //if the data content number we need to change to string from number
            req.query.experience=+req.query.experience;
       
           }
        const mentors = await getAllMentors(req)
          if(mentors.length<=0){
            res.status(400).json({data:"User Not Found"})
            return
          }
           res.status(200).json({data:mentors})
      } catch (error) {
         console.log(error)
         res.send(500).json({data:"Internal Server Error"})
      }
})

//using query Params
router.get("/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const mentors=await getAllMentorsById(id);
    if(!mentors){
      res.status(400).json({data:"User Not Found"})
            return
    } res.status(200).json({data:mentors})
  }catch (error) {
    console.log(error)
    res.send(500).json({data:"Internal Server Error"})
 }
})

//to add Mentor data
router.post("/addNewData",async(req,res)=>{
  try{
    const newMentor=req.body;
    if(!newMentor){
      res.status(400).json({data:"No details provided"})
    }
    const result=await addMentorsData(newMentor);
    res.status(200).json({data:{result:result,message:"New Mentor Detail added sucessfully"}})
  }catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
 }
})

//To edit a Mentor data
router.put("/edit/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    const updatedData=req.body;
    if(!id || !updatedData){
      return res.status(400).json({data:"Wrong Request"})
    }
      const result=await updateMentorData(id,updatedData);
       res.status(200).json({data:{result:result,message:"Updated Sucessfully"}})
  } catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
  }
})

// to delete a Mentor data by id
router.delete("/delete/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).json({data:"Wrong Request"})  
    }
    const result=await deleteMentorData(id);
    res.status(200).json({data:{result:result,message:"Deteled Sucessfully"}})
  } catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
  }
})
//to delete Mentor data by req
router.delete("/delete",async(req,res)=>{
    try {
      if(!req.query==false){
        return res.status(400).json({data:"Wrong Request"})  
      }
      const result=await deleteMentorDataByReq(req);
      res.status(200).json({data:{result:result,message:"Deteled Sucessfully"}})
    } catch (error) {
      console.log(error)
      res.status(500).json({data:"Internal Server Error"})
    }
  })


export const mentorsRouter=router;