'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {var 


	Toolbar = (function () {function Toolbar() {_classCallCheck(this, _Toolbar);}_createClass(Toolbar, [{ key: 'ready', value: 

			function ready() {

				var mq = this.$.hackymediaquery;

				function getMediaQuery() {
					var val = window.getComputedStyle(mq, ":after").content.replace(/\"/g, '');
					console.log(val, val == 'tablet');
					this.istablet = val == 'tablet';}

				mq.addEventListener('transitionend', getMediaQuery.bind(this), true);
				getMediaQuery.call(this);} }]);var _Toolbar = Toolbar;Toolbar = PolymerElement('nexus-page')(Toolbar) || Toolbar;return Toolbar;})();})();