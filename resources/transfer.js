'use strict';

var root = '/transfer';

module.exports = {

  process: {
    method: 'post',
    endpoint: root,
    params: ['source*', 'amount*', 'recipient*', 'currency', 'reason']
  },

  list: {
      method: 'get',
      endpoint: root
    }
};
