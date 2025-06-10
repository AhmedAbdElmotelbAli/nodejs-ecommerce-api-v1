const express= require('express');// frame work 
const app = express();
const dotenv = require('dotenv'); // config reader
const mongoose = require('mongoose') // database connect
const morgan = require ('morgan'); // now state code in application run is maddle ware between request and response 

dotenv.config({path: 'config.env'});
mongoose.connect(process.env.DATABASE_connect).then((conn)=>{
    console.log(`Database connected ${conn.connection.host}`);
}).catch((err)=>{
    console.log(`database error connection ${err}`);
    process.exit(0);
})

if(process.env.NODE_ENV==  "development"){
    app.use(morgan('dev'))
    console.log(`mode:${process.env.NODE_ENV}`);
}
  
app.get('/',(req , res )=>{
    res.send('our API start v1  ');
})

const PORT = process.env.PORT;
app.listen(PORT, ()=> {
    console.log(`app running on port ${PORT}`)
}) 