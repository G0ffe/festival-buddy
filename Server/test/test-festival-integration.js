const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const should = chai.should();
const expect = chai.expect;

const { Festival } = require('../models');
const { app, runServer, closeServer } = require('../server');
const { TEST_DATABASE_URL } = require('../config');

chai.use(chaiHttp);

function seedFestivalData() {
    console.info('seeding festival data');
    const seedData = [];

    for (let i = 1; i <= 10; i++) {
        seedData.push(generateFestivalData());
    }
    return Festival.insertMany(seedData);
}


function generateFestivalData() {
    return {
        name: faker.random.word(),
        date: faker.date.future(),
        location: faker.address.city()
    }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
}

describe('Festival API resource', function () {

    before(function () {
        return runServer(TEST_DATABASE_URL);
    });

    beforeEach(function () {
        return seedFestivalData();
    });

    afterEach(function () {
        return tearDownDb();
    });

    after(function () {
        return closeServer();
    })

    describe('GET endpoint', function () {

        it('should return all existing festivals', function () {

            let res;
            return chai.request(app)
                .get('/festivals')
                .then(function (_res) {
                    res = _res;
                    res.should.have.status(200);
                    res.body.festivals.should.have.length.of.at.least(1);
                    return Festival.count();
                })
                .then(function (count) {
                    res.body.festivals.should.have.lengthOf(count);
                });
        });

        it('should return festivals with right fields', function () {

            let resFestival;
            return chai.request(app)
                .get('/festivals')
                .then(function (res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.festivals.should.be.a('array');
                    res.body.festivals.should.have.length.of.at.least(1);

                    res.body.festivals.forEach(function (festival) {
                        festival.should.be.a('object');
                        festival.should.include.keys('id', 'name', 'date', 'location');
                    });
                    resFestival = res.body.festivals[0];
                    return Festival.findById(resFestival.id);
                })
                .then(function (festival) {
                    resFestival.id.should.equal(festival.id);
                    resFestival.name.should.equal(festival.name);
                    JSON.stringify(resFestival.date).should.equal(JSON.stringify(festival.date));
                    resFestival.location.should.equal(festival.location);
                });
        });
    });

    describe('POST endpoint', function () {

        it('should add a new festival', function () {

            const newFestival = generateFestivalData();

            return chai.request(app)
                .post('/festivals')
                .send(newFestival)
                .then(function (res) {
                    res.should.have.status(201);
                    res.should.be.json;
                    res.body.should.be.a('object');
                    res.body.should.include.keys('id', 'name', 'date', 'location');
                    res.body.id.should.not.be.null;
                    res.body.name.should.equal(newFestival.name);

                    JSON.stringify(res.body.date).should.equal(JSON.stringify(newFestival.date));
                    res.body.location.should.equal(newFestival.location);

                    return Festival.findById(res.body.id);
                })
                .then(function (festival) {
                    festival.name.should.equal(newFestival.name);
                    JSON.stringify(festival.date).should.equal(JSON.stringify(newFestival.date));
                    festival.location.should.equal(newFestival.location);
                });
        });
    });

    describe('PUT endpoint', function () {

        it('should update fields you send over', function () {
            const updateData = {
                name: 'Test Name',
                location: 'Test Location'
            };

            return Festival
                .findOne()
                .then(function (festival) {
                    updateData.id = festival.id;

                    return chai.request(app)
                        .put(`/festivals/${festival.id}`)
                        .send(updateData);
                })
                .then(function (res) {
                    res.should.have.status(204);

                    return Festival.findById(updateData.id);
                })
                .then(function (festival) {
                    festival.name.should.equal(updateData.name)
                    festival.location.should.equal(updateData.location);
                });
        });
    });

    describe('DELETE endpoint', function () {

        it('delete a festival by id', function () {
            let festival;

            return Festival
                .findOne()
                .then(function (_festival) {
                    festival = _festival;
                    return chai.request(app).delete(`/festivals/${festival.id}`);
                })
                .then(function (res) {
                    res.should.have.status(204);
                    return Festival.findById(festival.id);
                })
                .then(function (_festival) {
                    should.not.exist(_festival);
                });
        });
    });
});