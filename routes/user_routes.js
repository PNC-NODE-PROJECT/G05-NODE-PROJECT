const express = require('express')
const router = express.Router();

const usersModel = require("../models/user_model").usersModel;

// login
router.post("/",(req, res) => {
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

// get user info
router.get('/user',(req,res)=>{
    usersModel.find()
    .then((result)=> {
        res.send(result);
    })
})

module.exports = router;