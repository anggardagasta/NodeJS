const chai = require('chai');
const nock = require('nock');
const expect = chai.expect;

const CartSummary = require('./../src/cart-summary');
const tax = require('./../src/tax');

describe('TestCardSummary', function()
	{
		it('getSubtotal() should return 0', function() {
			const cartSummary = new CartSummary([]);
		    expect(cartSummary.getSubtotal()).to.equal(0);
		});

		it('getSubtotal() should return the sum of the price * quantity for all items', function() {
		  	const cartSummary = new CartSummary([
		  		{
				    quantity: 4,
				    price: 50
				}, {
			    	quantity: 2,
			    	price: 30
			  	}, {
			    	quantity: 1,
			    	price: 40
			  	}]
		  	);
		  	expect(cartSummary.getSubtotal()).to.equal(300);
		});
	}
);

describe('TestTax', function()
	{
		afterEach((done) => {
		    nock.cleanAll()
		    done()
		});

		it('get Tax() should return 0', function(done) {		
			nock('https://some-tax-service.com')
		    .post('/request')
		    .reply(200, function(uri, requestBody) {
		      	return {
		        	amount: JSON.parse(requestBody).subtotal * 1
		      	};
		    });

		    const cartSummary = new CartSummary(
		    	[
		    		{
				      	quantity: 4,
				      	price: 50
				    }, {
			      		quantity: 2,
			      		price: 30
			    	}, {
			      		quantity: 1,
			      		price: 40
			    	}
			    ]
		    );
		    
		    cartSummary.getTax('NY', function(taxAmount) {
		      	expect(taxAmount).to.equal(0);
		      	done();
		    });
		});

		it('get Tax() should return 300', function(done) {			
			nock('https://some-tax-service.com')
		    .post('/request')
		    .reply(200, function(uri, requestBody) {
		      	return {
		        	amount: JSON.parse(requestBody).subtotal * 2
		      	};
		    });

		    const cartSummary = new CartSummary(
		    	[
		    		{
				      	quantity: 4,
				      	price: 50
				    }, {
			      		quantity: 2,
			      		price: 30
			    	}, {
			      		quantity: 1,
			      		price: 40
			    	}
			    ]
		    );
		    
		    cartSummary.getTax('CA', function(taxAmount) {
		      	expect(taxAmount).to.equal(600);
		      	done();
		    });
		});

		it('calculate() should send the subtotal in the request', function(done) {
			nock('https://some-tax-service.com')
		    .post('/request')
		    .reply(200, function(uri, requestBody) {
		      	return {
		        	amount: JSON.parse(requestBody).subtotal * 1
		      	};
		    });

	  		tax.calculate(100, 'CA', function(taxDetails) {
	    	expect(taxDetails).to.eql({ amount: 100 });
	    	done();
	  		});
		});

		it('calculate() should not make a request if the state is not CA', function(done) {
		  	nock('https://some-tax-service.com')
		    .post('/request')
		    .reply(200, function(uri, requestBody) {
		      	return {
		        	amount: JSON.parse(requestBody).subtotal * 0.10
		      	};
		    });

		  	tax.calculate(100, 'NY', function(taxDetails) {
		    	expect(taxDetails).to.eql({ amount: 0 });
		    	done();
		  	});
		});
	}
);