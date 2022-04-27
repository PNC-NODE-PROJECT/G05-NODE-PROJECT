const express = require('express')
const router = express.Router();

// import question model
const questionsModel = require("../models/question_model").questionsModel;

// add question to database
router.post("/",(req, res) => {
    questionsModel.create(req.body)
    .then(result => {
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    }); 
});

module.exports = router;