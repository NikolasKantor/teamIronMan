'use strict';

if (typeof global == 'object') {
	global.MathLib = require('./MathLib.js');
	global.events = require('./core.js');
}

if (!Array.prototype.includes) {
	Array.prototype.includes = function(element) {
		return this.indexOf(element) != -1;
	};
}

/** 
* @brief Smazání podle indexu
* @param index index ke smazání
* Zavedení prototypové funkce pro třídu array, která smaže obsah na určitém indexu
* @return void
*/
Array.prototype.removeIndex = function(index) {
	if (index < this.length) {
		this.splice(index, 1);
	}
};

/** 
* @brief Zjištění společné hodnoty 
* @param arr druhé pole k porovnání
* Zavedení prototypové funkce pro třídu array, která zjistá, zda mají 2 pole nějákou stejnou hodnotu
* @return boolean zda pole obsahují společný prvek
*/
Array.prototype.intersects = function(arr) {
		for (var i = 0; i < this.length; i++) {
				if (arr.includes(this[i])) {
						return true;
				}
		}
		return false;
};

var TOKENS1 = ['+','-','*','/','^','!', '√'];
var TOKENS2 = ['*','/',undefined, '^','(','!'];
var TOKENS3 = ['+','-'];

/** 
* @brief Parser pro následnou interpretaci 
* @param str string získaný z HTML elementu
* Funkce rozparsuje string do dvou polí, jedno s číselnýma hodnotama a druhé s operacemi
* @return [string, string] vrací pole polí obsahující operátory a hodnoty
*/
function parse(str) {
	var cisla = [];
	var cislo = [];
	var operace = [];
	var op = [];
	var idx = 0;
	var znak;
	for (var i = 0; i < str.length; i++) {
		if (str[i].trim().length) {
			znak = str[i];
			if (TOKENS1.includes(znak)) {
				if ((TOKENS2.includes(str[i-1])) && TOKENS3.includes(znak))
					cislo.push(znak);
				else
					operace.push(znak);
			} else if (!isNaN(parseInt(znak)) || znak == '.') {
				if (!isNaN(parseInt(str[i+1])) || str[i+1] == '.')
					cislo.push(znak);
				else{
					cislo.push(znak);
					cisla.push(cislo.join(''));
					cislo = [];
				}
			}
		}

	}
	return [cisla, operace];
}

/** 
* @brief Vyhodnocení operátorů z pole
* @param cisla pole se zbývajícími nevyhodnocenými čísly
* @param cisla pole se zbývajícími nevyhodnocenými operátory
* @param seznam pole obsahující operátory které se budou vyhodnocovat
* Funkce podle seznamu operací které jí příjdou v proměnné seznam tyto operátory z pole operaci vyhonotí, přičemž používá hodnoty ze seznamu čísel
* @return [string, string] vrací pole polí obsahující operátory a hodnoty
*/
function removeOperators(cisla, operace, seznam) {
	while (operace.intersects(seznam)) {
		for (var i = 0; i < operace.length; i++) {
			if (seznam.includes(operace[i])) {
				var op1 = Number(cisla[i]);
				var op2 = Number(cisla[i+1]);
				switch(operace[i]) {
					case '+':	cisla[i] = MathLib.add(op1, op2);	break
					case '-':	cisla[i] = MathLib.sub(op1, op2);	break
					case '*':	cisla[i] = MathLib.mul(op1, op2);	break
					case '/':	cisla[i] = MathLib.div(op1, op2);	break
					case '^':	cisla[i] = MathLib.pow(op1, op2);	break
					case '!':	cisla[i] = MathLib.factorial(op1);	break
					case '√':cisla[i] = MathLib.sqrt(op1);		break
				}
				if (operace[i] != '!' && operace[i] != '√')
					cisla.removeIndex(i + 1);
				operace.removeIndex(i);
			}
		}
	}
	//console.log("cisla after:",cisla)
	//console.log("operace after:",operace)
	return [cisla, operace];

}

/** 
* @brief Vyhledání zanořených operací (uzávorkovaných)
* @param str string ve kterém se bude vyhledávat
* Funkce vyhledá ve stringu první uzávorkované operace
* @return string první nalezený uzavorkovaný výraz
*/
function getMeNested(str) {
	var read = false;
	var substr = "";
	var subs = [];
	var deep = 0;
	var ch;
	for (var i = 0; i < str.length; i++) {
		ch = str[i];
		if (ch == '(') {
			read = true;
			if (deep++ == 0)
				continue;
		}
		if (ch == ')') {
			deep--;
			if (deep == 0) {
				read = false;
				subs.push(substr);
				substr = "";
			}
		}
		if (read)
			substr += ch;
	}

	return subs;
}

/** 
* @brief Automatické doplňování výrazů
* @param str string který se bude upravovat
* Funkce doplňuje validně neukončený výraz, konkrétně dodává zavírací závorky a odstraňuje operátory na konci, za kterými není žádná hodnota
* @return string doplněný string
*/
function autoComplete(str) {
	// doplneni neuzavorkovaneho SQRT
	str = str.replace(/([^\(])√\(?(\d+)\)?/, '$1(√($2))');

	var tokens = ['+','-','*','/','^', '('];
	while (tokens.includes(str.slice(-1)))
		str = str.substring(0, str.length - 1);

	var oteviraci = 0;
	var zaviraci = 0;
	str.split('').forEach(znak => {
		if (znak == '(')
			oteviraci++;
		if (znak == ')')
			zaviraci++;
	})
	while (oteviraci > zaviraci) {
		str += ')';
		zaviraci++;
	}

	return str;
}

/** 
* @brief Vyhodnocení stringu
* @param str string který se bude vyhodnocovat
* Funkce interpretuje celý string, po nalezení zanořených operací, provedení jejich zpracování následně naparsuje string a provede vyhodnocení
* @return Number získanou hodnotu
*/
function interpretuj(str) {

	getMeNested(str).forEach(value => {
		//console.log("before replace", str)
		str = str.replace(value, interpretuj(value));
		//console.log("after replace", str)
	})

	var result = parse(str);
	if (!result)
		return;
	result = removeOperators(result[0], result[1], ['!']);
	result = removeOperators(result[0], result[1], ['√']);
	result = removeOperators(result[0], result[1], ['^']);
	result = removeOperators(result[0], result[1], ['/']);
	result = removeOperators(result[0], result[1], ['*']);
	result = removeOperators(result[0], result[1], ['+','-']);

	if (result[0].length > 1) {
		events.emit('math-error');
		return;
	}
	return result[0][0];
}

/** 
* @brief Interpretace
* @param str string který se bude vyhodnocovat
* Funkce provede automatické diplňění stringu podle jeho obsahu, následně jej vyhodnotí a vrací výslednou hodnotu
* @return Number výsledná hodnota
*/
function interpret(str) {
	str = autoComplete(str);
	return interpretuj(str);
}


if (typeof module == 'object') {
	module.exports.autoComplete = autoComplete;
}
if (typeof module == 'object') {
	module.exports.interpret = interpret;
}

