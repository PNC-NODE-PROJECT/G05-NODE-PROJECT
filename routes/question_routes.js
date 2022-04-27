const express = require('express')
const router = express.Router();

// import question model
const questionsModel = require("../models/question_model").questionsModel;

router.get('/',(res,req)=>{
    questionsModel.find()
    .then((result) => {
        res.send(result);
    })
});

module.exports = router;