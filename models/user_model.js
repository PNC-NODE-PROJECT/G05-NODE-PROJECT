const mongoose = require("mongoose");

// requier .env file
require("dotenv").config();

// connect to DB
mongoose.connect(process.env.DB_CONNECTION,{useUnifiedTopology:true});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

// Create the Model for the Tasks collection from Schema
const usersModel = mongoose.model("users",userSchema);
// export the Model
module.exports.usersModel = usersModel; 