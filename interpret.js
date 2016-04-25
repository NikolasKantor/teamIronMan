/*
	Interpret pro kalkulačku
	autor: Nikolas Kantor
*/
'use strict';

if (typeof require == 'function') {
	MathLib = require('./MathLib.js')
}

if (!Array.prototype.includes) {
	Array.prototype.includes = function(element) {
		return this.indexOf(element) != -1;
	};
}

Array.prototype.removeIndex = function(index) {
	if (index < this.length) {
		this.splice(index, 1)
	}
}

Array.prototype.intersects = function(arr) {
		for (var i = 0; i < this.length; i++) {
				if (arr.includes(this[i])) {
						return true;
				}
		}
		return false;
}

function parse(str) {
	var cisla = []
	var cislo = []
	var operace = []
	var op = []
	var idx = 0
	var znak
	var tokens1 = ['+','-','*','/','^','!']
	var tokens2 = ['*','/',undefined, '^','(']
	var tokens3 = ['+','-']
	var tokens4 = ['s', 'q', 'r', 't']
	for (var i = 0; i < str.length; i++) {
		if (str[i].trim().length) {
			znak = str[i]
			if (tokens1.includes(znak)) {
				if ((tokens2.includes(str[i-1])) && tokens3.includes(znak))
					cislo.push(znak)
				else
					operace.push(znak)
			} else if (!isNaN(parseInt(znak)) || znak == '.') {
				if (!isNaN(parseInt(str[i+1])) || str[i+1] == '.')
					cislo.push(znak)
				else{
					cislo.push(znak)
					cisla.push(cislo.join(''))
					cislo = []
				}
			} else if (tokens4.includes(znak)) {
				op.push(znak)
				if (op.join('') == 'sqrt')
					operace.push('sqrt')
			} else {

			}
		}

	}
	//console.log("vstupní operace", operace)
	//console.log("vstupní čisla", cisla)
	return [cisla, operace]
}

function removeOperators(cisla, operace, seznam) {
	//console.log("cisla before:",cisla)
	//console.log("operace before:",operace)
	//console.log("seznam:",seznam)
	while (operace.intersects(seznam)) {
		for (var i = 0; i < operace.length; i++) {
			if (seznam.includes(operace[i])) {
				var op1 = Number(cisla[i])
				var op2 = Number(cisla[i+1])
				switch(operace[i]) {
					case '+':	cisla[i] = MathLib.add(op1, op2);	break
					case '-':	cisla[i] = MathLib.sub(op1, op2);	break
					case '*':	cisla[i] = MathLib.mul(op1, op2);	break
					case '/':	cisla[i] = MathLib.div(op1, op2);	break
					case '^':	cisla[i] = MathLib.pow(op1, op2);	break
					case '!':	cisla[i] = MathLib.factorial(op1);	break
					case 'sqrt':cisla[i] = MathLib.sqrt(op1);		break
				}
				if (operace[i] != '!' && operace[i] != 'sqrt')
					cisla.removeIndex(i + 1)
				operace.removeIndex(i)
			}
		}
	}
	//console.log("cisla after:",cisla)
	//console.log("operace after:",operace)
	return [cisla, operace]

}

function getMeNested(str) {
	var read = false
	var substr = ""
	var subs = []
	var deep = 0
	var ch
	for (var i = 0; i < str.length; i++) {
		ch = str[i]
		if (ch == '(') {
			read = true
			if (deep++ == 0)
				continue
		}
		if (ch == ')') {
			deep--;
			if (deep == 0) {
				read = false
				subs.push(substr)
				substr = ""
			}
		}
		if (read)
			substr += ch
	}

	return subs
}

function auto_complete(str) {
	//console.log(str)

	var tokens = ['+','-','*','/','^', '(']
	while (tokens.includes(str.slice(-1)))
		str = str.substring(0, str.length - 1)

	var oteviraci = 0
	var zaviraci = 0
	str.split('').forEach(znak => {
		if (znak == '(')
			oteviraci++
		if (znak == ')')
			zaviraci++
	})
	while (oteviraci > zaviraci) {
		str += ')'
		zaviraci++
	}

	//console.log(str)
	return str
}

function interpretuj(str) {

	getMeNested(str).forEach(value => {
		//console.log("before replace", str)
		str = str.replace(value, interpretuj(value))
		//console.log("after replace", str)
	})

	var result = parse(str)
	result = removeOperators(result[0], result[1], ['!'])
	result = removeOperators(result[0], result[1], ['sqrt'])
	result = removeOperators(result[0], result[1], ['^'])
	result = removeOperators(result[0], result[1], ['/'])
	result = removeOperators(result[0], result[1], ['*'])
	result = removeOperators(result[0], result[1], ['+','-'])

	//console.log("výstupní operace: ",result[1])
	//console.log("výstupní čísla: ",result[0])
	//console.log("result", result[0][0])
	return result[0][0]
}

function interpret(str) {
	str = auto_complete(str)
	return interpretuj(str)
}

//str = "-(3^(2+1-5^1)"
//str = "-3^(2+1) + 14/-7 * 3!"
//str = "5*((8+2/1^-2))"
//str = "50!"
//var str = "8/2+3*sqrt(144)+3!"
//str = "sqrt(125348)"
//str = "sqrt(4)"
//str = "sqrt(25)"
//str = "sqrt(1024)"
//str = "sqrt(36)"
//str = "3^-2"
//str = "sqrt(99999999999)"
var str = "sqrt(-1)"

var vysledek = interpret(str)
console.log("výsledek: "+vysledek)