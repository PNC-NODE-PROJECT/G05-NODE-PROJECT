const express = require('express')
const router = express.Router();

const usersModel = require("../models/user_model").usersModel;

// login
router.post("/login",(req, res) => {
    let userData = req.body;
    let isValid = false;
    usersModel.find(userData)
    .then((result) => {
        if (result.length>0) {
            isValid = true;
        }
      res.send(isValid);
    });
});
// get all the users
router.get("/",(req,res)=>{
    // let mail = req.body;
    // let isCorrect = true;
    usersModel.find()
    .then((result)=>{
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    });
})

// create new user account
router.post("/register",(req, res) => {
    usersModel.create(req.body)
    .then(result => {
        res.send(result);
    })
    .catch((error)=>{
        console.log(error);
    }); 
});

module.exports = router;