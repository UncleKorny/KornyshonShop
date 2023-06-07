const express = require('express');
const nodemailer = require('nodemailer');
const Mailing = require('../models/mailingModel');

const sendMailRouter = express.Router();
const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: 'themkornygame@gmail.com', // Ваша почта для отправки
        pass: 'vkfjpsdnzsgyibtz', // Пароль от вашей почты
    },
});

sendMailRouter.post('/spam', async (req, res) => {
    const {email, editorHtml } = req.body;
    const mailOptions = {
        from: 'themkornygame@gmail.com', // Ваша почта для отправки
        to: email, // Почта получателя
        subject: 'Новая акция на нашем сайте!',
        html: editorHtml,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке письма:', error);
            res.status(500).send('Произошла ошибка при отправке письма');
        } else {
            console.log('Письмо успешно отправлено:', info.response);
            res.status(200).send('Письмо успешно отправлено');
        }
    });
})

sendMailRouter.post('/', async (req, res) => {
    const {email, message } = req.body;
    const mailOptions = {
        from: 'themkornygame@gmail.com', // Ваша почта для отправки
        to: 'leagueoflegendsaccount2@mail.ru', // Почта получателя
        subject: 'Новое сообщение от ' + email,
        text: message,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Ошибка при отправке письма:', error);
            res.status(500).send('Произошла ошибка при отправке письма');
        } else {
            console.log('Письмо успешно отправлено:', info.response);
            res.status(200).send('Письмо успешно отправлено');
        }
    });
})

sendMailRouter.get('/', async(req,res)=>{
    const emails = await Mailing.find();
    res.send(emails);
})
module.exports = sendMailRouter;