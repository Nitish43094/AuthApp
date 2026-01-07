const express = require("express")
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 4000
app.use(express.json())

app.get('/',(req,res)=>{
    res.send(`<h1>Ther Auth Server Start</h1>`)
})
app.listen(PORT,()=>{
    console.log("The server started at Port no - ",PORT)
})