'use strict';

var root = '/charge';

module.exports = {

  tokenize: {
    method: 'post',
    endpoint: [root, '/tokenize'].join(''),
    params: ['email*', 'card.number*', 'card.cvv*', 'card.expiry_month*', 'card.expiry_year*']
  },

  get: {
      method: 'get',
      endpoint: [root, '/{reference}'].join(''),
      args: ['reference']
  },

  process: {
    method: 'post',
    endpoint: root,
    params: ['email*', 'amount*',
      'authorization_code', 'pin',
      'card.number', 'card.cvv', 'card.expiry_month', 'card.expiry_year',
      'bank.code', 'bank.account_number'
    ]
  },

  submit_pin: {
    method: 'post',
    endpoint: [root, '/submit_pin'].join(''),
    params: ['pin*', 'reference*']
  },

  submit_otp: {
    method: 'post',
    endpoint: [root, '/submit_otp'].join(''),
    params: ['otp*', 'reference*']
  },

  submit_phone: {
    method: 'post',
    endpoint: [root, '/submit_phone'].join(''),
    params: ['phone*', 'reference*']
  },

  submit_birthday: {
    method: 'post',
    endpoint: [root, '/submit_birthday'].join(''),
    params: ['birthday*', 'reference*']
  },
}
