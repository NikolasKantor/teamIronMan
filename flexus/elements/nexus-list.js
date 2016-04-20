'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {

	function delegate(callback) {
		document.addEventListener('click', function (e) {
			var el = e.target;
			while (el) {
				//console.log(el, el.localName);
				var name = el.localName;
				if (name == null) break;
				if (name == 'button') break;
				if (name == 'input') break;
				if (name == 'textarea') break;
				if (callback(el)) break;
				el = el.parentNode;}});}var 





	List = (function () {function List() {_classCallCheck(this, _List);}_createClass(List, [{ key: 'ready', value: 

			function ready() {

				this.sortable = this.hasAttribute('sortable');
				this.handle = this.hasAttribute('handle');

				this.onPointerDown = this.onPointerDown.bind(this);
				this.onPointerUp = this.onPointerUp.bind(this);
				this.onPointerMove = this.onPointerMove.bind(this);
				this.dragStart = this.dragStart.bind(this);
				this.dragEnd = this.dragEnd.bind(this);
				this.dragMove = this.dragMove.bind(this);

				this.addEventListener('pointerdown', this.onPointerDown);} }, { key: 'onPointerDown', value: 



			function onPointerDown(e) {

				function delegate(el, filter) {
					while (el) {
						if (filter(el)) return el;
						if (el.localName == null) break;
						el = el.parentNode;}}



				var target = e.target;

				// if list is sortable only using handles check if target is the handle
				if (this.handle && e.target.getAttribute('icon') != 'reorder') {
					return false;}


				// delegate target and check wheter it's list item
				target = delegate(target, function (el) {return el.localName == 'nexus-item' || el.hasAttribute('nx-item');});
				if (target == undefined) {
					return false;}


				this.target = target;
				this.addListeners();
				this.dragStart(e);} }, { key: 'onPointerUp', value: 


			function onPointerUp(e) {
				this.removeListeners();
				this.dragEnd(e);} }, { key: 'onPointerMove', value: 


			function onPointerMove(e) {
				this.dragMove(e);} }, { key: 'addListeners', value: 


			function addListeners() {
				document.addEventListener('pointerup', this.onPointerUp);
				document.addEventListener('pointermove', this.onPointerMove);} }, { key: 'removeListeners', value: 


			function removeListeners() {
				document.removeEventListener('pointerup', this.onPointerUp);
				document.removeEventListener('pointermove', this.onPointerMove);} }, { key: 'dragStart', value: 


			function dragStart(e) {
				this.startX = e.x;
				this.startY = e.y;
				this.target.setAttribute('elevation', 1);} }, { key: 'dragEnd', value: 


			function dragEnd() {
				this.target.removeAttribute('elevation');
				this.target.style.transform = 'translateY(0px)';
				console.log('dragEnd');} }, { key: 'dragMove', value: 


			function dragMove(e) {
				console.log('dragMove', e);
				this.target.style.transform = 'translateY(' + (e.y - this.startY) + 'px)';} }]);var _List = List;List = PolymerElement('nexus-list')(List) || List;return List;})();})();