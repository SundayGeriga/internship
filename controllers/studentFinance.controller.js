const db =require("../models");

const StudentFinance =db.studentfinances;

exports.GetAllStudentFinance =(req, res)=>{
    StudentFinance.findAll()
    .then(data=>{
        res.send({
            status: "Success",
            status_code: 1002,
            message: "Student information retrieved successfully!",
            results: data
        });
    }).catch(err =>{
        res.send({
            status: "Error",
            status_code:1002,
            message: err.message || "Error occurred while retrieving finance information"
        });
    });
}

exports.GetStudentFinances = (req, res) => {
    finances.findAll({
        attributes: [finance_id],
        include: {
            model: Student,
            as: 'student',
            attributes: []
        }
    })
        .then(
            data => {
                res.send({
                    status: "Success",
                    status_code: 124,
                    message: "Student finances successfully retrieved",
                    results: data
                });
            }

        ).catch(err => {
            res.send({
                status: "Error",
                status_code: 1001,
                message: err.message || "Error occurred while retrieving Students"
            });
        }
        );
}