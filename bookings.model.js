const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Booking = new Schema({
    "filmid" : { type: ObjectID },
    "bookingDate" : { type: Date, required:true },
    "email" : { type: String, required: true },
    "adults": { type: Number, minimum: 0, required: true },
    "child": { type: Number, minimum: 0, required: true },
    "concessions": { type: Number, minimum: 0, required: true }
})

module.exports = mongoose.model(`Booking`, Booking);