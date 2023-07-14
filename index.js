import express from "express";
import { studentsRouter } from "./Routers/students.js";
import { mentorsRouter } from "./Routers/mentors.js";
import { usersRouter } from "./Routers/users.js";
import dotenv from "dotenv"
import { isAuthenticated } from "./Authentication/auth.js";
import cors from "cors"
//configure thhe environment
dotenv.config();
const PORT=process.env.PORT 

// initialize express server framework
const app = express();
// MiddleWare
app.use(express.json());
app.use(cors());
//studentsRouter
app.use("/students",isAuthenticated,studentsRouter);
//MentorsRouter
app.use("/mentors",isAuthenticated,mentorsRouter);
//UserssRouter
app.use("/users",usersRouter);
// listen to a server
app.listen(PORT, () => console.log(`Server Running in localhost:${PORT}`));


