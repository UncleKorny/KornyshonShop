const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true, validate: {
    validator: function(value) {
      return /^\S+(\s\S+)*$/.test(value);
    },
    message: "Имя не может содержать пробелы в начале"
  }},
  countInStock: { type: Number, required: true, validate: {
    validator: function(value) {
      // Проверка на отсутствие десятичных знаков в значении поля "field"
      return Number.isInteger(value);
    },
    message: "Значение должно быть целым числом"
  }},
  inStock: { type: Boolean },
  price: { type: String, required: true,validate: {
    validator: function(value) {
      // Проверка на количество знаков после запятой в значении поля "price"
      return /^(\d+|\d+\.\d{1,2})$/.test(value);
    },
    message: "Некорректное значение цены"
  } },
  description: { type: String, required: true, validate: {
    validator: function(value) {
      return /^\S+(\s\S+)*$/.test(value);
    },
    message: "Имя не может содержать пробелы в начале"
  }},
  filter: { type: String, required: true },
  imageSrc: [
    {
      name: { type: String, },
      src: { type: String, },
      alt: { type: String, }
    }
  ],
  imageAlt: { type: String }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;