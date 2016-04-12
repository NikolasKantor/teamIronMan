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

// button click listeners
$0.addEventListener('click', () => numberPress(0))
$1.addEventListener('click', () => numberPress(1))
$2.addEventListener('click', () => numberPress(2))
$3.addEventListener('click', () => numberPress(3))
$4.addEventListener('click', () => numberPress(4))
$5.addEventListener('click', () => numberPress(5))
$6.addEventListener('click', () => numberPress(6))
$7.addEventListener('click', () => numberPress(7))
$8.addEventListener('click', () => numberPress(8))
$9.addEventListener('click', () => numberPress(9))
$dot.addEventListener('click', () => dot())
$add.addEventListener('click', () => add());
$sub.addEventListener('click', () => sub());
$mul.addEventListener('click', () => mul());
$div.addEventListener('click', () => div());
$equals.addEventListener('click', () => equals());
$clear.addEventListener('click', () => clear());
$backspace.addEventListener('click', () => backspace());

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

function print(str) {
	$display.textContent += str;
}

function numberPress(num) {
	console.warn('TODO: Implement numberPress()', num)
	print(num);
}

function dot() {
	console.warn('TODO: Implement dot()')
	print('.');
}

function add() {
	console.warn('TODO: Implement add()')
	print(' + ');
}

function sub() {
	console.warn('TODO: Implement sub()')
	print(' - ');
}

function mul() {
	console.warn('TODO: Implement mul()')
	print(' * ');
}

function div() {
	console.warn('TODO: Implement div()')
	print(' / ');
}

function equals() {
	console.warn('TODO: Implement equals()')
	$display.textContent = eval($display.textContent);
}

function clear() {
	console.warn('TODO: Implement clear()')
}

function backspace() {
	console.warn('TODO: Implement backspace()')
}