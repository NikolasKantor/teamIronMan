'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {

	// TODO: REQEST ANIMATION FRAME

	// import
	var _fx = fx;var platform = _fx.platform;var constrain = _fx.constrain;var template = _fx.template;var reflect = _fx.reflect;var nonenumerable = _fx.nonenumerable;var autobind = _fx.autobind;var draggable = _fx.draggable;var traverse = _fx.traverse;var traverse = _fx.traverse;var 




	Swipeable = (function () {function Swipeable() {_classCallCheck(this, _Swipeable);}_createClass(Swipeable, [{ key: 'ready', value: 

			function ready() {
				this.setupDragging();} }, { key: 'setupDragging', value: 


			function setupDragging() {
				this.onMousedown2 = this.onMousedown2.bind(this);
				this.onMousemove2 = this.onMousemove2.bind(this);
				this.onMouseup2 = this.onMouseup2.bind(this);

				this.section = this.querySelector('section');
				console.log('section', this.section);
				this.section.addEventListener('mousedown', this.onMousedown2);} }, { key: 'mousedown', value: 


			function mousedown(e) {
				this.dragging = true;
				this.initx = e.x + (this.expanded ? -drawerWidth : 0);} }, { key: 'mousemove', value: 

			function mousemove(e) {
				var dragX = e.x - this.initx;
				this.section.style.transform = 'translate3d(' + dragX + 'px, 0, 0)';} }, { key: 'mouseup', value: 

			function mouseup(e) {
				this.dragging = false;
				//this.section.style.transform = ``;
			} }]);var _Swipeable = Swipeable;Swipeable = draggable(Swipeable) || Swipeable;Swipeable = fx.Element('[swipeable]')(Swipeable) || Swipeable;Swipeable = autobind(Swipeable) || Swipeable;return Swipeable;})();})();