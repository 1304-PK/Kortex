const express = require('express')
const generateResponse = require('../services/groq')

const chatRouter = express.Router()

chatRouter.post("/get-response", async (req, res) => {
    const {prompt} = req.body
    if (prompt.trim().length>100){
        return res.status(400).json({errMsg: "Prompt length cannot be over 100"})
    }
    if (prompt.trim().length===0){
        return res.status(400).json({errMsg: "Prompt cannot be empty"})
    }
    
    const coursePath = await generateResponse(prompt)
    res.json({aiResponse: coursePath})
})

module.exports = chatRouter