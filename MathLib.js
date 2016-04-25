// ES6 class syntax only runs in strict mode
'use strict';

if (typeof global == 'object') {
	global.events = require('./core.js')
}

/** 
* @brief Knihovna matematickych funkci
* 
* Třída se sadou statických metod matematických operací
*/
class MathLib {

	/** 
	* @brief součet dvou čísel
	* @param num1 první sčítanec
	* @param num2 druhé sčítanec
	* @return Number
	*/
	static add(num1, num2) {
		return num1 + num2
	}

	/** 
	* @brief rozdíl dvou čísel
	* @param num1 menšenec
	* @param num2 menšitel
	* @return Number
	*/
	static sub(num1, num2) {
		return num1 - num2
	}

	/** 
	* @brief násobek dvou čísel
	* @param num1 první činitel
	* @param num2 druhý činitel
	* @return Number
	*/
	static mul(num1, num2) {
		return num1 * num2
	}

	/** 
	* @brief dělení dvou čísel
	* @param num1 dělenec
	* @param num2 dělitel
	* @return Number
	*/
	static div(num1, num2) {
		if (num2 == 0) {
			events.emit('math-error', 'Dělení nulou')
			return;
		}
		return num1 / num2
	}

	/** 
	* @brief faktoriál danného čísla
	* @param num číslo
	* @return Number
	*/
	static factorial(num) {
		if (num.toString().includes('.') || num < 0) {
			events.emit('math-error', 'Zaporné číslo')
			return;
		}
		var result = 1
		var x = num
		for (var j = 0; j < num; j++) {
			result *= x
			x--
		}
		return result
	}

	/** 
	* @brief umocnění
	* @param num1 mocněnec
	* @param num2 mocnitel
	* @return Number
	*/
	static pow(num1, num2) {
		var reVal = false
		var result
		if (num2 < 0) {
			reVal = true
			num2 = (num2 > 0 ? num2 : num2*(-1))
		}
		result = 1
		for (var j = 0; j < num2; j++)
			result *= num1
		if (reVal) {
			result = (1 / result)//*1000
			//result = Math.round(result)/1000
		}
		return result
	}

	/** 
	* @brief odmocnina danného čísla
	* @param num2 číslo
	* @return Number
	*/
	static sqrt(num) {
		if (num < 0) {
			events.emit('math-error', 'Záporné číslo')
			return;
		}
		var presnost = 25
		var result = presnost * 100
		for (var i = 0; i < presnost; i++) {
			result = 0.5 * (result + (num / result))
		}
		result = Math.round(result * 1000) / 1000
		return result
	}

}

if (typeof module == 'object') {
	module.exports = MathLib
}