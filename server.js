// import modules

//building REST APIs
const express=require("express");

//helps to parse the reuests and create reuest object
const bodyParser=require("body-parser");

const app=express();

//Parse reuests of content-type -application/json
app.use(bodyParser.json());


//parse reuest of content type -application/x-www-form-url
app.use(bodyParser.urlencoded({extended: true}))

//import models 
const db =require("./models");


db.sequelize_config.sync(
  {force:false}
).then(
  () => {
    console.log("synced db");
  }
);


//API routes 
app.get("/n", (req, res)=>{
    res.json(
        {
            "status":"Ok",
            "status-code":100,
            "message": "Welcome to this API"
        }
    );
});


//API Route
app.post("/data", (req, res) => {
    const data = req.body.data;
    if (!data) {
      res.json({
        "status": "Failed",
        "status-code": 400,
        "message": "Daat is not available!"
      })
    } else {
      res.json({
        "status": "Error",
        "status-code": 400,
        "message": "Please provide your name as a query parameter",
        "data":`Result - ${data}`
      });
    }
  });

  //Exercise
  app.post("/add", (req, res)=>{
    const num1=req.body.num1;
    const num2=req.body.num2;
    const operator=req.body.operator;

    //Input validation
    if(typeof num1 !=='number'||typeof num2 !=='number'){
        return res.status("Okay").json({
            "status-code":400,
            "message":"Invalid input!"
        })
    }
    const add =num1 + num2;
    res.json({
        "status": "Okay",
        "status-code":400,
        "result":add
        
    });
  });
//import student route
require("./routes/student.routes.js")(app);

//import StudentFinance route
require("./routes/studentFinance.routes")(app);


//define port for project
const PORT=8081

//Monitor when the server starts
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});