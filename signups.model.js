const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Signups = new Schema({
    "title": { type: String, required: true },
    "firstname": { type: String, required: true, minlength: 2 },
    "lastname": { type: String, required: true , minlength: 2 },
    "email": { type: String, required: true },
    "number": { type: String },
    "dob": { type: Date }
})

module.exports = mongoose.model(`Signups`, Signups);