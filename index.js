const express = require("express")
const dbConnection = require('./config/dbConnection')
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000
const user = require('./route/user')

app.use(express.json())
dbConnection();
app.use('/api/v1',user)
app.get('/',(req,res)=>{
    res.send(`<h1>Ther Auth Server Start</h1>`)
})
app.listen(PORT,()=>{
    console.log("The server started at Port no - ",PORT)
})