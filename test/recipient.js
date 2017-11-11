var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Recipient Functions", function() {
  it("should create recipient", function(done) {
    paystack.recipient.create({
      type: 'nuban',
      name: 'Okonkwo Sylvester',
      account_number: '0100000001',
      bank_code: '044'
    })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('recipient_code');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });
});
