var events = new EventEmitter();


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
/*
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
	if (code >= 48 && code <= 57) {
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
*/
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






var $toolbar = document.querySelector('flexus-toolbar')
var toolbarWidth = $toolbar.offsetWidth;
var toolbarHeight = $toolbar.offsetHeight;

var errorRipple = createRiple();
var unerrorRipple = createRiple();
var displayRipple = createRiple();

errorRipple.style.backgroundColor = '#E91E63';
unerrorRipple.style.backgroundColor = '#03A9F4';

var displayRippleAnimation = animateRipple(toolbarWidth, toolbarHeight, displayRipple, $toolbar, false, false, false, 0.6, 0, 300, false)
var errorAnimation = animateRipple(toolbarWidth, toolbarHeight, errorRipple, $toolbar, false, false, false, 1, 1, 300, false, () => {
	errorRipple.style.display = 'none';
	$toolbar.className = 'error';
})
var unerrorAnimation = animateRipple(toolbarWidth, toolbarHeight, unerrorRipple, $toolbar, false, false, false, 1, 1, 300, false, () => {
	unerrorRipple.style.display = 'none';
	$toolbar.className = '';
})

errorAnimation.pause();
errorAnimation.currentTime = 0;
unerrorAnimation.pause();
unerrorAnimation.currentTime = 0;
displayRippleAnimation.pause();
displayRippleAnimation.currentTime = 0;


events.on('error', (message = 'error') => {
	errorRipple.style.display = 'block';
	errorAnimation.currentTime = 0;
	errorAnimation.play();
	$display.textContent = message;
})
events.on('unerror', (message = '') => {
	unerrorRipple.style.display = 'block';
	unerrorAnimation.currentTime = 0;
	unerrorAnimation.play();
	$display.textContent = message;
})

events.on('display-result', (message = '') => {
	displayRippleAnimation.currentTime = 0;
	displayRippleAnimation.play();
	$display.textContent = message;
})
events.on('display', (message = '') => {
	$display.textContent = message;
})