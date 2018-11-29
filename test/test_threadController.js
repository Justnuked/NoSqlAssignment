var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var chould = chai.should();

chai.use(chaiHttp);

describe('thread controller functonalities', function () {

    // Creating a user as OP for the thread

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

    it('should add a thread',
        function (done) {
            let thread = {
                username: "OnO",
                title: "Hacker '4chan' caught red-handed!",
                content: "Leaks of his whereabouts discovered on wikipedia"
            }
            chai.request(server)
                .post('/api/thread/')
                .send(thread)
                .end(function (error, result) {
                    result.should.have.status(200);
                    result.should.be.json;
                    result.body.should.be.an('object');
                    done();
                });
        });

    // This username doesn't exist, but is still hilarious
    it('should not add a thread if the user does not exist',
        function (done) {
            let thread = {
                username: "LongUsernamesAreHilarious",
                title: "This game sucks!",
                content: "Ramble Ramble Ramble Ramble Ramble Ramble"
            }
            chai.request(server)
                .post('/api/thread/')
                .send(thread)
                .end(function (error, result) {
                    result.should.have.status(400);
                    result.should.be.json;
                    result.body.should.be.an('object');
                    done();
                });
        });
});