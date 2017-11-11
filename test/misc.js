var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Miscellanous Functions", function() {

  // List Banks
  it("should list all supported banks", function(done) {
    paystack.misc.list_banks()
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data[0]).to.have.property('name');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  // Resolve a Bvn
  it("should resolve a bvn", function(done) {
    paystack.misc.resolve_bvn(22365848972)
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('bvn');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  it("should resolve an account number", function(done) {
    paystack.misc.resolve_account_number('0735949050', '044')
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('account_name');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  it("should get balance", function(done) {
    paystack.misc.balance()
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data[0]).to.have.property('balance');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

});
