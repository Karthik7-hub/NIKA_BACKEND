const mongoose = require('mongoose');
const { Schema } = mongoose;

const institutionSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    aisheCode: {
        type: String,
        unique: true,
        sparse: true
    },
    state: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Institution = mongoose.model('Institution', institutionSchema);
module.exports = Institution;