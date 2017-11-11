'use strict';

// Card functions have different endpoints

module.exports = {

  resolve: {
    method: 'get',
    endpoint: '/decision/bin/{id}',
    args: ['id']
  },

  tokenize: {
    method: 'post',
    endpoint: '/charge/tokenize',
    params: ['email*', 'card.number*', 'card.cvv*', 'card.expiry_month*', 'card.expiry_year*']
  }
}
