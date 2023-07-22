//IMPORTS FROM PACKAGES
const exp = require('constants');
require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');


//init
const port = process.env.PORT || 3000;
const DB = process.env.dbUrl;
const app = express();

//IMPORTS FROM OTHER FILES
const authRouter = require('./routes/auth');
const MobilesRouter = require('./routes/getMobiles');

//middlewares
app.use(express.json());
app.use(authRouter);
app.use(MobilesRouter);
//CONNECTIONS
mongoose.connect(DB).then(()=>{
    console.log('connection successful');
}).catch((e)=>{
    console.log(e);
})
app.listen(port,()=>{
    console.log("connected to server");
})


