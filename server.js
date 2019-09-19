// Copied from Solution for 02
//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 4000;
const DBURI = `mongodb://localhost:27017/cinema`;
const DB = mongoose.connection;
const allFilms = require('./routes/allFilms');
const openingTimes = require('./routes/openingTimes');
const singleFilm = require('./routes/singleFilm');
const signup = require('./routes/signup');
const makeBooking = require('./routes/makeBooking');
const cors = require(`cors`);

const HTTPS = require(`https`);
const FS = require(`fs`);

app.use(cors());
app.use('/allFilms', allFilms);
app.use('/openingTimes', openingTimes);
app.use('/singleFilm', singleFilm);
app.use('/signup', signup);
app.use('/makeBooking', makeBooking);


mongoose.connect(DBURI, { useNewUrlParser: true }, error => {
    error ? console.log(`Unable to connect to DB due to: ${error}`) : console.log(`Connection to MongoDB successful`);
});


app.get(`/`, (req, res) => {
    res.send(`Hello World`);
});

const httpsOptions = {
    key: FS.readFileSync(`server.key`),
    cert: FS.readFileSync(`server.cert`)
};

const server = HTTPS.createServer(httpsOptions, app).listen(PORT, () => {
    const SERVERHOST = server.address().address;
    const SERVERPORT = server.address().port;
    console.log(`Server is running on https://${SERVERHOST}:${SERVERPORT}`);
});

module.exports = server;