const express = require(`express`);
const router = express.Router();
const Openings = require(`../openingtimes.model`);

router.route(`/`).get((req, res) => {
    // res.send(`Getting all films`);
    Openings.find((error, openings) => {
        error ? res.status(404).send(`Not found`) :
            res.status(200).json(openings);
    });
});

module.exports = router;