const express = require('express');
const Discount = require('../models/discountModel');
const discountRouter = express.Router();

discountRouter.get('/', async(req,res)=>{
    const discounts = await Discount.find();
    res.send(discounts);
})

discountRouter.post('/addDiscount', async(req,res)=>{
    try{
        const {nameDiscountValue, countDiscountValue, amountDiscountValue, typeDiscountValue} = req.body;
        const newDiscount = new Discount({
            name: nameDiscountValue,
            count: countDiscountValue,
            amount: amountDiscountValue,
            type: typeDiscountValue
        });
        const createdDiscount = await newDiscount.save();
        res.status(201).send({message: "discount created succesfully"});
    }
    catch(err){
        console.log(err);
        res.status(500).send({error: err});
    }
})

module.exports = discountRouter;