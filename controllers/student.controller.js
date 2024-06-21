// const { request } = require("express");
const Joi = require('joi');
const db =require("../models");
const { raw } = require('body-parser');

const Student=db.students;

const Operation =db.Sequelize.Op;

// //Retrieve all students from the database
exports.GetAllStudents =(req, res)=>{
    Student.findAll()
    .then(
        data=>{
            res.send({
                status:"Success",
                status_code:1000,
                message:"All students retrieved successfully",
                   number_of_students:data.length,
                results: data
            });
          }
        
    ).catch(err=>{
        res.send({
            status:"Error",
            status_code:1000,
            message:err.message || "Error occurred while retrieving"
        });
    });
  }
// //Update a student  information
  exports.GetAllPerson =(req, res)=>{

    if(req.method == "PUT"){

        // const student_id = req.body.t_id;
        // const student_id = req.params.id;
        // const student_id = req.query.t_id;
        
       const student_id =req.params.s_i;

    Student.update (req.body, {
      where:
      {student_id:student_id}   
  })
    .then(
        data=>{
            res.send({
                status:"Success",
                status_code:1000,
                message:"All students updated successfully",
                results: data
            });
          }
        
    ).catch(err=>{
        res.send({
            status:"Error",
            status_code:1000,
            message:err.message || "Error occurred while updating!"
        });
    });
  }else{

res.status(500).send({
    status: "Error",
    status_code: 1011,
    message: "METHOD NOT ALLOWED"
});

}

}
// // Creating a new student
exports.create_new= (req, res) => {
    if(req.method == "POST") {

       // Add code which detects a wrong field entered
       const schema = Joi.object().keys({
           first_name: Joi.string().required(),
           last_name: Joi.string().required(),
           gender: Joi.string().valid('F', 'M').required(),
           age: Joi.number().integer().min(10).required(),
           parent_phone_number: Joi.string().
               pattern(/\+2567[^469]\d{6}/).required(),
           physical_address: Joi.string().allow('', null),
           category: Joi.string().valid('DAY', 'BOARDING').required(),
           class: Joi.string().allow('', null),
           status: Joi.boolean().allow('', null),
           school_fees_amount: Joi.number().integer(),
           payment: Joi.number().integer().required()
       });

       const result = schema.validate(req.body, { abortEarly: false });

       if (result.error) {
           res.send({
               status: "Error",
               status_code: 413,
               message: "Invalid request data, check the fields!",
               errors: result.error.details
             });
             return;
       }

       const student_data = {
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           gender: req.body.gender,
           age: req.body.age,
           parent_phone_number: req.body.parent_phone_number,
           physical_address: req.body.physical_address,
           category: req.body.category,
           class: req.body.class,
           status: req.body.status
       };

       Student.create(student_data).then(async data => {
           const finance_data = {
               student_id: data.student_id,
               school_fees_amount: req.body.school_fees_amount
           };

           await StudentFinance.create(finance_data)
               .then(finance => {

                   const payment_data = {
                       student_id: data.student_id,
                       amount_paid: req.body.payment
                   }

                   Payments.create(payment_data).then(payment => {
                       res.send({
                           status: "Success",
                           status_code: 100,
                           message: "Student Added",
                           result: finance
                       });
                   }).catch(err => {
                       res.status(500).send({
                           status: "Error",
                           status_code: 101,
                           message: err.message || "Error Occurred While adding a payment"
                       });
                   }) 
               }).catch(err => {
                   res.status(500).send({
                       status: "Error",
                       status_code: 101,
                       message: err.message || "Error Occurred While adding a fees"
                   });
               })
       }).catch(err => {
           res.status(500).send({
               status: "Error",
               status_code: 101,
               message: err.message || "Error Occurred While adding a student"
           });
       });
   } else{
       res.status(500).send({
           status: "Error",
           status_code: 1011,
           message: "METHOD NOT ALLOWED"
       });
   }

}

//Student Balances
exports.Feebalance = (req, res) => {
    if(req.method == "POST") {

       // Add code which detects a wrong field entered
       const schema = Joi.object().keys({
           first_name: Joi.string().required(),
           last_name: Joi.string().required(),
           gender: Joi.string().valid('F', 'M').required(),
           age: Joi.number().integer().min(10).required(),
           parent_phone_number: Joi.string().
               pattern(/\+2567[^469]\d{6}/).required(),
           physical_address: Joi.string().allow('', null),
           category: Joi.string().valid('DAY', 'BOARDING').required(),
           class: Joi.string().allow('', null),
           status: Joi.boolean().allow('', null),
           school_fees_amount: Joi.number().integer(),
           payment: Joi.number().integer().required()
       });

       const result = schema.validate(req.body, { abortEarly: false });

       if (result.error) {
           res.send({
               status: "Error",
               status_code: 413,
               message: "Invalid request data, check the fields!",
               errors: result.error.details
             });
             return;
       }

       const student_data = {
           first_name: req.body.first_name,
           last_name: req.body.last_name,
           gender: req.body.gender,
           age: req.body.age,
           parent_phone_number: req.body.parent_phone_number,
           physical_address: req.body.physical_address,
           category: req.body.category,
           class: req.body.class,
           status: req.body.status
       };

       Student.create(student_data).then(async data => {
           const finance_data = {
               student_id: data.student_id,
               school_fees_amount: req.body.school_fees_amount
           };

           await StudentFinance.create(finance_data)
               .then(finance => {

                   const payment_data = {
                       student_id: data.student_id,
                       amount_paid: req.body.payment
                   }

                   Payments.create(payment_data).then(payment => {
                       res.send({
                           status: "Success",
                           status_code: 100,
                           message: "Student balance fetched successfully",
                           result: finance
                       });
                   }).catch(err => {
                       res.status(500).send({
                           status: "Error",
                           status_code: 101,
                           message: err.message || "Error Occurred While fetching fees balance"
                       });
                   }) 
               }).catch(err => {
                   res.status(500).send({
                       status: "Error",
                       status_code: 101,
                       message: err.message || "Error Occurred While fetching fees balance."
                   });
               })
       }).catch(err => {
           res.status(500).send({
               status: "Error",
               status_code: 101,
               message: err.message || "Error Occurred While  adding student fees balance."
           });
       });
   } else{
       res.status(500).send({
           status: "Error",
           status_code: 1011,
           message: "METHOD NOT ALLOWED"
       });
   }

}



//   //Deleting a student
   exports.delete_student=(req, res) =>{
    const student_id =req.body.student_id;//Acess student ID from request body

//     //Check for student ID in request body (implement if necessary)
    if(!student_id){
        return res.status(400).send({
            status:"Error",
            status_code: 1000,
            message: "Missing student ID in the request body",
        });
    }
 Student.destroy({
    where:{student_id:student_id}})//check if the primary key exist

    .then(
        data =>{
            const results = data ? 1:0;
            res.send({
                status: "Success!",
                status_code:1001,
                message:`Student:   ${student_id } deleted successfully`,
                results,
            });
        
    }).catch(err=>
        res.send({
            status:"Error",
            status_code:1000,
            message: err.message || "Error occurred while deleting a student"
        })
    );
  };
// //Search student
exports.SearchStudent =async (req, res) =>{
    const search_param =req.query.first_name;

    var condition = search_param ? {first_name: {[Operation.like]: `%${search_param}%`}}:null;

        Student.findAll({where:condition})
            .then(
                data => {
                    res.send({
                        status: "Success",
                        status_code: 1000,
                        message: "Students successfully retrieved",
                        number_of_students: data.length,
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

//Get Student finances
exports.GetAllStudentFinance =(req, res)=>{
    StudentFinance.findAll({
        include:[Student],
        //attributes:[
        //'finance_id,
        //[db.Sequelize.fn('sum', db.Sequelzie.col('school_fees_amount')), 'total'],
       // ]
       //group
    })
    .then(
        async data=>{
            const total_expected =await StudentFinance.findAll({
                attributes:[
                    //function
                    [db.Sequelize.fn('sum', db.Sequelize.col('school_fees_amount')), 'total'],
                ],
                raw:true,
            });
            res.send({
                status:"Success",
                status_code:1000,
                message:"All students finances retrieved successfully",
                number_of_students:data.length,
                total_expected:total_expected[0]['total'],
                results: data
            });
          }
        
    ).catch(err=>{
        res.send({
            status:"Error",
            status_code:1000,
            message:err.message || "Error occurred while retrieving finances"
        });
    });
  }

  // Make a payment
exports.MakePayment = async (req, res) => {
    
    console.log("METHOD");
    console.log(req.method);

     if(req.method == "POST"){

        const student_id_dbx = await Student.findByPk(req.body.student_id);
        if(student_id_dbx === null){

            res.send({
                status: "Error",
                status_code: 100,
                message: "Student ID passed Not in the Database",
            }); 

            return;
        }

        if(!req.body.amount_paid){
            res.send({
                status: "Error",
                status_code: 10013,
                message: "Amount Paid is required",
            }); 

            return;
        }

        // Add code which detects a wrong field entered

        const payment_data = {
            amount_paid: req.body.amount_paid,
            student_id: req.body.student_id,
        }

        StudentPayment.create(payment_data).then(
            async data => {
                // if(data == 1){
                    

                    res.send({
                        status: "Success",
                        status_code: 100,
                        message: "Student Payment Added",
                        result: data
                    });
                // }else{
                //     res.send({
                //         status: "Error",
                //         status_code: 100,
                //         message: "Student Not Updated",
                //     }); 
                // }
            }
        ).catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error Occurred While adding a student payment"
            });
        });

     }else{

        res.status(500).send({
            status: "Error",
            status_code: 1011,
            message: "METHOD NOT ALLOWED"
        });

     }

}

// Retrieve all Payments
exports.TotalPayments = (req, res) => {
    StudentPayment.findAll({
        // include: [{model: Student, attributes: []}]
        include: [Student],
        // attributes: [
        //     'finance_id',
        //     [db.Sequelize.fn('sum', db.Sequelize.col('school_fees_amount')), 'total_expected'],
        // ],
        // group
    }).then(
            async data => {

                const total_payments_received = await StudentPayment.findAll({
                    attributes: [
                        // function to calc the sum
                        [db.Sequelize.fn('sum', db.Sequelize.col('amount_paid')), 'total'],
                    ],
                    raw: true,
                });

                res.send({
                    status: "Success",
                    status_code: 1000,
                    message: "Student Payments successfully retrieved",
                    number_of_students: data.length,
                    total_payments_received: total_payments_received[0]['total'],
                    results: data
                });
            }

        ).catch(err => {
            res.send({
                status: "Error",
                status_code: 1001,
                message: err.message || "Error occurred while retrieving Student Finances"
            });
        }
        );
}

// Make a payment
exports.FeesBalance = async (req, res) => {
    
    console.log("METHOD");
    console.log(req.method);

     if(req.method == "GET"){

        StudentFinance.findAll({

        }).then(
            async data => {
            
                    res.send({
                        status: "Success",
                        status_code: 100,
                        message: "Student Balances",
                        result: data
                    });
                
            }
        ).catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error Occurred While fetching student balances"
            });
        });

     }else{

        res.status(500).send({
            status: "Error",
            status_code: 1011,
            message: "METHOD NOT ALLOWED"
        });

     }

}

//Retrieve students performance per class

exports.TrackPerformance = async (req, res) => {

    console.log("METHOD");
    console.log(req.method);

    if(req.method == "GET"){

        Performance.findAll({
            include: [
                {
                    model: _Student,
                    as: 'student',
                },
            ],
        }).then(
            async data => {

                res.send({
                    status: "Success",
                    status_code: 100,
                    message: "Student Performances",
                    result: data
                });

            }
        ).catch(err => {
            res.status(500).send({
                status: "Error",
                status_code: 101,
                message: err.message || "Error Occurred While fetching student performances"
            });
        });

    } else {

        res.status(500).send({
            status: "Error",
            status_code: 1011,
            message: "METHOD NOT ALLOWED"
        });

    }

}





  