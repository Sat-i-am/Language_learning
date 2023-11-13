const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    language:{
        type: String,
        default: "",
    },
    correct_answers:[{
        type: String,
        default: 0,
    }], 
    wrong_count:[{
        type: String,
        default: 0,
    }],
    correct_count:{
        type: String,
        default: 0,
    },
    proficiency:{
        type: String,
        default: 0,
    },
    current_exercise:{
        type: String,
        default: 0,
    },
    totalPoints: {
        type: Number,
        default: 0,
      },
    difficulty:{
        type: String,
        default:"",
    }
    
})
module.exports = mongoose.model("User", userSchema) 