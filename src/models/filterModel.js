const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    options: [
        {
            value: { type: String, required: true },
            label: { type: String, required: true }
        }
    ]
}, { timestamps: true });

const Filters = mongoose.model('Filters', filterSchema);

module.exports = Filters;