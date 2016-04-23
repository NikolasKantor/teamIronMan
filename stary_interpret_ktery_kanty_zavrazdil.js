var numbers;
var operation;
var precision;
var clearNext;

function reset() {
	// restore internal values to default
	numbers = [0];
	operation = undefined;
	precision = 0;
	clearNext = false;
}

reset();

function print(str) {
	$display.textContent += str;
}
function clearOutput() {
	$display.textContent = '';
}

function numberPress(num) {
	// clear output if needed (after calling equals())
	if (clearNext) {
		clearOutput();
		clearNext = false;
	} 
	var value = numbers[0];
	if (precision > 0) {
		// handle float numbers:
		// divide given number by current precision
		value += num / Math.pow(10, precision++);
		// not so nice hacky way around the 'float problem' to avoid problems like 0.10000000000001
		value = parseFloat(value.toFixed(precision));
	} else {
		// handle int numbers
		// bump up current value by 10 and add given number
		value = (value * 10) + num;
	}
	numbers[0] = value;
	// print out output
	print(num);
}

function dot() {
	precision = 1;
	print('.');
}

var add = applyOperation.bind(null, MathLib.add, '+');
var sub = applyOperation.bind(null, MathLib.sub, '-');
var mul = applyOperation.bind(null, MathLib.mul, '*');
var div = applyOperation.bind(null, MathLib.div, '/');

function applyOperation(opFn, opChar) {
	if (numbers.length > 1) {
		// apply previous operation to stacked numbers
		// but only if operation is specified (its not after calling equals())
		if (operation !== undefined) {
			numbers = [0, operation(numbers)];
		}
	} else {
		// unshift zero as a base for next number
		numbers.unshift(0);
	}
	// store new operation
	operation = opFn;
	// print out operation character
	print(' ' + opChar + ' ');
	// also prevent from clearing output
	if (clearNext) clearNext = false;
}

function equals() {
	console.log('equals', numbers, typeof operation)
	if (operation === undefined) {
		// without operation theres nothing to calculate
		var result = numbers[0];
	} else {
		// calculate result with stored operation
		var result = operation(numbers);
	}
	// clear out output
	clearOutput();
	// reset internals and store result for next potential operations
	reset();
	numbers.push(result);
	// print out value and store information to clear it next time we need to print something else
	print(result);
	clearNext = true;
}

function clear() {
	// reset interlan variabled
	reset();
	// clear out output
	clearOutput();
}

function backspace() {
	console.warn('TODO: Implement backspace()')
}


// button click listeners
$0.addEventListener('click', numberPress.bind(null, 0))
$1.addEventListener('click', numberPress.bind(null, 1))
$2.addEventListener('click', numberPress.bind(null, 2))
$3.addEventListener('click', numberPress.bind(null, 3))
$4.addEventListener('click', numberPress.bind(null, 4))
$5.addEventListener('click', numberPress.bind(null, 5))
$6.addEventListener('click', numberPress.bind(null, 6))
$7.addEventListener('click', numberPress.bind(null, 7))
$8.addEventListener('click', numberPress.bind(null, 8))
$9.addEventListener('click', numberPress.bind(null, 9))
$dot.addEventListener('click', dot.bind(null))
$add.addEventListener('click', add.bind(null));
$sub.addEventListener('click', sub.bind(null));
$mul.addEventListener('click', mul.bind(null));
$div.addEventListener('click', div.bind(null));
$equals.addEventListener('click', equals.bind(null));
$backspace.addEventListener('click', backspace.bind(null));
