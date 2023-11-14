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
    // correct_answers:[{ not storing correct answers for now
    //     type: String,
    //     default: 0,
    // }], 
    wrong_count:{
        type: Number,
        default: 0,
    },
    correct_count:{
        type: Number,
        default: 0,
    },
    proficiency:{
        type: Number,
        default: 0,
    },
    current_exercise:{
        type: Number,
        default: 1,
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