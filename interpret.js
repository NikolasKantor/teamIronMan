/*
	FUNKCE PRO ZPRACOVÁNÍ A VYHODNOCENÍ SLOŽITÝCH VÝRAZŮ
	 (+,-,*,/), faktoriálem, umocňováním s přirozenými exponenty
*/

var print = console.log.bind(console);

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

str = "3-21+2*84+1"

function parse(str){
	cislo = []
	cisla = []
	operace = []
	idx = 0

	str.split('').forEach(znak => {
		if (!isNaN(parseInt(znak)) || znak == "."){
			cisla[idx] = ((cisla[idx] || '') + znak)
		}
		else {
			idx++
			if(znak == "+" || znak == "-" || znak == "*" || znak == "/" || znak == "!" || znak == "^"){
				operace.push(znak)
			}
		}
	})
	console.log("vstupní operace", operace)
	console.log("vstupní čisla", cisla)
	return [cisla, operace]
}



function interpret(cisla, operace){
	while(operace.contains("*") || operace.contains("/")){
		for(i = 0; i < operace.length; i++){
			if (operace[i] == "*" || operace[i] == "/"){
				op1 = Number(cisla[i])
				op2 = Number(cisla[i+1])
				result = operace[i] == "*" ? op1*op2 : op1/op2
				operace.removeIndex(i)
				cisla[i] = result
				cisla.removeIndex(i+1)
			}
		}
	}

	while(operace.contains("+") || operace.contains("-")){
		for(i = 0; i < operace.length; i++){
			if (operace[i] == "+" || operace[i] == "-"){
				op1 = Number(cisla[i])
				op2 = Number(cisla[i+1])
				result = operace[i] == "+" ? op1+op2 : op1-op2
				operace.removeIndex(i)
				cisla[i] = result
				cisla.removeIndex(i+1)
			}
		}
	}

	console.log("výstupní operace: ",operace)
	console.log("výstupní čísla: ",cisla)
	return cisla[0]
}

parseOut = parse(str)
vysledek = interpret(parseOut[0], parseOut[1])
console.log("výsledek: "+vysledek)