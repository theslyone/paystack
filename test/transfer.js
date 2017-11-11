var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Transfer Functions", function() {
  it("should disburse to recipient", function(done) {
    paystack.recipient.create({
      type: 'nuban',
      name: 'Okonkwo Sylvester',
      account_number: '0100000001',
      bank_code: '044'
    })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('recipient_code');
        return paystack.transfer.process({
          source: "balance",
          reason: "Calm down",
          amount: 300,
          recipient: body.data.recipient_code
        })
      })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('transfer_code');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

});
