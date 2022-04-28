const express = require('express')
const router = express.Router();

// import question model
const myModel = require("../models/question_model");
const questionsModel = myModel.questionsModel;

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

// delete data from mongo DB
router.delete("/:id",(req, res) => {
    questionsModel.deleteOne({_id:req.params.id})
    .then(result => {
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});

// get list of question from database
router.get('/',(req,res)=>{
    questionsModel.find()
    .then((result) => {
        res.send(result)
    })
    .catch(error => {
        res.send(error);
    });
});

// get list of question from database
router.get('/:id',(req,res)=>{
    questionsModel.find({_id:req.params.id})
    .then((result) => {
        res.send(result)
    })
    .catch(error => {
        res.send(error);
    });
});

// edit questions
router.put("/:id",(req, res) => {
    questionsModel.updateOne({_id:req.params.id},req.body)
    .then(result => {
        res.send(result);
    })
    .catch((error)=>{
        res.send(error);
    });
});

// export router
module.exports = router;