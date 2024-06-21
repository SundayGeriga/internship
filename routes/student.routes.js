module.exports = app=>{
    //import student controller

    const student_controller = require("../controllers/student.controller");

    //import Router Interface
    var route =require("express").Router();
   //http://localhost:8081/api/studentms2/getstudents
    //route to fetch all students
    route.get("/getstudents", student_controller.GetAllStudents);

    route.get("/updatestudents/:s_i", student_controller.GetAllPerson);

    route.post("/createNewStudents", student_controller.create_new);

    route.post("/deleteStudents/:s_i", student_controller.delete_student);

    //route.all("/updatestudents/:s_i", student_controller.GetAllPerson);

    //To search a specifice student using first name
    route.get("/findstudents", student_controller.SearchStudent);


    //route to get finance for all students
    route.get("/getstudentfinance", student_controller.GetAllStudentFinance);


    route.get("/totalpayment", student_controller.TotalPayments);
    
    //route to make payment
    route.get("/makepayment", student_controller.MakePayment);

      //route to make payment  
    route.get("/feesbalances", student_controller.FeesBalance);

    //route to make payment  
   // route.get("/trackperformance", student_controller.TrackPerofrmance);


    //define the base route
    app.use("/api/studentms2", route);

   
}



//week 2
/*
   //Add age (min), parent_phone_number(Valid UG No. +256..),
  //Enter gender of enum (M or F),
 //physical address with default kampala
//category (enum day or boarding), status (Boolean 1-student at school, 0-student left school)
*/

//2. week three
// 1. assignment: create a model student_finance with a foreign key called id referencing student model and amount of payment, a controller to access its tables contents and an api route to 
// 2. modify student with fields such as gender as enum etc
