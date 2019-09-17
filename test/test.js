const mongoose = require('mongoose');
const Cinema = require('../cinema.model')

// Require the testing dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const should = chai.should();

const testData = require('../testData/cinemamockdata.json');

chai.use(chaiHttp);
describe(`Testing requirements for backend`, () => {
    beforeEach(done => {
        Cinema.deleteMany({}, err => {
            if (err) done(err);
        });

        Cinema.insertMany(testData, (err, res) => {
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
    })
});