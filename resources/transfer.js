'use strict';

var root = '/transfer';

module.exports = {

  process: {
    method: 'post',
    endpoint: root,
    params: ['source*', 'amount*', 'recipient*', 'currency', 'reason']
  },

  processBulk: {
    method: 'post',
    endpoint: root + '/bulk',
    params: ['source*', 'transfers*', 'currency']
  },

  list: {
      method: 'get',
      endpoint: root
    }
};
