var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Charge Functions", function() {

  it("should tokenize a card", function(done) {
    paystack.charge.tokenize({
      email: 'somunizua@gmail.com',
      card: {
        number: '4084084084084081',
        cvv: '408',
        expiry_year: '25',
        expiry_month: '12'
      }
    })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('authorization_code');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  it("should charge tokenized card", function(done) {
    paystack.charge.tokenize({
      email: 'somunizua@gmail.com',
      card: {
        number: '4084084084084081',
        cvv: '408',
        expiry_month: '03',
        expiry_year: '19'
      }
    })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('authorization_code');

        return paystack.charge.process({
          email: 'somunizua@gmail.com',
          authorization_code: body.data.authorization_code,
          pin: '9890',
          amount: 200
        })
      })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('status');
        expect(body.data.status).to.equal('success');
        expect(body.data).to.have.property('reference');
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  it("should charge bank account", function(done) {
    paystack.misc.list_banks()
    .then(banks => {
      return banks.data.filter(b => b.name.toLowerCase().includes('zenith'))
    })
    .then(bank => {
      return paystack.charge.process({
        email: 'somunizua@gmail.com',
        bank: {
          account_number: '0000000000',
          code: bank[0].code
        },
        amount: 200
      })
    })
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.have.property('status');
      expect(body.data).to.have.property('reference');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });
});
