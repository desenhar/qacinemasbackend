const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Signup = new Schema({
    "title": { type: String },
    "firstname": { type: String },
    "lastname": { type: String },
    "email": { type: String },
    "number": { type: String },
    "dob": { type: Date }
})