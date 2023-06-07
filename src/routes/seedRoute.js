const express = require('express');
const Product = require('../models/productModel');
const products = require('../../data');
const User = require('../models/userModel');
const users = require('../../datausers');
const Filters = require('../models/filterModel');

const seedRouter = express.Router();
const filters = [
    {
      id: 'type',
      name: 'Тип',
      options: [
        { value: 'badges', label: 'Значки' },
        { value: 'mugs', label: 'Кружки' },
        { value: 'figurines', label: 'Фарфоровые фигурки' },
        { value: 'magnets', label: 'Магниты для холодильника' },
        { value: 'keychains', label: 'Брелоки' },
        { value: 'watch', label: 'Настенные часы' },
        { value: 'woodwork', label: 'Деревянные изделия' },
        { value: 'mebel', label: 'Мебель' },
      ],
    },
    {
      id: 'material',
      name: 'Материал',
      options: [
        { value: 'wood', label: 'Дерево' },
        { value: 'ceramics', label: 'Керамика' },
        { value: 'metal', label: 'Металл' },
        { value: 'glass', label: 'Стекло' },
        { value: 'textiles', label: 'Текстиль' },
        { value: 'skin', label: 'Кожа' },
        { value: 'paper', label: 'Бумага' },
      ],
    },
  ]
seedRouter.get('/', async (req,res)=>{
    await Product.deleteMany({});
    const createdProducts = await Product.insertMany(products);
    // await User.deleteMany({});
    // const createdUsers = await User.insertMany(users);
    // await Filters.deleteMany({});
    // const createdFilters = await Filters.insertMany(filters);
    res.send({createdProducts});
});

module.exports = seedRouter; 