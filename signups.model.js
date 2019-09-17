const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Signup = new Schema({
    "title": { type: String, required: true },
    "firstname": { type: String, required: true },
    "lastname": { type: String, required: true },
    "email": { type: String, required: true },
    "number": { type: String },
    "dob": { type: Date }
})