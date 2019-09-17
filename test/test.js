const mongoose = require('mongoose');
const allFilms = require('../allfilms.model');
const singleFilms = require('../singlefilms.model');
const Openings = require('../openings.model');
const Signups = require('../signups.model');

// Require the testing dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const testData = require('../testData/cinemamockdata.json');
const allFilmsData = testData.allFilms;
const singleFilmsData = testData.singleFilms;
const signupsData = testData.signup;
const openingsData = testData.openingTimes;

chai.use(chaiHttp);
describe(`Testing requirements for backend`, () => {
    beforeEach(done => {
        allFilms.deleteMany({}, err => {
            if (err) done(err);
        });

        allFilms.insertMany(allFilmsData, (err, res) => {
            if (err) {
                console.info(`Error inserting`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
        });

        singleFilms.deleteMany({}, err => {
            if (err) done(err);
        });

        singleFilms.insertMany(singleFilmsData, (err, res) => {
            if (err) {
                console.info(`Error inserting`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
        });

        Openings.deleteMany({}, err => {
            if (err) done(err);
        });

        Openings.insertMany(openingsData, (err, res) => {
            if (err) {
                console.info(`Error inserting`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
        });

        Signups.deleteMany({}, err => {
            if (err) done(err);
        });

        Signups.insertMany(signupsData, (err, res) => {
            if (err) {
                console.info(`Error inserting`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
        });
    });

    describe(`/GET all films`, () => {
        it(`it should GET all of the films`, done => {
            chai.request(server)
                .get('/allFilms')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a(`array`);
                    res.body.length.should.be.eql(3);
                    done();
                });
        });
    });

    describe(`/GET opening times`, () => {
        it(`it should GET all of the openingtimes`, done => {
            chai.request(server)
                .get('/openingTimes')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a(`array`);
                    res.body.length.should.be.eql(3);
                    done();
                });
        });
    });

    describe(`/GET/:id single film`, () => {
        it(`it should GET a single film`, done => {
            const testId = singleFilmsData[0]._id
            chai.request(server)
                .get(`/singleFilm/${testId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property(`_id`, testId);
                    done();
                });
        });
    });

    describe(`/POST create a signup`, () => {
        it(`should not create a signup without email field`, done => {
            let signupTest = {
                "title" : "Mr.",
                "firstname": "Sam",
                "lastname": "Hine",
            };

            chai.request(server)
                .post(`/signup`)
                .send(signupTest)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property(`errors`);
                    res.body.errors.should.be.an(`array`);
                    done();
                });
        });

        it(`should create a todo that is properly formed`, done => {
            let signupTest = {
                "title": "Mr.",
                "firstname": "Sam",
                "lastname": "Hine",
                "email": "sam.hine27@gmail.com",
                "number": "07780466934",
                "dob": "1998-09-12T23:00:00.000Z",
                "gender": "Female"
            };

            chai.request(server)
                .post(`/signup`)
                .send(signupTest)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('signup').eql('signup added successfully');
                    done();
                });
        });
    });

});