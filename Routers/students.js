import express  from "express";
import { addStudentsData, deleteStudentData,deleteStudentDataByReq, getAllStudents, getAllStudentsById, updateStudentData } from "../Controllers/student.js";
import {client} from "../db.js";


//initalize the router
const router=express.Router();


//To get any students details
router.get("/all",async(req,res)=>{
    try {
     
        if(req.query.age){
         //if the data content number we need to change to string from number
         req.query.age=+req.query.age;
    
        }
        const students = await getAllStudents(req)
          if(students.length<=0){
            res.status(400).json({data:"User Not Found"})
            return
          }
           res.status(200).json({data:students})
      } catch (error) {
         console.log(error)
         res.send(500).json({data:"Internal Server Error"})
      }
})

//using query Params
router.get("/:id",async(req,res)=>{
  try{
    const {id}=req.params;
    const students=await getAllStudentsById(id);
    if(!students){
      res.status(400).json({data:"User Not Found"})
            return
    } res.status(200).json({data:students})
  }catch (error) {
    console.log(error)
    res.send(500).json({data:"Internal Server Error"})
 }
})

//to add student data
router.post("/addNewData",async(req,res)=>{
  try{
    const newStudent=req.body;
    if(!newStudent){
      res.status(400).json({data:"No details provided"})
    }
    const result=await addStudentsData(newStudent);
    res.status(200).json({data:{result:result,message:"New Student Detail added sucessfully"}})
  }catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
 }
})

//To edit a student data
router.put("/edit/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    const updatedData=req.body;
    if(!id || !updatedData){
      return res.status(400).json({data:"Wrong Request"})
    }
      const result=await updateStudentData(id,updatedData);
       res.status(200).json({data:{result:result,message:"Updated Sucessfully"}})
  } catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
  }
})

// to delete a student data
router.delete("/delete/:id",async(req,res)=>{
  try {
    const {id}=req.params;
    if(!id){
      return res.status(400).json({data:"Wrong Request"})  
    }
    const result=await deleteStudentData(id);
    res.status(200).json({data:{result:result,message:"Deteled Sucessfully"}})
  } catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
  }
})

// to delete student data by req
router.delete("/delete",async(req,res)=>{
  try {
    if(!req.query==false){
      return res.status(400).json({data:"Wrong Request"})  
    }
    const result=await deleteStudentDataByReq(req);
    res.status(200).json({data:{result:result,message:"Deteled Sucessfully"}})
  } catch (error) {
    console.log(error)
    res.status(500).json({data:"Internal Server Error"})
  }
})

// Assign a student to Mentor
router.put('/:studentId/assign', (req, res) => {
  const { studentId } = req.params;
  const { mentorId } = req.body;

  const Mentor = client.db("Guvi").collection("mentor");
  const Student = client.db("Guvi").collection("student");
  
  Promise.all([
    Mentor.findOne({ mentorId: mentorId }),
    Student.findOneAndUpdate(
      { _id: studentId },
      { $set: { mentorId: mentorId } },
      { new: true }
    )
  ])
    .then(([mentor, updatedStudent]) => {
      if (!mentor || !updatedStudent) {
        return res.status(404).json({ error: 'Mentor or student not found' });
      }
  
      res.status(200).json({data:{ mentor, student:updatedStudent}});
    })
    .catch((error) => {
      res.status(500).json({ error: 'Failed to assign mentor to student' });
    });
});


export const studentsRouter=router;