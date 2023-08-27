const products = require('./data.js');
const express = require('express');
const fs = require('fs');
const app = express();
const path = require('path');
const sharp = require('sharp');
const cors = require('cors');
const multer = require('multer');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const seedRouter = require('./src/routes/seedRoute.js');
const productRouter = require('./src/routes/productRouter.js');
const userRouter = require('./src/routes/userRoutes.js');
const filterRouter = require('./src/routes/filterRouter.js');
const visitRouter = require('./src/routes/visitRouter.js');
const sendMailRouter = require('./src/routes/sendMailRouter.js');
const mailingRouter = require('./src/routes/mailingRouter.js');
const commentRouter = require('./src/routes/commentRouter.js');
const discountRouter = require('./src/routes/discountRouter.js');
const simvolikaRouter = require('./src/routes/simvolikaRouter.js');
const imagesFolderPath = path.join(__dirname, 'src', 'images');
const orderRouter = require('./src/routes/orderRouter.js');
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/images', express.static(imagesFolderPath));
const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload a valid image file'))
        }
        cb(undefined, true)
    }
})
dotenv.config();
//Подключение MongoDB
mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('connected to db');
}).catch((err) => {
    console.log(err.message);
});

//Серверная маршрутизация
app.use('/api/comments', commentRouter);
app.use('/api/statistics', visitRouter);
app.use('/api/send-mail', sendMailRouter);
app.use('/api/mailing', mailingRouter);
app.use('/api/orders', orderRouter);
app.use('/api/filters', filterRouter);
app.use('/api/seed', seedRouter);
app.use('/api/products', productRouter);
app.use('/api/simvolika', simvolikaRouter);
app.use('/api/users', userRouter);
app.use('/api/discount', discountRouter);
app.post('/image', upload.single('image'), async (req, res) => {

    try {
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        await sharp(req.file.buffer).png().toFile(__dirname + `\\public\\images\\${req.file.originalname}`)
        res.status(201).send('Image uploaded succesfully')
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
app.delete('/images/:image', (req, res) => {
    const filename = req.params.image;
    const imagePath = path.join(__dirname, 'public/images', filename);
    fs.access(imagePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(404).send('File not found');
            return;
        }

        // Удаление файла
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error deleting file');
                return;
            }

            res.status(200).send('File deleted successfully');
        });
    });
});
app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message })
});

//Прослушка сервера
const port = process.env.port || 5000;
app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Listening at http://localhost:${port}`);
    }
});
