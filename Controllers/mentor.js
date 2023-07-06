import { ObjectId } from "mongodb";
import {client} from "../db.js";

//To get details by key &value
export function getAllMentors(req){
    return client
    .db("Guvi")
    .collection("mentor")
    .find(req.query)//get by our requirement in postman 
    .toArray();
}

// to get details only by Object Id
export function getAllMentorsById(id){
    return client
    .db("Guvi")
    .collection("mentor")
    .findOne({_id:new ObjectId(id)})//get by our requirement in postman 
   
}

//to add new data 
export function addMentorsData (data){
    return client
    .db("Guvi")
    .collection("mentor")
    .insertOne(data)
}

//to edit a mentor data
export function updateMentorData(id,updatedData){
    return client
    .db("Guvi")
    .collection("mentor")
   .findOneAndUpdate({_id:new ObjectId(id)},{$set:updatedData})
}

//to delete a mentor data by id
 export function deleteMentorData(id){
    return client
    .db("Guvi")
    .collection("mentor")
   .deleteOne({_id:new ObjectId(id)})
 }
//  to delete a mentor data by req
 export function deleteMentorDataByReq(req){
    return client
    .db("Guvi")
    .collection("mentor")
   .deleteOne(req.query)
 }