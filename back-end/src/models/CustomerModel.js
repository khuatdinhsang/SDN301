const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
    email: { type: String, unique: true },
    phone: { type: String },
    image: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: Boolean },
    accountId: { type: mongoose.Schema.Types.ObjectId, ref: 'Account' }
}, {
    timestamps: true
})
const Customer = mongoose.model('Customer', customerSchema)
module.exports = Customer
