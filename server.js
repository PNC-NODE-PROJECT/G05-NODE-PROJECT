const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors()); // To allow any origin

// requier .env file
require("dotenv").config();

app.use(express.json()); // To read json data in request body
app.use(express.urlencoded({extended: true}));


require("dotenv").config();

app.listen(process.env.PORT, () => {
  console.log("App run on http://localhost:"+process.env.PORT);
});

// use file 
app.use(express.static("public"));

// require module
const questionRouter = require("./routes/question_routes");
const userRouter = require("./routes/user_routes");

// question routes
app.use('/questions',questionRouter);

// user routes
app.use('/login',userRouter);