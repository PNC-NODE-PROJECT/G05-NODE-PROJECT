const mongoose = require("mongoose");

// requier .env file
require("dotenv").config();

// connect to DB
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology:true});
// mongoose.connect('mongodb://localhost:27017/'+process.env.DB_NAME,{useUnifiedTopology:true});

const questionsSchema = new mongoose.Schema({
    title:String,
    answers: [
        {"value":String,"status":{type:Boolean,default:false}}
    ]
});

// Create the Model for the Tasks collection from Schema
const questionsModel = mongoose.model("questions",questionsSchema);


// export model 
module.exports.questionsModel = questionsModel; 
