const express = require('express');
const User = require('../models/userModel');
const Comment = require('../models/commentsModel.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../../utils');
const expressAsyncHandler = require('express-async-handler');

const userRouter = express.Router();
userRouter.get('/', async (req, res) => {
    const users = await User.find();
    res.send(users);
});
userRouter.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.send(user);
    }
    else {
        res.status(404).send({ message: "user not found" });
    }
})
userRouter.patch(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        let profileSrc;
        if (req.body.fileName) {
            profileSrc = `/images/${req.body.fileName}`;
        }
        else {
            profileSrc = user.profileImage;
        }
        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.profileImage = profileSrc;
            user.isAdmin = req.body.isAdmin;
            user.isModer = req.body.isModer;
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                profileImage: `/images/${updatedUser.profileImage}`,
                isAdmin: updatedUser.isAdmin,
                isModer: updatedUser.isModer,
            });
        } else {
            res.status(404).send({ message: 'User not found' });
        }
    })
)
userRouter.delete(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user) {
            const comments = await Comment.find({ user: userId });
            if (comments.length > 0) {
                await Comment.deleteMany({ user: userId });
            }
            const deletedUser = await user.deleteOne();
            res.send({ message: 'user deleted', user: deletedUser, comments: comments });
        }
        else {
            res.status(404).send({ message: 'user not found' });
        }
    })
)
userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findOne({ email: req.body.email });
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    profileImage: user.profileImage,
                    isAdmin: user.isAdmin,
                    isModer: user.isModer,
                    token: generateToken(user),
                });
                return;
            }
        }
        res.status(401).send({ message: 'invalid email or password' });
    })
);

userRouter.post(
    '/signup',
    expressAsyncHandler(async (req, res, next) => {
        try {


            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password),
            });
            const user = await newUser.save();
            res.send({
                _id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
                isModer: user.isModer,
                token: generateToken(user),
            });
        } catch (error) {
            next(error);
        }
    })
)

module.exports = userRouter;
