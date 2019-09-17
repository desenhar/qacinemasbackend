const express = require(`express`);
const router = express.Router();
const Signup = require(`../signup.model`);
const bodyParser = require(`body-parser`);

router.use(bodyParser.json());

router.route(`/`).post((req, res) => {
    res.send(`Adding Todo successful`);
});

module.exports = router;