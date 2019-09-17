const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const Opening = new Schema({
    "day" : { type: String },
    "opening" : { type: String },
    "close" : { type: String }
})

module.exports = mongoose.model(`Opening`, Opening);