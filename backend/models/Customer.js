const mongoose = require('mongoose') ;

const customerSchema = new mongoose.Schema({
    fullName: { type: String, required: true},
    email: { type: String, required: true},
    phoneNumber: { type: Number, required: true},
    customerPWD: { type: String, required: true}
}, { timestamps: true}) ;

module.exports = mongoose.model('Customer', customerSchema) ;