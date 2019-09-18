const express = require(`express`);
const router = express.Router();
const Booking = require(`../bookings.model`);
const bodyParser = require(`body-parser`);
const cors = require('cors');

const { check, validationResult } = require('express-validator/check');

// const isoDateRegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/;
const isoDateRegExp = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z)/
const isoEmailRegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

router.use(cors());

router.use(bodyParser.json());

router.route(`/`).post(    
    [
    check("email").matches(isoEmailRegExp),
    check("bookingDate").matches(isoDateRegExp)
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const booking = new Booking(req.body);
        // Attempt to save
        booking.save()
        // Respond as specified by test
        .then(booking => {
            res.status(200).json({ 'booking': 'All Booked!' });
        })
        // Return error array(?) if save fails
        .catch(err => res.status(422).json({ 'errors': [err] }))
});

module.exports = router;