var assert = require('chai').assert;
require('./MathLib');

describe('MathLib', function() {

	describe('#helloWorld()', function () {
		it('should return hello world string', function () {
			assert.isString(MathLib.helloWorld());
		});
	});

});


describe('MathLib', function() {

	describe('#add(1568+3648)', function () {
		it('return 5216', function () {
			assert.equal(5216, MathLib.add([1568,3648]), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#div(3600/60)', function () {
		it('return 60', function () {
			assert.equal(60, MathLib.div([60,3600]), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#sub(3600-60)', function () {
		it('return 3540', function () {
			assert.equal(3540, MathLib.sub([60,3600]), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#mul(12578*2689)', function () {
		it('return 33822242', function () {
			assert.equal(33822242, MathLib.mul([2689,12578]), 'these numbers are equal');
		});
	});

});


/*********************************fakctorial tests**************************************************/
describe('MathLib', function() {

	describe('#faktorial(10!)', function () {
		it('return 3628800', function () {
			assert.equal(3628800, MathLib.faktorial(10), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#faktorial(5!)', function () {
		it('return 120', function () {
			assert.equal(120, MathLib.faktorial(5), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#faktorial(5!)', function () {
		it('return 120', function () {
			assert.equal(120, MathLib.faktorial(5), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#faktorial(50!)', function () {
		it('return 30414093201713378043612608166064768844377641568960512000000000000', function () {
			assert.equal(30414093201713378043612608166064768844377641568960512000000000000, MathLib.faktorial(50), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#faktorial(0!)', function () {
		it('return 1', function () {
			assert.equal(1, MathLib.faktorial(0), 'these numbers are equal');
		});
	});

});


/***************************************fibonacci tests*****************************************/
describe('MathLib', function() {

	describe('#fib(10)', function () {
		it('return 55', function () {
			assert.equal(55, MathLib.fib(10), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#fib(1)', function () {
		it('return 1', function () {
			assert.equal(1, MathLib.fib(1), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#fib(35)', function () {
		it('return 9227465', function () {
			assert.equal(9227465, MathLib.fib(35), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#fib(69)', function () {
		it('return 117669030460994', function () {
			assert.equal(117669030460994, MathLib.fib(69), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#fib(88)', function () {
		it('return 1100087778366101931', function () {
			assert.equal(1100087778366101931, MathLib.fib(88), 'these numbers are equal');
		});
	});

});

/********************************************x^2 tests****************************************/
/* vstup je pole [2,5] -> 2^5*/

describe('MathLib', function() {

	describe('#power(2^2)', function () {
		it('return 4', function () {
			assert.equal(4, MathLib.fib([2,2]), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#power(1^0)', function () {
		it('return 1', function () {
			assert.equal(1, MathLib.fib([1,0]), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#power(2^8)', function () {
		it('return 256', function () {
			assert.equal(256, MathLib.fib([2,8]), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#power(12^4)', function () {
		it('return 20736', function () {
			assert.equal(20736, MathLib.fib([12,4]), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#power(0^2686)', function () {
		it('return 0', function () {
			assert.equal(0, MathLib.fib([0,2686]), 'these numbers are equal');
		});
	});

});



