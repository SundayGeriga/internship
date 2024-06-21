module.exports =(sequelize_config, Sequelize)=>{
    const Student =sequelize_config.define('student',
    {
        student_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        first_name:{type:Sequelize.STRING,allowNull:false},
        last_name:{type:Sequelize.STRING,allowNull:false},
        class:{type:Sequelize.STRING},
        gender: {
            type: Sequelize.ENUM,
            values: ['F', 'M']
        },
        age: {
            type: Sequelize.INTEGER,
            min: 10,
            allowNull: false
        },
        parent_phone_number: {
            type: Sequelize.STRING,
            allowNull: false
        },
        physical_address: {
            type: Sequelize.STRING,
            defaultValue: 'Kampala'
        },
        category: {
            type: Sequelize.ENUM,
            values: ['DAY', 'BOARDING']
        },
        class: { type: Sequelize.STRING },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
        },
        //O-level Performance 
        {
            defaultScope: {
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'student_id']
                }
            }
        }
    );
    return Student;
}

   //Add age (min), parent_phone_number(Valid UG No. +256..),
  //Enter gender of enum (M or F),
 //physical address with default kampala
//category (enum day or boarding), status (Boolean 1-student at school, 0-student left school)
  