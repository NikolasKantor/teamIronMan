/*

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
	var x = e.offsetX;
	var y = e.offsetY;
	(target.ripple || new Ripple(target)).replay(x, y);
}

var defaultDuration = 1000;

class Ripple {

	constructor(element, options) {
		this.element = element;
		this.spill = element.hasAttribute('spill') || this.spill || false;
		this.recentering = element.hasAttribute('recentering') || this.recentering || false;
		this.centered = element.hasAttribute('centered') || this.centered || false;
		Object.assign(this, options);
		this.fromOpacity = this.fromOpacity || 0.6;
		this.toOpacity = this.toOpacity || 0;
		this.autohide = this.autohide || true;

		this.rippleElement = this.element.appendChild(Ripple.create());
		if (this.color) {
			this.rippleElement.style.backgroundColor = this.color;
		}
		this.setupPlayer();
		if (this.x !== undefined) {
			this.reposition(this.x, this.y);
		}
		if (element.ripple == undefined) {
			element.ripple = this;
		}
	}

	reposition(x, y) {
		this.x = x;
		this.y = y;

		var elementWidth = this.element.offsetWidth;
		var elementHeight = this.element.offsetHeight;

		if (this.centered) {
			// x a y je uprostred
			this.x = elementWidth / 2;
			this.y = elementHeight / 2;
		} else if (this.recentering) {
			// zkoriguje x a y smerem na stred
			var halfWidth = elementWidth / 2;
			var halfHeight = elementHeight / 2;
			this.x = (this.x - halfWidth) / 2 + halfWidth;
			this.y = (this.y - halfHeight) / 2 + halfHeight;
		}

		var longWidth = Math.max(this.x, elementWidth - this.x);
		var longHeight = Math.max(this.y, elementHeight - this.y);

		this.diameter = Math.sqrt((longWidth * longWidth) + (longHeight * longHeight));
		if (this.duration === undefined) {
			this.duration = 300;
			// TODO - duration jeste ovlivnovat podle this.diameter (na mobilu je to pomale, na tabletu moc rychle)
			if (this.spill) {
			} else {
				this.duration = 400;
			}
		}

		if (this.spill) {
			this.diameter *= 1.4;
		} else {
			this.diameter *= 2;
			this.element.style.overflow = 'hidden';
		}
		this.player.playbackRate = defaultDuration / this.duration;

		this.rippleElement.style.width = this.rippleElement.style.height = this.diameter + 'px';
		// TODO davat na misto pomoci top/left oproti translate3d
		this.rippleElement.style.left = this.x + 'px';
		this.rippleElement.style.top = this.y + 'px';
	}

	setupPlayer() {
		this.player = this.rippleElement.animate([{
			display: 'block',
			opacity: this.fromOpacity,
			transform: 'translate3d(-50%, -50%, 0) scale(0)'
		}, {
			display: 'none',
			opacity: this.toOpacity,
			transform: 'translate3d(-50%, -50%, 0) scale(1)'
		}], {
			duration: defaultDuration,
			easing: 'ease-in'
		})
		
		this.player.onfinish = () => {
			if (this.autohide) {
				this.rippleElement.style.display = 'none';
			}
			if (this.callback !== undefined) this.callback.call(this);
		}

		this.player.pause();
	}

	replay(x, y) {
		if (this.player.playState == 'finished') {
			this.player.currentTime = 0;
		} else {
			this.reset();
		}
		if (x !== undefined) {
			this.reposition(x, y);
		}
		this.player.play();
	}
	reset() {
		this.player.pause();
		this.player.currentTime = 0;
	}

	static create() {
		var ripple = document.createElement('flexus-ripple');
		ripple.style.transform = 'translate3d(-50%, -50%, 0) scale(1)';
		return ripple;
	}

}