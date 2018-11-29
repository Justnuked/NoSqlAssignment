var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var chould = chai.should();

chai.use(chaiHttp);

describe('friendship controller functonalities', function () {

	// Creating two users and then making them friends
    before(function (done) {
        let user1 = {
            username: 'OnO',
            password: 'OnO'
        }
        chai.request(server)
            .post('/api/users/')
            .send(user1)
            .end(function (error, result) {
                result.should.have.status(200);
                done();
            });
    });

    before(function (done) {
        let user2 = {
            username: 'OwO',
            password: 'OwO'
        }
        chai.request(server)
            .post('/api/users/')
            .send(user2)
            .end(function (error, result) {
                result.should.have.status(200);
                done();
            });
    });

    it('should add a relationship',
        function (done) {
            let input = {
                username1: "OnO",
                username2: "OwO"
            }
            chai.request(server)
                .post('/api/friendship/')
                .send(input)
                .end(function (error, result) {
                    result.should.have.status(200);
                    result.should.be.json;
                    result.body.should.be.an('object');
                    done();
                });
        });

    it('should not add a relationship if one user does not exist',
        function (done) {
            let input = {
                username1: "OnO",
                username2: "LongUsernamesAreSlightlyFunny"
            }
            chai.request(server)
                .post('/api/friendship/')
                .send(input)
                .end(function (error, result) {
                    result.should.have.status(422);
                    result.should.be.json;
                    result.body.should.be.an('object');
                    done();
                });
        });
});