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
        Films.findById(id, (error, film) => {
            if (!film) {
                res.status(404).send(`That film cannot be found`);
            } else { res.status(200).json(film) };
        });
    });

module.exports = router;