const Route = require("./Routes/routes");
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const cors = require('cors');
const db = require("./connection/db");
const  sequelize = db.sequelize;
const cluster = require("cluster");
const totalCpu = require("os").cpus().length;

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*" );
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(bodyParse.json());    
app.use(bodyParse.urlencoded({ extended: false }));
app.use("*",cors())



// cluster
if(cluster.isMaster) {
console.log("test"+totalCpu);
console.log(process.pid);
// cluster.fork();
// cluster.fork();

} else {

}


// Route middleware 
app.use("/api",Route);

// if url not match for api 
app.use((req, res, next) => {
    const error = new Error('URL Not Valid.');
    error.status = 404;
    next(error);
  });


  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
          error: {
                message: error.message
          }
    });
  }); 


  sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
//   api SERVER CREATE 
var port = process.env.PORT || 8000;
app.listen(port, () => { console.log(`Server is running on:${port}`); });
// console.log(conector);