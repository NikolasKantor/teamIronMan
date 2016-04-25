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

	static factorial(number) {
		var result = 1
		var x = number
		for (var j = 0; j < number; j++){
			result *= x
			x--
		}
		return result
	}

	static pow(op1, op2) {
		var reVal = false
		var result
		if (op2 < 0){
			reVal = true
			op2 = (op2 > 0 ? op2 : op2*(-1))
		}
		result = 1
		for (var j = 0; j < op2; j++)
			result *= op1
		if (reVal){
			result = (1/result)*1000
			result = Math.round(result)/1000
		}
		return result
	}

	static sqrt(op){
		var presnost = 25
		var result = presnost * 100
		for (var i = 0; i < presnost; i++){
			result = 0.5*(result+(op/result))
		}
		result = Math.round(result*1000)/1000
		return result
	}

}

if (typeof module == 'object') {
	module.exports = MathLib
}