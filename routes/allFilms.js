const express = require(`express`);
const router = express.Router();
const Films = require(`../films.model`);

router.route(`/`).get((req, res) => {
    res.send(`Getting all films`);
});

module.exports = router;