const express = require(`express`);
const router = express.Router();
const Openings = require(`../openingtimes.model`);

router.route(`/`).get((req, res) => {
    res.send(`Getting all films`);
});

module.exports = router;