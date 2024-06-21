module.exports={
    HOST: "localhost", //hostname
    USER: "root", //username
    PASSWORD: "",  //user password
    DB: "studentms2",  //database name
    dialect:"mysql",  //database type
    pool:{
        //Maximum number of connections
        max:5,
        //Minimum number of connections
        min:0,
        ///maximum time in milliseconds that pool will try to get
        acquire:30000,

        //maximum time in milliseconds that the connections can be idle
        idle:10000,

    }
}