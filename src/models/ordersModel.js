const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    products : {
        type: Array,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["success", "in progress" ,"failure"]
    },
    totalPrice: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Orders = mongoose.model('Orders', orderSchema);

module.exports = Orders;