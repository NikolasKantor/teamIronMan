var assert = require('chai').assert;
require('./MathLib');

describe('MathLib', function() {

	describe('#helloWorld()', function () {
		it('should return hello world string', function () {
			assert.isString(MathLib.helloWorld());
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