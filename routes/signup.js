const express = require(`express`);
const router = express.Router();
const Signup = require(`../signup.model`);
const bodyParser = require(`body-parser`);

router.use(bodyParser.json());

router.route(`/`).post((req, res) => {
    res.send(`Adding Todo successful`);
    // Instantiate new signup object
    const signup = new Signup(req.body);
    // Attempt to save
    signup.save()
        // Respond as specified by test
        .then(signup => {
            res.status(200).json({'signup':'signup added successfully'})
        })
        // Return error array(?) if save fails
        .catch(err => res.status(400).send(err))
});

module.exports = router;