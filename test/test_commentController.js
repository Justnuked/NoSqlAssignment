var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var chould = chai.should();

chai.use(chaiHttp);

describe('friendship controller functonalities', function () {

	before(function (done) {
		let user = {
			username: 'OwO',
			password: 'OwO'
		}
		chai.request(server)
            .post('/api/comment/')
            .send(user)
            .end(function (error, result) {
            	result.should.have.status(200);
            	done();
            });
	});

    //it('should add a comment',
    //    function (done) {
    //        let thread = {
    //            username: "OwO",
    //            title: "Hacker '4chan' caught red-handed!",
    //            content: "Leaks of his whereabouts discovered on wikipedia"
    //        }
    //        chai.request(server)
    //            .post('/api/comment/')
    //            .send(thread)
    //            .end(function (error, result) {
    //                result.should.have.status(200);
    //                result.should.be.json;
    //                result.body.should.be.an('object');
    //                done();
    //            });
    //    });

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