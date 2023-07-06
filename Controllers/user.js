import { client } from "../db.js";
import  jwt  from "jsonwebtoken";
import dotenv from "dotenv"

//configure thhe environment
dotenv.config();
const SECRETKEY=process.env.SECRETKEY 
export function addUsers(userInfo){
    return client
    .db("Guvi")
    .collection("users")
    .insertOne(userInfo)
}

export function getUser(userEmail){
    return client
    .db("Guvi")
    .collection("users")
    .findOne({email:userEmail})
}
 export function generateJwtToken(id){
    return jwt.sign({id},SECRETKEY,{expiresIn:"30d"})
 }
