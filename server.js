const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // To allow any origin

app.use(express.urlencoded({ extended: true })); // let body know json formath
app.use(express.json()); // To read json data in request body

app.listen(3000, () => {
  console.log("App run on http://localhost:3000");
});

// use file 
app.use(express.static("public"));

// require module
const questions_router = require("./routes/question_routes")

// get data from mongo DB
app.use('/questions',questions_router);