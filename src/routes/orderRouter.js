const express = require('express');
const Orders = require('../models/ordersModel');

const orderRouter = express.Router();

orderRouter.get('/', async(req,res)=>{
    const orders = await Orders.find().populate('user');
    res.send(orders);
})

orderRouter.get('/:id', async(req,res)=>{
    const id = req.params.id;
    try{
        const orders = await Orders.find({user: id}).populate('user');
        res.send(orders);
    }
    catch(err){

    }

})

orderRouter.post('/addOrder', async (req,res)=>{
    try{
        const {products, user, status, totalPrice} = req.body;
        // console.log(req.body);
        const newOrder = new Orders({ 
            products: products,
            user: user,
            status: status,
            totalPrice: totalPrice
        });
        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    }
    catch(err){
        res.status(500).json({error: "asfd"})
    }
});

orderRouter.patch('/:order', async(req,res)=>{
    try{
        const orderId = req.params.order;
        const order = await Orders.findById(orderId);
        if(order){
            order.status = req.body.status;
            const updatedOrder = await order.save();
            res.send(updatedOrder);
        }
    }
    catch(error){
        res.status(404).send({message: error});
    }
})

orderRouter.delete('/:order', async(req,res)=>{
    try{
        const orderId = req.params.order;
        const order = await Orders.findById(orderId);
        if(order){
            const deletedOrder = await order.deleteOne();
            res.send(deletedOrder);
        }
    }
    catch(error){
        res.status(404).send({message: error});
    }
})

module.exports = orderRouter;