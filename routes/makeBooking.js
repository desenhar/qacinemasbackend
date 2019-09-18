const express = require(`express`);
const router = express.Router();
const Booking = require(`../bookings.model`);
const bodyParser = require(`body-parser`);

router.use(bodyParser.json());

router.route(`/`).post((req, res) => {
    const booking = new Booking(req.body);
    // Attempt to save
    booking.save()
        // Respond as specified by test
        .then(booking => {
            res.status(200).json({ 'booking': 'All Booked!' })
        })
        // Return error array(?) if save fails
        .catch(err => res.status(422).json({ 'errors': [err] }))
});