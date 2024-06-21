const { allow } = require("joi");
const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize_config, Sequelize) => {
    const _Student = require("./student.model");
    const Performance = sequelize_config.define("studentperformance",
        {
            SeniorOnePerformance:{
                type:Sequelize.JSONB,
                allowNull:true,
                defaultValue:{
                    Math:null,
                    English:null,
                    Biology:null,
                    chemistry:null,
                    physics:null
                },
            },    
            SeniorTwoPerformance:{
                type:Sequelize.JSONB,
                allowNull:true,
                defaultValue:{
                    Math:null,
                    English:null,
                    Biology:null,
                    chemistry:null,
                    physics:null
                },
            },  
            SeniorThreePerformance:{
                type:Sequelize.JSONB,
                allowNull:true,
                defaultValue:{
                    Math:null,
                    English:null,
                    Biology:null,
                    chemistry:null,
                    physics:null
                },
            }, 
            SeniorFourPerformance:{
                type:Sequelize.JSONB,
                allowNull:true,
                defaultValue:{
                    Math:null,
                    English:null,
                    Biology:null,
                    chemistry:null,
                    physics:null
                },
            },  
            

        }
    );

    return Performance;
}