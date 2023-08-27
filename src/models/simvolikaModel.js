const mongoose = require("mongoose");

const simvolikaSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  countInStock: { type: Number, required: true },
  inStock: { type: Boolean },
  price: { type: String, required: true },
  description: { type: String, required: true },
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

const Simvolika = mongoose.model('Simvolika', simvolikaSchema);

module.exports = Simvolika;