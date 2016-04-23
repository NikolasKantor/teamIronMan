var assert = require('chai').assert;
require('./MathLib');


describe('MathLib', function() {

	describe('#add(1568+3648)', function () {
		it('return 5216', function () {
			assert.equal(5216, MathLib.add(1568,3648), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#add(5+3)', function () {
		it('return 11', function () {
			assert.equal(11, MathLib.add(3,8), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#add(256+364)', function () {
		it('return 640', function () {
			assert.equal(610, MathLib.add(256,354), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#div(3600/60)', function () {
		it('return 60', function () {
			assert.equal(60, MathLib.div(3600,60), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#div(36/6)', function () {
		it('return 6', function () {
			assert.equal(6, MathLib.div(36,6), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#div(0/2)', function () {
		it('return 0', function () {
			assert.equal(0, MathLib.div(0,2), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#sub(3600-60)', function () {
		it('return 3540', function () {
			assert.equal(3540, MathLib.sub(3600,60), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sub(256--340)', function () {
		it('return 596', function () {
			assert.equal(596, MathLib.sub(256,-340), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sub(2560-340', function () {
		it('return 2220', function () {
			assert.equal(2220, MathLib.sub(2560,340), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#mul(12578*2689)', function () {
		it('return 33822242', function () {
			assert.equal(33822242, MathLib.mul(2689,12578), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#mul(3*-3)', function () {
		it('return -9', function () {
			assert.equal(-9, MathLib.mul(3,-3), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#mul(5*28)', function () {
		it('return 140', function () {
			assert.equal(140, MathLib.mul(5,28), 'these numbers are equal');
		});
	});

});



/*********************************fakctorial tests**************************************************/
describe('MathLib', function() {

	describe('#factorial(9)', function () {
		it('return 362880', function () {
			assert.equal(362880, MathLib.factorial(9), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#factorial(3!)', function () {
		it('return 6', function () {
			assert.equal(6, MathLib.factorial(3), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#factorial(5!)', function () {
		it('return 120', function () {
			assert.equal(120, MathLib.factorial(5), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#factorial(7!)', function () {
		it('return 5040', function () {
			assert.equal(5040, MathLib.factorial(7), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#factorial(0!)', function () {
		it('return 1', function () {
			assert.equal(1, MathLib.factorial(0), 'these numbers are equal');
		});
	});

});


/***************************************sqrt tests*****************************************/
describe('MathLib', function() {

	describe('#sqrt(2)', function () {
		it('return 2', function () {
			assert.equal(2, MathLib.sqrt(4), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sqrt(25)', function () {
		it('return 5', function () {
			assert.equal(5, MathLib.sqrt(25), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sqrt(1024)', function () {
		it('return 32', function () {
			assert.equal(32, MathLib.sqrt(1024), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sqrt(36)', function () {
		it('return 6', function () {
			assert.equal(6, MathLib.sqrt(36), 'these numbers are equal');
		});
	});

});



/********************************************x^2 tests****************************************/
/* vstup je pole [2,5] -> 2^5*/

describe('MathLib', function() {

	describe('#pow(2^2)', function () {
		it('return 4', function () {
			assert.equal(4, MathLib.pow(2,2), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#pow(1^0)', function () {
		it('return 1', function () {
			assert.equal(1, MathLib.pow(1,0), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#pow(2^8)', function () {
		it('return 256', function () {
			assert.equal(256, MathLib.pow(2,8), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#pow(12^4)', function () {
		it('return 20736', function () {
			assert.equal(20736, MathLib.pow(12,4), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#pow(0^2686)', function () {
		it('return 0', function () {
			assert.equal(0, MathLib.pow(0,2686), 'these numbers are equal');
		});
	});

});



