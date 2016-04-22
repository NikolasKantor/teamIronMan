/*
	Interpret pro kalkulačku
	autor: Nikolas Kantor
*/

if (typeof require == 'function') {
	var MathLib = require('./MathLib.js')
}

Array.prototype.removeIndex = function(index) {
	if (index < this.length) {
		this.splice(index, 1)
	}
}

Array.prototype.contains = function(a) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === a) {
            return true;
        }
    }
    return false;
}

Array.prototype.containsArrItem = function(arr) {
    for (var i = 0; i < this.length; i++) {
        if (arr.contains(this[i])) {
            return true;
        }
    }
    return false;
}

function parse(str){
	cisla = []
	cislo = []
	operace = []
	op = []
	idx = 0
	for (i = 0; i < str.length; i++){
		if (str[i].trim().length){
			znak = str[i]
			if (['+','-','*','/','^','!'].contains(znak)){
				if ((['*','/',undefined, '^','('].contains(str[i-1])) && ['+','-'].contains(znak))
					cislo.push(znak)
				else
					operace.push(znak)
			}
			else if(!isNaN(parseInt(znak)) || znak == "."){
				if (!isNaN(parseInt(str[i+1])) || str[i+1] == ".")
					cislo.push(znak)
				else{
					cislo.push(znak)
					cisla.push(cislo.join(''))
					cislo = []
				}
			}
			else if(['s', 'q', 'r', 't'].contains(znak)){
				op.push(znak)
				if (op.join('') == 'sqrt')
					operace.push('sqrt')
			}
			else{

			}
		}

	}
	//console.log("vstupní operace", operace)
	//console.log("vstupní čisla", cisla)
	return [cisla, operace]
}

function removeOperators(cisla, operace, seznam){
	//console.log("cisla before:",cisla)
	//console.log("operace before:",operace)
	//console.log("seznam:",seznam)
	while(operace.containsArrItem(seznam)){
		for(i = 0; i < operace.length; i++){
			if (seznam.contains(operace[i])){
				op1 = Number(cisla[i])
				op2 = Number(cisla[i+1])
				switch(operace[i]){
					case '+':
						result = MathLib.add(op1, op2)
					break
					case '-':
						result = MathLib.sub(op1, op2)
					break
					case '*':
						result = MathLib.mul(op1, op2)
					break
					case '/':
						result = MathLib.div(op1, op2)
					break
					case '^':
						result = MathLib.pow(op1, op2)
					break
					case '!':
						result = MathLib.factorial(op1)
					break
					case 'sqrt':
						result = MathLib.sqrt(op1)
					break
				}
				cisla[i] = result
				if (operace[i] != '!' && operace[i] != 'sqrt')
					cisla.removeIndex(i+1)
				operace.removeIndex(i)
			}
		}
	}
	//console.log("cisla after:",cisla)
	//console.log("operace after:",operace)
	return [cisla, operace]

}

function getMeNested(str){
	read = false
	substr = ""
	subs = []
	deep = 0
	for(i = 0; i < str.length; i++){
		ch = str[i]
		if (ch == '('){
			read = true
			if (deep++ == 0)
				continue
		}
		if (ch == ')'){
			deep--;
			if (deep == 0){
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

function auto_complete(str){
	//console.log(str)

	while(['+','-','*','/','^', '('].contains(str.slice(-1)))
		str = str.substring(0, str.length - 1)

	oteviraci = 0
	zaviraci = 0
	str.split('').forEach(znak => {
		if (znak == '(')
			oteviraci++
		if (znak == ')')
			zaviraci++
	})
	while (oteviraci > zaviraci){
		str += ')'
		zaviraci++
	}

	//console.log(str)
	return str
}

function interpretuj(str){

	nested = getMeNested(str)
	nested.forEach(value => {
		//console.log("before replace", str)
		str = str.replace(value, interpretuj(value))
		//console.log("after replace", str)
	})


	result = parse(str)
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

function interpret(str){
	str = auto_complete(str)
	result = interpretuj(str)
	return result
}

//str = "-(3^(2+1-5^1)"
//str = "-3^(2+1) + 14/-7 * 3!"
//str = "5*((8+2/1^-2))"
//str = "50!"
//str = "8/2+3*sqrt(144)+3!"
//str = "sqrt(125348)"
//str = "sqrt(4)"
//str = "sqrt(25)"
//str = "sqrt(1024)"
//str = "sqrt(36)"
//str = "3^-2"
//str = "sqrt(99999999999)"

//vysledek = interpret(str)
//console.log("výsledek: "+vysledek)