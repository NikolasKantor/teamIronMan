var $toolbar = document.querySelector('flexus-toolbar')
var $display = document.querySelector('#display');
var $buttons = document.querySelector('#buttons');
var $backspace = document.querySelector('#buttons button[data-action="backspace"]');

var toolbarWidth = $toolbar.offsetWidth;
var toolbarHeight = $toolbar.offsetHeight;


// TODO recalculate on window resize
var displayRipple = new Ripple($toolbar, {x: toolbarWidth, y: toolbarHeight});
var errorRipple = new Ripple($toolbar, {
	x: toolbarWidth,
	y: toolbarHeight,
	fromOpacity: 1,
	toOpacity: 1,
	color: '#E91E63',
	callback: function() {
		this.rippleElement.style.display = 'none';
		$toolbar.className = 'error';
	}
})
var unerrorRipple = new Ripple($toolbar, {
	x: toolbarWidth,
	y: toolbarHeight,
	fromOpacity: 1,
	toOpacity: 1,
	color: '#03A9F4',
	callback: function() {
		this.rippleElement.style.display = 'none';
		$toolbar.className = '';
	}
});


$buttons.addEventListener('click', e => {
	if (e.target.dataset.char) {
		events.emit('display-char', e.target.dataset.char);
	}
	if (e.target.dataset.action == 'equals') {
		events.emit('display-result');
	}
})

// key press listeners
window.addEventListener('keydown', e => {
	if (e.keyCode !== 82 && !e.shiftKey) {
		// prevent default behavior except for ctrl+r for dev purposes
		e.preventDefault();
	}
	var code = e.keyCode;
	if (code >= 48 && code <= 57) {
		events.emit('display-char', code - 48)
	} else if (code >= 96 && code <= 105) {
		events.emit('display-char', code - 96)
	} else switch (code) {
		case 13: // enter
		case 187: // =
			events.emit('display-result');
			break;
		case 107: events.emit('display-char', '+'); break;
		case 109: events.emit('display-char', '-'); break;
		case 106: events.emit('display-char', '*'); break;
		case 111: events.emit('display-char', '/'); break;
		case 8: events.emit('display-backspace'); break; // backspace
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
	events.emit('display-clear');
}
function backspaceStart(e) {
	backspaceTimeout = setTimeout(onBackspaceTimeout, 500)
}
function backspaceEnd(e) {
	clearTimeout(backspaceTimeout);
	events.emit('display-backspace');
}


function showErrorRipple() {
	errorRipple.rippleElement.style.display = 'block';
	errorRipple.replay();
}
function hideErrorRipple() {
	unerrorRipple.rippleElement.style.display = 'block';
	unerrorRipple.replay();
}

var isError = false;
var expression = '';

events.on('math-error', (message = 'error') => {
	if (isError) return;
	isError = true;
	showErrorRipple();
	expression = '';
	$display.textContent = message;
})
events.on('math-unerror', (message = '') => {
	if (!isError) return;
	isError = false
	hideErrorRipple();
	if (message.length) {
		$display.textContent = message;
	}
})

events.on('display-char', (char = '') => {
	if (isError) {
		events.emit('math-unerror');
	}
	expression += char;
	$display.textContent = expression;
})
events.on('display-backspace', () => {
	if (isError) {
		events.emit('math-unerror');
	}
	if (expression.length) {
		expression = expression.slice(0, expression.length - 1);
		$display.textContent = expression;
	}
})
events.on('display-clear', () => {
	if (isError) {
		events.emit('math-unerror');
	} else {
		displayRipple.replay();
	}
	$display.textContent = expression = '';
})
events.on('display-result', () => {
	displayRipple.replay();
	if (expression.length) {
		// catch unexpected errors during interpreting expression
		try {
			var result = interpret(expression);
		} catch (error) {
			console.error('error evaluating expression', expression, error)
			events.emit('math-error');
		}
		if (result === undefined || result == Infinity) {
			// display error if result is undefined
			events.emit('math-error');
		} else {
			// result is ok, display it
			$display.textContent = expression = result + '';
		}
	} else {
		$display.textContent = 0;
	}
})
