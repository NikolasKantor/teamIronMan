/*
	Interpret pro kalkulačku
	autor: Nikolas Kantor

	TODO:
		matematická funkce navíc
		koncove stavy a doplňování
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
	idx = 0

	for (i = 0; i < str.length; i++){
		if (str[i].trim().length){
			znak = str[i]
			if (['+','-','*','/','^','!'].contains(znak)){
				if ((['*','/',undefined].contains(str[i-1])) && ['+','-'].contains(znak))
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
			else{
				//console.log("The fuck man?")
			}
		}

	}
	//console.log("vstupní operace", operace)
	//console.log("vstupní čisla", cisla)
	return [cisla, operace]
}

function removeOperators(cisla, operace, seznam){
//	console.log("cisla before:",cisla)
//	console.log("operace before:",operace)
//	console.log("seznam:",seznam)
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
				}
				cisla[i] = result
				if (operace[i] != '!')
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

function interpret(str){

	nested = getMeNested(str)
	nested.forEach(value => {
		//console.log("before replace", str)
		str = str.replace(value, interpret(value))
		//console.log("after replace", str)
	})

	result = parse(str)
	result = removeOperators(result[0], result[1], ['!'])
	result = removeOperators(result[0], result[1], ['^'])
	result = removeOperators(result[0], result[1], ['/'])
	result = removeOperators(result[0], result[1], ['*'])
	result = removeOperators(result[0], result[1], ['+','-'])

	//console.log("výstupní operace: ",result[1])
	//console.log("výstupní čísla: ",result[0])
	//console.log("result", result[0][0])
	return result[0][0]
}

//str = "-3^(2+2) + 14/-7 * 3! + (46 + 1 + (144/(12*4)*1))"
//str = "-3^(2+2) + 14/-7 * 3!"
str = ""

vysledek = interpret(str)
console.log("výsledek: "+vysledek)