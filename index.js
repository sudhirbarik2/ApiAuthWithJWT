const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv'); 
dotenv.config()
 //Importing ROutes
 const authRoute=require('./routes/auth')
//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
()=>console.log("Connected to DB")
)
//Applying middleware
app.use(express.json());

 app.use('/',authRoute)

app.listen(3000,()=>console.log("Server is running at 3000"))