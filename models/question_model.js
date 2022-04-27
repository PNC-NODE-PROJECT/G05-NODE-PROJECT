const mongoose = require("mongoose");

// requier .env file
require("dotenv").config();

// connect to DB
mongoose.connect('mongodb://localhost:27017/'+process.env.DB_NAME,{useUnifiedTopology:true});

const questionsSchema = new mongoose.Schema({
    title:String,
    answers: {
        answer1: {
            value:String, 
            status:Boolean
        },
        answer2: {
            value:String, 
            status:Boolean
        },
        answer3: {
            value:String, 
            status:Boolean
        },
        answer4: {
            value:String, 
            status:Boolean
        }
    }
});

// Create the Model for the Tasks collection from Schema
const questionsModel = mongoose.model("questions",questionsSchema);


// export model 
module.exports.questionsModel = questionsModel; 