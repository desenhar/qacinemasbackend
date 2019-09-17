const express = require(`express`);
const router = express.Router();
const Signup = require(`../signup.model`);
const bodyParser = require(`body-parser`);

router.use(bodyParser.json());

router.route(`/`).post((req, res) => {
    res.send(`Adding Todo successful`);
    const signup = new Signup(req.body);
    signup.save()
        .then(signup => {
            res.status(200).json({'signup':'signup added successfully'})
        })
        .catch(err => res.status(400).send(err))
});

module.exports = router;