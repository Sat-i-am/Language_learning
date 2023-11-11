const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
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
        required: true,
    },
    correct_answers:[{
        type: String,
        default: 0,
    }], 
    wrong_count:[{
        type: String,
        default: 0,
    }],
    proficiency:{
        type: String,
        default: 0,
        required: true,
    },
    current_exercise:{
        type: String,
        default: 0,
        required: true,
    },
    totalPoints: {
        type: Number,
        default: 0,
      },
    
})
module.exports = mongoose.model("User", userSchema)