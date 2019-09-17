const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;

const allFilms = new Schema({
    "title": { type: String },
    "synopsis": { type: String },
    "cast": { type: String },
    "directors": { type: String },
    "showingTimes": { type: String },
    "releaseDate": { type: String },
    "filmStatus": { type: String },
    "img": { type: String }
})