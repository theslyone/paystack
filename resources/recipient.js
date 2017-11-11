'use strict';

var root = '/transferrecipient';

module.exports = {

  /*
  Create recipient
  @param: type, name, account_number, bank_code
  */
  create: {
      method: 'post',
      endpoint: root,
      params: ['type*', 'name*', 'account_number*', 'bank_code*']
    },

  /*
  List recipients
  */
  list: {
      method: 'get',
      endpoint: root
    }
};
