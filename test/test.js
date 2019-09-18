process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const mongoose = require('mongoose');
const Films = require('../films.model');
const Openings = require('../openingtimes.model');
const Signups = require('../signups.model');
const Booking = require('../bookings.model');

// Require the testing dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const testData = require('../testData/cinemamockdata.json');
const filmsData = testData.films;
const signupsData = testData.signups;
const openingsData = testData.openingtimes;
const bookingsData = testData.bookings;

chai.use(chaiHttp);
describe(`Testing requirements for films`, () => {
    beforeEach(done => {
        Films.deleteMany({}, err => {
            if (err) done(err);
        });

        Films.insertMany(filmsData, (err, res) => {
            if (err) {
                console.info(`Error inserting films`);
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

    describe(`/GET/:id single film`, () => {
        it(`it should GET a single film`, done => {
            const testId = filmsData[0]._id
            chai.request(server)
                .get(`/singleFilm/${testId}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property(`_id`, testId);
                    done();
                });
        });
    });

});

describe(`Testing requirements for openings`, () => {
    beforeEach(done => {
        Openings.deleteMany({}, err => {
            if (err) done(err);
        });

        Openings.insertMany(openingsData, (err, res) => {
            if (err) {
                console.info(`Error inserting openings`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
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
});

describe(`Testing requirements for signups`, () => {
    beforeEach(done => {
        Signups.deleteMany({}, err => {
            if (err) done(err);
        });

        Signups.insertMany(signupsData, (err, res) => {
            if (err) {
                console.info(`Error inserting signups`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
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

        // Test for less than two chars
        it(`should not create a signup less than 2 chars for firstname`, done => {
            let signupTest = {
                "title": "Mr.",
                "firstname": "A",
                "lastname": "B",
                "email": "sam.hine27@gmail.com",
                "number": "07780466934",
                "dob": "1998-09-12T23:00:00.000Z",
                "gender": "Female"
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

        it(`should create a signup that is properly formed`, done => {
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

describe(`Testing requirements for bookings`, () => {
    beforeEach(done => {
        Booking.deleteMany({}, err => {
            if (err) done(err);
        });

        Booking.insertMany(bookingsData, (err, res) => {
            if (err) {
                console.info(`Error inserting bookings`);
                done(err);
            } else {
                console.info(`Documents inserted`);
                done();
            }
        });
    });

    describe(`/POST create a booking`, () => {
        it(`should not create a booking without email field`, done => {
            let bookingTest = {
                "filmId" : "5c9e51c24c6ee53ff09d5d03",
                "bookingDate" : "1998-09-12T23:00:00.000Z",
                "adults" : 1,
                "child" : 0,
                "concessions" : 1
            };

            chai.request(server)
                .post(`/makeBooking`)
                .send(bookingTest)
                .end((err, res) => {
                    res.should.have.status(422);
                    res.body.should.have.property(`errors`);
                    res.body.errors.should.be.an(`array`);
                    done();
                });
        });

        it(`should create a booking that is properly formed`, done => {
            let bookingTest = {
                "filmId" : "5c9e51c24c6ee53ff09d5d03",
                "bookingDate" : "1998-09-12T23:00:00.000Z",
                "email" : "sam.hine27@gmail.com",
                "adults" : 1,
                "child" : 0,
                "concessions" : 1
            };

            chai.request(server)
                .post(`/makeBooking`)
                .send(bookingTest)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('booking').eql('All Booked!');
                    done();
                });
        });
    });
});