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

	describe('#add()', function () {
		it('return 5216', function () {
			assert.equal(5216, MathLib.add([1568,3648]), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sub()', function () {
		it('return 5216', function () {
			assert.equal(60, MathLib.div([60,3600]), 'these numbers are equal');
		});
	});

});


describe('MathLib', function() {

	describe('#sub()', function () {
		it('return 5216', function () {
			assert.equal(3540, MathLib.sub([60,3600]), 'these numbers are equal');
		});
	});

});

describe('MathLib', function() {

	describe('#sub()', function () {
		it('return 5216', function () {
			assert.equal(33822242, MathLib.mul([2689,12578]), 'these numbers are equal');
		});
	});

});
/*
describe('Array', function() {

	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal(-1, [1,2,3].indexOf(5));
			assert.equal(-1, [1,2,3].indexOf(0));
		});
	});

});
*/