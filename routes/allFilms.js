const express = require(`express`);
const router = express.Router();
const Films = require(`../films.model`);

router.route(`/`).get((req, res) => {
    // res.send(`Getting all films`);
    Films.find((error, films) => {
        error ? res.status(404).send(`Not found`) : res.status(200).json(films);
    });
});

module.exports = router;