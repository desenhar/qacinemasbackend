const express = require(`express`);
const router = express.Router();
const bodyParser = require(`body-parser`);
const Films = require(`../films.model`);

router.use(bodyParser.json());

router.route(`/`).get((req, res) => {
    res.redirect(`/`);
});

router.route(`/:id`)
    .get((req, res) => {
        const id = req.params.id;
        res.send(`Getting single film`)
    });

module.exports = router;