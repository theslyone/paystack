var paystack = require('../index')(process.env.KEY)
  , mocha = require('mocha')
  , expect = require('chai').expect
  ;

describe("Paystack Transaction", function() {

  var reference;

  // Init Transaction
  it("should initialize a transaction", function(done) {
    paystack.transaction.initialize({
        email: 'theslyguy@icloud.com',
        amount: 500000
      })
      .then(function(body){
        expect(body).to.have.property('data');
        expect(body.data).to.have.property('authorization_url');
        expect(body.data).to.have.property('access_code');
        expect(body.data).to.have.property('reference');
        reference = body.data.reference;
        done();
      })
      .catch(function(error){
        return done(error);
      });
  });

  it("should transfer from a tokenized card", function(done) {
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
        expect(body.data).to.have.property('authorization');
        expect(body.data.authorization).to.have.property('authorization_code');

        return paystack.transaction.charge({
          email: 'somunizua@gmail.com',
          authorization_code: body.data.authorization.authorization_code,
          amount: 20
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

  // Verify Transaction
  it("should verify a transaction", function(done) {
    paystack.transaction.verify(reference)
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.be.an('object');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  // Fetch Transaction
  // No transaction id :/
  /*
  it("should get details of a transaction", function(done) {
    paystack.transaction.get(transaction_id, function(error, body) {

      if (error)
        return done(error);

      expect(body).to.have.property('data');

      done();
    });
  });
  //*/

  // List Transactions
  it("should list transaction", function(done) {
    paystack.transaction.list()
    .then(function(body){
      expect(body).to.have.property('data');
      expect(body.data).to.be.instanceof(Array);

      done();
    })
    .catch(function(error){
      return done(error);
    });
  });

  // Export Transactions
  it("should export transaction", function(done) {
    paystack.transaction.export()
    .then(function(body){
      expect(body).to.have.property('data');
      done();
    })
    .catch(function(error){
      return done(error);
    });
  });
});
