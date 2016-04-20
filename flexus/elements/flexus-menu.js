'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {

	console.log('flexus-menu loaded');

	// import
	var _fx = fx;var platform = _fx.platform;var render = _fx.render;var constrain = _fx.constrain;var template = _fx.template;var reflect = _fx.reflect;var nonenumerable = _fx.nonenumerable;var autobind = _fx.autobind;var draggable = _fx.draggable;var traverse = _fx.traverse;var traverse = _fx.traverse;

	//@autobind
	var 
	Menu = (function () {function Menu() {_classCallCheck(this, _Menu);}_createClass(Menu, [{ key: 'ready', value: 

			function ready() {
				//console.log('flexus-menu ready', this, this.parentNode.className)
				// this should be reworked. wrapping element causes it to be removed and added back to dom
				// which leads to applying custom js again. TODO - this might be bug inside shadowmaster. investigate!
				if (this.parentNode.className != 'fx-menu-animatio-wrapper') {
					this.wrapper = document.createElement('div');
					this.wrapper.className = 'fx-menu-animatio-wrapper';
					wrap(this, this.wrapper);
					this.wrapper.style.display = 'none';
					this.style.display = 'inline-block';}

				//this._killbacks = [];
				//document.addEventListener('drawer-close', () => this.expanded = false);
			}

			//_killbacks = []; // TODO
		}, { key: 'detached', value: function detached() {
				//console.log('flexus-menu detached', this)
				//this._killbacks.forEach(fn => fn());
			} }, { key: 'show', value: 

			function show(e) {var _this = this;
				//console.log('menu.show()', e);
				var y = e.clientY;var x = e.clientX;
				var menuHeight = this.offsetHeight;
				var windowHeight = window.innerHeight;
				var openFromBottom = false;
				if (windowHeight < menuHeight + y) {
					y -= menuHeight;
					openFromBottom = true;}


				if (e.sourceCapabilities.firesTouchEvents) {
					this.setAttribute('touch', '');} else 
				{
					this.removeAttribute('touch');}

				this.wrapper.style.display = 'inline-block';
				this.wrapper.style.left = x + 'px';
				this.wrapper.style.top = y + 'px';

				this.animate([
				{ transform: 'translate3d(0px, ' + (openFromBottom ? 100 : -100) + '%, 0)' }, 
				{ transform: 'translate3d(0px, 0%, 0)' }], 
				{ 
					easing: 'ease-out', 
					duration: 150 });



				var clickListener = function clickListener(e) {
					_this.hide();
					document.removeEventListener('click', clickListener);};

				var blurListener = function blurListener(e) {
					_this.hide();
					window.removeEventListener('blur', blurListener);};

				document.addEventListener('click', clickListener);
				window.addEventListener('blur', blurListener);} }, { key: 'hide', value: 


			function hide() {
				this.wrapper.style.display = 'none';} }]);var _Menu = Menu;Menu = fx.Element(Menu) || Menu;return Menu;})();




	function wrap(node, wrapper) {
		node.parentNode.insertBefore(wrapper, node);
		wrapper.appendChild(node);
		return wrapper;}})();