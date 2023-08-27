const express = require('express');
const Simvolika = require('../models/simvolikaModel');
const expressAsyncHandler = require('express-async-handler');
const multer = require('multer');
const path = require('path');
const simvolikaRouter = express.Router();


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
simvolikaRouter.post('/image', upload.single('upload'), async (req, res) => {

    const imagesFolderPath = path.join(__dirname, '..', 'images');
    try {
        console.log("asdfa");
        if (!req.file) {
            throw new Error('No file uploaded');
        }
        await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toFile(imagesFolderPath + `/${req.file.originalname}`)
        res.status(201).send('Image uploaded succesfully')
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})
simvolikaRouter.get('/', async (req, res) => {
    const products = await Simvolika.find();
    res.send(products);
});
// productRouter.get('/slug/:slug', async (req, res) => {
//     const product = await Product.findOne({ href: req.params.slug });
//     if (product) {
//         res.send(product);
//     }
//     else {
//         res.status(404).send({ message: 'Product not found' });
//     }
// })
simvolikaRouter.get('/search', async (req, res) => {
    const { query } = req.query;
    try {
        const products = await Simvolika.find({ name: { $regex: query, $options: 'i' } });
        res.json(products);
    } catch (err) {
        console.log(err);
        res.send({ message: "server error" });
    }
})
simvolikaRouter.get('/:id', async (req, res) => {
    try {
        const product = await Simvolika.findById(req.params.id);
        if (product) {
            res.send(product);
        }
        else {
            res.status(404).send({ message: 'Product not found' });
        }
    }
    catch (err) {
        // console.log(err);
    }
})
simvolikaRouter.get('/filterFound/:filter', async (req, res) => {
    try {
        const filterValue = req.query.filter;
        const product = await Simvolika.find({ filter: filterValue });
        if (product) {
            res.send(product);
        }
        else {
            res.status(404).send({ message: "Не найдено." });
        }
        // res.send({message: `${filterValue}`});
    }
    catch (err) {
        console.log(err);
    }
})


simvolikaRouter.post('/addProduct', upload.single('image'), async (req, res) => {
    try {
        const { nameProductValue, countInStockValue, descriptionValue, priceValue, filterValue, fileName } = req.body;
        
        const newProduct = new Simvolika({
            name: nameProductValue,
            countInStock: countInStockValue,
            inStock: true,
            price: priceValue,
            description: descriptionValue,
            filter: filterValue,
            imageSrc: [{
                name: 'Angled view',
                src: `/images/${fileName}`,
                alt: 'Angled front view with bag zipped and handles upright.',
            }],
            imageAlt: 'default',
        });
        const createdProduct = await newProduct.save();
        res.status(201).json(createdProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
simvolikaRouter.delete(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Simvolika.findById(productId);
        if (product) {
            const deletedProduct = await product.deleteOne();
            res.send({ message: 'product deleted', product: deletedProduct });
        }
        else {
            res.status(404).send({ message: 'product not found' });
        }
    })
)
simvolikaRouter.patch(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const productId = req.params.id;
        const product = await Simvolika.findById(productId);
        if (product) {
            product.name = req.body.name || product.name;
            product.countInStock = req.body.countInStock || product.countInStock;
            product.price = req.body.price || product.countInStock;
            product.description = req.body.description || product.description;
            product.filter = req.body.filter || product.filter;
            const updatedProduct = await product.save();
            res.send({
                _id: updatedProduct._id,
                name: updatedProduct.name,
                countInStock: updatedProduct.countInStock,
                price: updatedProduct.price,
                description: updatedProduct.description,
                filter: updatedProduct.filter,
            });
        } else {
            res.status(404).send({ message: 'Product not found' });
        }
        // console.log(req.params);
        // res.send(user)
    })
)
module.exports = simvolikaRouter;