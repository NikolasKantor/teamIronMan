/// DOM element <flexus-toolbar>
var $toolbar = document.querySelector('flexus-toolbar');
/// DOM element #display s vystupem kalkulacky
var $display = document.querySelector('#display');
/// DOM element #buttons obsahujici ridici tlacitka kalkulacky
var $buttons = document.querySelector('#buttons');
/// DOM element tlacitko backspace
var $backspace = document.querySelector('#buttons button[data-action="backspace"]');

/// sirka toolbaru
var toolbarWidth = $toolbar.offsetWidth;
/// vyska toolbaru
var toolbarHeight = $toolbar.offsetHeight;

// TODO recalculate on window resize
/// instance Ripple tridy pro ripple efekt kliknuti
var displayRipple = new Ripple($toolbar, {x: toolbarWidth, y: toolbarHeight});
/// instance Ripple tridy pro ripple efekt chyby
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
});
/// instance Ripple tridy pro ripple efekt odstraneni chyby
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


/// event listener naslouchajici na kliknuti a 
$buttons.addEventListener('click', e => {
	/// vypise znak pri stisku tlacitka s vyznamovym znakem nebo znamenkem
	if (e.target.dataset.char) {
		events.emit('display-char', e.target.dataset.char);
	}
	/// pri stisku tlacitka rovnase spocita a vypise vysledek
	if (e.target.dataset.action == 'equals') {
		events.emit('display-result');
	}
});

/// event listener naslouchajici na stisk klavesnice
window.addEventListener('keydown', e => {
	if (e.keyCode !== 82 && !e.shiftKey) {
		/// prevent default behavior except for ctrl+r for dev purposes
		e.preventDefault();
	}
	var code = e.keyCode;
	if (code >= 48 && code <= 57) {
		/// stisk numericke klavesy
		events.emit('display-char', code - 48);
		/// stisk anglicke numericke klavesy
	} else if (code >= 96 && code <= 105) {
		events.emit('display-char', code - 96);
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

/// naveseni event listeneru na dotyk nebo stisknuti tlacitka backspace
if ('ontouchstart' in window) $backspace.addEventListener('touchstart', backspaceStart);
if ('onmousedown' in window) $backspace.addEventListener('mousedown', backspaceStart);
if ('onpointerdown' in window) $backspace.addEventListener('pointerdown', backspaceStart);
if ('ontouchend' in window) $backspace.addEventListener('touchend', backspaceEnd);
if ('onmouseup' in window) $backspace.addEventListener('mouseup', backspaceEnd);
if ('onpointerup' in window) $backspace.addEventListener('pointerup', backspaceEnd);
/// promenna s informaci o bezitim timeout
var backspaceTimeout;
/** 
* @brief callback vyprseni timeout, ktery vymaze vypis kalkulacky
*/
function onBackspaceTimeout() {
	events.emit('display-clear');
}
/** 
* @brief callback stisku klavesy backspace. nastavi pul sekundovy timeout pro uplne vymazani displeje
*/
function backspaceStart(e) {
	backspaceTimeout = setTimeout(onBackspaceTimeout, 500);
}
/** 
* @brief callback opusteni klavesy backspace. zabrani timeoutu a smaze pouze posledni znak na vypisu
*/
function backspaceEnd(e) {
	clearTimeout(backspaceTimeout);
	events.emit('display-backspace');
}

/// informaci je-li vypsat chybovy stav
var isError = false;
/// pocitany matematicky vyraz
var expression = '';

/// pri udalosti math-error se vypise chyba, zmeni vzhled ui a zobrazi chybovy ripple
events.on('math-error', (message = 'error') => {
	if (isError) return;
	isError = true;
	errorRipple.rippleElement.style.display = 'block';
	errorRipple.replay();
	expression = '';
	$display.textContent = message;
});
/// pri udalosti math-unerror se navrati vzhled ui a skryje chybovy ripple
events.on('math-unerror', (message = '') => {
	if (!isError) return;
	isError = false;
	unerrorRipple.rippleElement.style.display = 'block';
	unerrorRipple.replay();
	if (message.length) {
		$display.textContent = message;
	}
});

/// pri udalosti display-char se vypise zadany znak na vystup
events.on('display-char', (char = '') => {
	if (isError) {
		events.emit('math-unerror');
	}
	expression += char;
	$display.textContent = expression;
});
/// pri udalosti display-backspace se vymaze posledni znak z vystupu
events.on('display-backspace', () => {
	if (isError) {
		events.emit('math-unerror');
	}
	if (expression.length) {
		expression = expression.slice(0, expression.length - 1);
		$display.textContent = expression;
	}
});
/// pri udalosti display-clear se smaze veskery vypis
events.on('display-clear', () => {
	if (isError) {
		events.emit('math-unerror');
	} else {
		displayRipple.replay();
	}
	$display.textContent = expression = '';
});
/// pri udalosti display-result se spocita aktualni vyraz a vypise se (nebo pripadna chyba) na vystup
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
		if (result === undefined || result == NaN) {
			// display error if result is undefined
			events.emit('math-error', 'Chybný výraz');
		} else {
			// result is ok, display it
			$display.textContent = expression = result + '';
		}
	} else {
		$display.textContent = 0;
	}
});
