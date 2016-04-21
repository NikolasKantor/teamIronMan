// ES6 class syntax only runs in strict mode
'use strict';

class MathLib {

	static add(op1, op2) {
		return op1 + op2
	}

	static sub(op1, op2) {
		return op1 - op2
	}

	static mul(op1, op2) {
		return op1 * op2
	}

	static div(op1, op2) {
		return op1 / op2
	}

	static pow(op1, op2) {
		var reVal = false
		if (op2 < 0){
			reVal = true
			op2 = (op2 > 0 ? op2 : op2*(-1))
		}
		result = 1
		for (var j = 0; j < op2; j++)
			result *= op1
		if (reVal)
			result = 1/result
		return result
	}

	static factorial(number) {
		result = 0
		var x = number
		for (var j = 0; j < number; j++){
			result += x
			x--
		}
		return result
	}

}

// export MathLib class the old fashioned way for both brower and node (for testing)
(typeof window === 'object' ? window : global).MathLib = MathLib;
if (typeof module == 'object') module.exports = MathLib
