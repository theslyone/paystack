	'use strict';

// Miscellanous functions have different endpoints

module.exports = {

	/*
		List supported banks
	*/
	list_banks: {
		method: 'get',
		endpoint: '/bank',
		params: ['perPage', 'page']
	},

	resolve_bvn: {
		method: 'get',
		endpoint: '/bank/resolve_bvn/{bvn}',
		args: ['bvn']
	},

  resolve_account_number: {
		method: 'get',
		endpoint: '/bank/resolve?account_number={accountNumber}&bank_code={bankCode}',
		args: ['accountNumber', 'bankCode']
	},

  balance: {
		method: 'get',
		endpoint: '/balance'
	}
}
