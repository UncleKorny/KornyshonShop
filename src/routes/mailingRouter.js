const express = require('express');
const Mailing = require('../models/mailingModel');

const mailingRouter = express.Router();

mailingRouter.post('/addEmail', async (req,res)=>{
    try{
        const {email} = req.body;
        // console.log(req.body);
        const newEmail = new Mailing({ 
            email: email
        });
        const savedEmail = await newEmail.save();
        res.status(201).json(savedEmail);
    }
    catch(err){
        res.status(500).json({error: "asfd"})
    }
});

module.exports = mailingRouter;