var $display = document.querySelector('#display');
var $0 = document.querySelector('#num0');
var $1 = document.querySelector('#num1');
var $2 = document.querySelector('#num2');
var $3 = document.querySelector('#num3');
var $4 = document.querySelector('#num4');
var $5 = document.querySelector('#num5');
var $6 = document.querySelector('#num6');
var $7 = document.querySelector('#num7');
var $8 = document.querySelector('#num8');
var $9 = document.querySelector('#num9');
var $dot = document.querySelector('#dot');
var $add = document.querySelector('#add'); // +
var $sub = document.querySelector('#sub'); // -
var $mul = document.querySelector('#mul'); // *
var $div = document.querySelector('#div'); // /
var $equals = document.querySelector('#equals'); // =
var $clear = document.querySelector('#clear'); // 
var $backspace = document.querySelector('#backspace'); // =




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

// key press listeners
window.addEventListener('keydown', e => {
	if (e.keyCode !== 82 && !e.shiftKey) {
		// prevent default behavior except for ctrl+r for dev purposes
		e.preventDefault();
	}
	var code = e.keyCode;
	if (code >= 48 && code <= 57 /* && e.shiftKey */) {
		// note: should we accept only shift-ed keys according to czech keyboard?
		numberPress(code - 48)
	} else if (code >= 96 && code <= 105) {
		numberPress(code - 96)
	} else switch (code) {
		case 13: equals(); break; // enter
		case 187: equals(); break; // =
		case 107: add(); break; // +
		case 109: sub(); break; // -
		case 106: mul(); break; // *
		case 111: div(); break; // /
		case 8: backspace(); break; // backspace
		// TODO investigate: is there any keyboard mapping for culcators 'clear' function?
	}
})

if ('ontouchstart' in window) $backspace.addEventListener('touchstart', backspaceStart)
if ('onmousedown' in window) $backspace.addEventListener('mousedown', backspaceStart)
if ('onpointerdown' in window) $backspace.addEventListener('pointerdown', backspaceStart)

if ('ontouchend' in window) $backspace.addEventListener('touchend', backspaceEnd)
if ('onmouseup' in window) $backspace.addEventListener('mouseup', backspaceEnd)
if ('onpointerup' in window) $backspace.addEventListener('pointerup', backspaceEnd)

var backspaceTimeout;
function onBackspaceTimeout() {
	$display.textContent = '';
	displayRippleAnimate();
}
function backspaceStart(e) {
	backspaceTimeout = setTimeout(onBackspaceTimeout, 500)
}
function backspaceEnd(e) {
	clearTimeout(backspaceTimeout);
	var content = $display.textContent;
	if (content.length) {
		$display.textContent = content.slice(0, content.length - 1);
	}
}
