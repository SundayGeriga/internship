module.exports =app=>{
    const student_finance_controller =require("../controllers/studentFinance.controller");

    var router = require("express").Router();

    // http://localhost:8081/api/studentms/getstudentfinance
    // route to fetch all student finance information

    router.get("/getstudentfinance", student_finance_controller.GetAllStudentFinance);

    app.use("/api/studentms", router);
}