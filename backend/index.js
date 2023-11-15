
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./userRoutes")

const app = express();
 
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes) //this means add this middleware with every request

mongoose.connect(process.env.MONGO_URL)
.then( async ()=> {
    console.log("mongoose is connected");
    const db = await mongoose.connection.db;//this is to access the created database 
    const fetchEq = await db.collection("englishtohindi").find().toArray(); //this will get all the data inside easy_questions collections
    const fetchHq = await db.collection("hinditoenglish").find().toArray(); 

    global.EngtoHinQuestions = fetchEq; //now E_questions is a global variable
    global.HintoEngQuestions = fetchHq; //now E_questions is a global variable

    
}).catch((err) => {
    console.log(err);
});




app.listen(process.env.PORT,()=>{
    console.log(`server is listening on port ${process.env.PORT}`);
}) 