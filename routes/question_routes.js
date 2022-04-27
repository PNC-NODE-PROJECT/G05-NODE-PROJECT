const express = require('express')
const router = express.Router();

// import question model
const myModel = require("../models/question_model");
const questionsModel = myModel.questionsModel;

router.get('/',(req,res)=>{
    questionsModel.find()
    .then((result) => {
        res.send(result)
    })
});

module.exports = router;