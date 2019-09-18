const express = require(`express`);
const router = express.Router();
const Signups = require(`../signups.model`);
const bodyParser = require(`body-parser`);

router.use(bodyParser.json());

router.route(`/`).post((req, res) => {
    // res.send(`Adding Todo successful`);
    // Instantiate new signup object
    const signup = new Signups(req.body);
    // Attempt to save
    signup.save()
        // Respond as specified by test
        .then(signup => {
            res.status(200).json({'signup':'signup added successfully'})
        })
        // Return error array(?) if save fails
        .catch(err => res.status(422).json({'errors':[err]}))
});

module.exports = router;