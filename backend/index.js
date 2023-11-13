
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./userRoutes")

const Port = 5000; //backend running on this port
const Mongo_url = "mongodb://0.0.0.0:27017";
const app = express();
 
app.use(cors());
app.use(express.json());
app.use("/api/auth", userRoutes) //this means add this middleware with every request

mongoose.connect(Mongo_url)
.then( async ()=> {
    console.log("mongoose is connected");
    const db = await mongoose.connection.db;//this is to access the created database 
    const fetchEq = await db.collection("englishtohindi").find().toArray(); //this will get all the data inside easy_questions collections
    

    global.EngtoHinQuestions = fetchEq; //now E_questions is a global variable
    
}).catch((err) => {
    console.log(err);
});


 



app.listen(Port,()=>{
    console.log(`server is listening on port ${Port}`);
})