const express = require('express');
const Filters = require('../models/filterModel');
const expressAsyncHandler = require('express-async-handler');
const filterRouter = express.Router();

filterRouter.get('/', async (req,res)=>{
    const filters = await Filters.find();
    res.send(filters);
});

module.exports = filterRouter;