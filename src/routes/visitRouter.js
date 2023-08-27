const Visit = require('../models/visitModel');
const express = require('express');
const visitRouter = express.Router();

visitRouter.get('/', async (req,res)=>{
    try{
        const visit = new Visit();
        visit.count += 1;
        await visit.save();
        res.send({message: "Статистика сохранена!"}); 
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Ошибка сервера."});
    }
});

module.exports = visitRouter;