const express = require('express')
const cors = require('cors')
require('dotenv').config()
const chatRouter = require("./routes/chat")

const app = express()

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    methods: ["GET", "POST"]
}))
app.use(express.json())
app.use("/api/chat", chatRouter)

app.listen(process.env.PORT, (err) => {
    if (err){
        throw err
    }
    console.log("Server started")
})