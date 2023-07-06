import { ObjectId } from "mongodb";
import {client} from "../db.js";

//To get details by key &value
export function getAllStudents(req){
    return client
    .db("Guvi")
    .collection("student")
    .find(req.query)//get by our requirement in postman 
    .toArray();
}

// to get details only by Object Id
export function getAllStudentsById(id){
    return client
    .db("Guvi")
    .collection("student")
    .findOne({_id:new ObjectId(id)})//get by our requirement in postman 
   
}

//to add new data 
export function addStudentsData (data){
    return client
    .db("Guvi")
    .collection("student")
    .insertOne(data)
}

//to edit a student data
export function updateStudentData(id,updatedData){
    return client
    .db("Guvi")
    .collection("student")
   .findOneAndUpdate({_id:new ObjectId(id)},{$set:updatedData})
}

//to delete a student data
 export function deleteStudentData(id){
    return client
    .db("Guvi")
    .collection("student")
   .deleteOne({_id:new ObjectId(id)})
 }

 //  to delete a student data by req
 export function deleteStudentDataByReq(req){
    return client
    .db("Guvi")
    .collection("mentor")
   .deleteOne(req.query)
 }