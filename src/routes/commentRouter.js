const express = require('express');
const Comment = require('../models/commentsModel');
const commentRouter = express.Router();

commentRouter.get('/:id', async(req,res)=>{
    try{
        const productid = req.params.id;
        const comments = await Comment.find({product: productid}).populate('user');
        // console.log(comments);
        res.send(comments);
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Ошибка"});
    }
})

commentRouter.post('/addComment', async(req,res)=>{
    const {content, user, product, rating} = req.body;
    const newComment = new Comment({
        content: content,
        user: user,
        product: product,
        rating: rating
    })
    const createdComment = await newComment.save();
    res.send({createdComment});
});

commentRouter.delete('/:id', async(req,res)=>{
    const id = req.params.id;
    const comment = await Comment.findById(id);
    try{
        const deletedComment = comment.deleteOne();
        res.status(200).send({ message: 'product deleted', comment: deletedComment });
    }
    catch(err){
        console.log(err);
        res.status(500).send({message: "Комментарий не найден!"});
    }
})

commentRouter.patch('/:id', async(req,res)=>{
    const id = req.params.id;
    const comment = await Comment.findById(id);
    if(comment){
        comment.content = req.body.content || comment.content;
        const updatedComment = await comment.save();
        res.send({
            message: 'Comment updated',
            comment: updatedComment.content,
        });
    }
    else{
        res.status(400).send({message: "Комментарий не найден!"});
    }
})

module.exports = commentRouter;