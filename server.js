const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // To allow any origin

app.use(express.json()); // To read json data in request body
app.use(express.urlencoded({extended: true}));

app.listen(3000, () => {
  console.log("App run on http://localhost:3000");
});

// use file 
app.use(express.static("public"));

// require module
const question_router = require("./routes/question_routes");
const user_router = require("./routes/user_routes");

// question routes
app.use('/questions',question_router);

// user routes
app.use('/login',user_router);

