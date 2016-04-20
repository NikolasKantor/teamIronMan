function createRiple() {
	var ripple = document.createElement('flexus-ripple');
	ripple.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
	return ripple;
}/*

document.querySelector('flexus-toolbar').addEventListener('click', e => {
	var ripple = document.createElement('div');
	ripple.style.backgroundColor = 'red';
	ripple.style.borderRadius = '50%';
	ripple.style.position = 'absolute';
	ripple.style.width = ripple.style.height = '20px';
	ripple.style.left = e.offsetX + 'px';
	ripple.style.top = e.offsetY + 'px';

	var target = e.target;
	target.appendChild(ripple);
})
*/
document.addEventListener('click', e => {
	var node = e.target;
	while (node !== null) {
		if (node.hasAttribute('clickable')) {
			onClickable(e, node)
		}
		node = node.parentElement;
	}
})

function onClickable(e, target) {
	var spill = target.hasAttribute('spill');
	var recentering = target.hasAttribute('recentering');
	var centered = target.hasAttribute('centered');
	var x = e.offsetX;
	var y = e.offsetY;
	var ripple = createRiple();
	animateRipple(x, y, ripple, target, spill, recentering, centered);
}

function animateRipple(
	x, y,
	ripple,
	target,
	spill = false,
	recentering = false,
	centered = false,
	fromOpacity = 0.6,
	toOpacity = 0,
	duration,
	autohide = true,
	callback
) {

	var targetWidth = target.offsetWidth;
	var targetHeight = target.offsetHeight;

	if (centered) {
		// x a y je uprostred
		x = targetWidth / 2;
		y = targetHeight / 2;
	} else if (recentering) {
		// zkoriguje x a y smerem na stred
		var halfWidth = targetWidth / 2;
		var halfHeight = targetHeight / 2;
		x = (x - halfWidth) / 2 + halfWidth;
		y = (y - halfHeight) / 2 + halfHeight;
	}

	var longWidth = Math.max(x, targetWidth - x);
	var longHeight = Math.max(y, targetHeight - y);

	var diameter = Math.sqrt((longWidth * longWidth) + (longHeight * longHeight));

	if (duration === undefined) {
		duration = 300;
		// TODO - duration jeste ovlivnovat podle diameter (na mobilu je to pomale, na tabletu moc rychle)
		if (spill) {
		} else {
			duration = 400;
		}
	}

	if (spill) {
		diameter *= 1.4;
	} else {
		diameter *= 2;
		target.style.overflow = 'hidden';
	}

	ripple.style.width = ripple.style.height = diameter + 'px';

	// TODO davat na misto pomoci top/left oproti translate3d
	ripple.style.left = x + 'px';
	ripple.style.top = y + 'px';

	target.appendChild(ripple);

	var player = ripple.animate([{
		display: 'block',
		opacity: fromOpacity,
		transform: 'translate3d(-50%, -50%, 0) scale(0)'
	}, {
		display: 'none',
		opacity: toOpacity,
		transform: 'translate3d(-50%, -50%, 0) scale(1)'
	}], {
		duration,
		easing: 'ease-in'
	})
	
	player.onfinish = function() {
		if (autohide) {
			ripple.style.display = 'none';
		}
		if (callback !== undefined) callback();
	}

	return player;
}







var toolbar = document.querySelector('flexus-toolbar')
var toolbarWidth = toolbar.offsetWidth;
var toolbarHeight = toolbar.offsetHeight;

var errorRipple = createRiple();
var unerrorRipple = createRiple();
errorRipple.style.backgroundColor = '#E91E63';
unerrorRipple.style.backgroundColor = '#03A9F4';

var displayRipple = createRiple();
var displayRippleAnimation = animateRipple(toolbarWidth, toolbarHeight, displayRipple, toolbar, false, false, false, 0.6, 0, 300, false)

var errorAnimation = animateRipple(toolbarWidth, toolbarHeight, errorRipple, toolbar, false, false, false, 1, 1, 300, false, () => {
	errorRipple.style.display = 'none';
	toolbar.className = 'error';
})
var unerrorAnimation = animateRipple(toolbarWidth, toolbarHeight, unerrorRipple, toolbar, false, false, false, 1, 1, 300, false, () => {
	unerrorRipple.style.display = 'none';
	toolbar.className = '';
})

errorAnimation.pause();
errorAnimation.currentTime = 0;
unerrorAnimation.pause();
unerrorAnimation.currentTime = 0;
displayRippleAnimation.pause();
displayRippleAnimation.currentTime = 0;

function error() {
	errorRipple.style.display = 'block';
	errorAnimation.currentTime = 0;
	errorAnimation.play();
}
function unerror() {
	unerrorRipple.style.display = 'block';
	unerrorAnimation.currentTime = 0;
	unerrorAnimation.play();
}
function displayRippleAnimate() {
	displayRippleAnimation.currentTime = 0;
	displayRippleAnimation.play();
}