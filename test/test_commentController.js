var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var chould = chai.should();

chai.use(chaiHttp);

describe('comment controller functonalities', function () {

    before(function (done) {
        let user = {
            username: 'UnU',
            password: 'UnU'
        }
        chai.request(server)
            .post('/api/users/')
            .send(user)
            .end(function (error, result) {
                result.should.have.status(200);
                done();
            });
    });

    it('should not add a comment on a nonexistent thread',
        function (done) {
            let thread = {
                username: "UnU",
                parentId: "NotARealThread",
                content: "haha yes",
                commentOfComment: "false"
            }
            chai.request(server)
                .post('/api/comments/')
                .send(thread)
                .end(function (error, result) {
                    result.should.have.status(400);
                    result.should.be.json;
                    result.body.should.be.an('object');
                    done();
                });
        });

    //it('should not add a thread if the user does not exist',
    //    function (done) {
    //        let thread = {
    //            username: "LongUsernamesAreHilarious",
    //            title: "This game sucks!",
    //            content: "Ramble Ramble Ramble Ramble Ramble Ramble"
    //        }
    //        chai.request(server)
    //            .post('/api/thread/')
    //            .send(thread)
    //            .end(function (error, result) {
    //                result.should.have.status(400);
    //                result.should.be.json;
    //                result.body.should.be.an('object');
    //                done();
    //            });
    //    });
});