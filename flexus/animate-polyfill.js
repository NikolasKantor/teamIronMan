'use strict';(function () {

	function capitalize(str) {
		return str[0].toUpperCase() + str.slice(1);}


	var vendors = ['ms', 'O', 'Moz', 'Webkit'];

	function getPrefixed(prop) {
		var s = document.body.style;
		if (s[prop] == '') {
			return prop;}

		prop = capitalize(prop);
		var i = vendors.length;
		while (i--) {
			if (s[vendors[i] + prop] == '') {
				return vendors[i] + prop;}}}




	var prefixedTransition = getPrefixed('transition');
	var prefixedTransitionend = prefixedTransition + 'end';


	// save native animate
	Element.prototype._animate = Element.prototype.animate;

	// extend native animate
	Element.prototype.animate = function (definition, options) {var _this = this;

		// pass arguments to native animate
		var player = this._animate(definition, options);

		var from = definition[0];

		// polyfill problematic/unimplemented properties if present
		if (!from.clipPath) {
			return player;}

		var properties = Object.keys(from);

		var to = definition[1];

		properties.forEach(function (property) {
			if (property == 'clipPath') {
				from.webkitClipPath = from.clipPath;
				to.webkitClipPath = to.clipPath;
				properties.push('webkitClipPath');}});



		// options object could be plain number - duration
		if (typeof options != 'object') {
			options = { 
				duration: options };}



		// set up transition options
		this.style.transitionProperty = 'all';
		if ('duration' in options) {
			this.style.transitionDuration = options.duration / 1000 + 's';}

		if ('easing' in options) {
			this.style.transitionTimingFunction = options.easing;}


		// apply starting properties
		properties.forEach(function (property) {return _this.style[property] = from[property];});
		// fire browser repaint
		this.offsetWidth;
		// apply target properties
		properties.forEach(function (property) {return _this.style[property] = to[property];});

		// transitions end handler
		var handler = (function () {var _this2 = this;
			// remove event handler
			this.removeEventListener(prefixedTransitionend, handler);

			// reset transition settings
			this.style.transitionProperty = '';
			this.style.transitionDuration = '';

			if (options.fill != 'forwards') {
				// remove 
				properties.forEach(function (property) {return _this2.style[property] = '';});}}).

		bind(this);

		this.addEventListener('transitionend', handler);

		return player;};})();