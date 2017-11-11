var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Card Functions", function() {

  // Resolve a Bin Card
  it("should resolve a card bin", function(done) {
    paystack.card.resolve(59983)
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('bin');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });
});
