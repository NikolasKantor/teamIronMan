var assert = require('chai').assert;
var MathLib = require('./MathLib');
var autoComplete = require('./interpret').autoComplete;
var interpret = require('./interpret').interpret;


describe('MathLib', function() {

	describe('#add()', function () {
		it('1568+3648 == 5216', function () {
			assert.equal(5216, MathLib.add(1568,3648));
		});
		it('5+3 == 11', function () {
			assert.equal(11, MathLib.add(3,8));
		});
		it('256+364 == 640', function () {
			assert.equal(610, MathLib.add(256,354));
		});
	});

	describe('#div()', function () {
		it('3600/60 == 60', function () {
			assert.equal(60, MathLib.div(3600,60));
		});
		it('36/6 == 6', function () {
			assert.equal(6, MathLib.div(36,6));
		});
		it('0/2 == 0', function () {
			assert.equal(0, MathLib.div(0,2));
		});
	});

	describe('#sub()', function () {
		it('3600-60 == 3540', function () {
			assert.equal(3540, MathLib.sub(3600,60));
		});
		it('256--340 == 596', function () {
			assert.equal(596, MathLib.sub(256,-340));
		});
		it('2560-340 == 2220', function () {
			assert.equal(2220, MathLib.sub(2560,340));
		});
	});

	describe('#mul()', function () {
		it('12578*2689 == 33822242', function () {
			assert.equal(33822242, MathLib.mul(2689,12578));
		});
		it('3*-3 == -9', function () {
			assert.equal(-9, MathLib.mul(3,-3));
		});
		it('5*28 == 140', function () {
			assert.equal(140, MathLib.mul(5,28));
		});
	});

	describe('#factorial()', function () {
		it('9! == 362880', function () {
			assert.equal(362880, MathLib.factorial(9));
		});
		it('3! == 6', function () {
			assert.equal(6, MathLib.factorial(3));
		});
		it('5! == 120', function () {
			assert.equal(120, MathLib.factorial(5));
		});
		it('7! == 5040', function () {
			assert.equal(5040, MathLib.factorial(7));
		});
		it('0! == 1', function () {
			assert.equal(1, MathLib.factorial(0));
		});
	});

	describe('#sqrt()', function () {
		it('#√2 == 2', function () {
			assert.equal(2, MathLib.sqrt(4));
		});
		it('#√25 == 5', function () {
			assert.equal(5, MathLib.sqrt(25));
		});
		it('#√1024 == 32', function () {
			assert.equal(32, MathLib.sqrt(1024));
		});
		it('#√36 == 6', function () {
			assert.equal(6, MathLib.sqrt(36));
		});
	});

	describe('#pow()', function () {
		it('2^2 == 4', function () {
			assert.equal(4, MathLib.pow(2,2));
		});
		it('1^0 == 1', function () {
			assert.equal(1, MathLib.pow(1,0));
		});
		it('2^8 == 256', function () {
			assert.equal(256, MathLib.pow(2,8));
		});
		it('12^4 == 20736', function () {
			assert.equal(20736, MathLib.pow(12,4));
		});
		it('0^2686 == 0', function () {
			assert.equal(0, MathLib.pow(0,2686));
		});
	});

});


describe('interpert', function() {

	describe('#interpret()', function () {

		var examples = [
			[15, '(-((√(9)*(-50/(5^2+25))/-1))+10^0-√(9))*-3'],
			[-1/9, '-(3^(2+1-5^1)'],
			[3628800, '10!'],
			[1/9, '3^-2'],
			[-39, '-3^(2+1) + 14/-7 * 3!'],
			[50, '5*((8+2/1^-2))'],
			[46, '8/2+3*√(144)+3!'],
			[2, '√(4)'],
			[5, '√(25)'],
			[6, '√(36)'],
			[32, '√(1024)'],
			//[, '6^-(√(9))'],
			//[, '√(99999999999)'],
			//[Math.sqrt(125348), '√(125348)'], // nepocitame odmocniny na tak velkou presnost
		]

		examples.forEach(example => {
			var result = example[0];
			var expression = example[1];
			it(expression + ' == ' + result, function () {
				assert.equal(result, interpret(expression))
			});
		})

		it('should properly calculate sqrt without brackets 1', function () {
			assert.equal(4, interpret('6-(√(4))'))
			assert.equal(4, interpret('6-(√(4))'))
			assert.equal(4, interpret('6-√(4)'))
			assert.equal(4, interpret('6-√4'))
			assert.equal(4, interpret('6-√4'))
		});
		it('should properly calculate sqrt without brackets 2', function () {
			assert.equal(0.25, interpret('2^-√4'))
			assert.equal(0.25, interpret('2^(-(√(4))'))
			assert.equal(0.25, interpret('2^-((√(4))'))
		});
	});

	describe('#autoComplete()', function () {
		it('should fill in missing brackets for sqrt 1', function () {
			assert.equal('6-(√(4))', autoComplete('6-(√(4))'))
			assert.equal('6-(√(4))', autoComplete('6-√(4)'))
			assert.equal('6-(√(4))', autoComplete('6-√4'))
			assert.equal('6-(√(4))', autoComplete('6-√4'))
		});
		it('should fill in missing brackets for sqrt 2', function () {
			assert.equal('2^-(√(4))', autoComplete('2^-√4'))
			assert.equal('2^-(√(4))', autoComplete('2^-√(4)'))
			assert.equal('2^-(√(4))', autoComplete('2^-(√(4))'))
		});
	});
		
});

