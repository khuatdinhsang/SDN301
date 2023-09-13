const mongoose = require('mongoose')
const Role = require("./RoleModel");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true,
        default: '650110164699e3d01b36a4f1'
    },
    isActive: {
        type: Boolean,
        default: true
    },
    deActiveAt: {
        type: Date
    },
    deActiveReason: {
        type: String,
    }
}, {
    timestamps: true
})
const User = mongoose.model('User', userSchema);
module.exports = User;
