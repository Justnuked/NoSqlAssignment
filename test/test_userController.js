var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../src/server');
var chould = chai.should();

chai.use(chaiHttp);

describe('User controller functonalities', function () {

    it('should add a user',
        function(done) {
            let user = {
                username: "UwU",
                password: "Uwu"
            }
            chai.request(server)
                .post('/api/users/')
                .send(user)
                .end(function(error, result) {
                    result.should.have.status(200);
                    result.should.be.json;
                    result.body.should.be.an('object');
                    done();
                });
        });
});