'use strict';var _createDecoratedClass = (function () {function defineProperties(target, descriptors, initializers) {for (var i = 0; i < descriptors.length; i++) {var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {for (var f = 0; f < decorators.length; f++) {var decorator = decorators[f];if (typeof decorator === 'function') {descriptor = decorator(target, key, descriptor) || descriptor;} else {throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);}}if (descriptor.initializer !== undefined) {initializers[key] = descriptor;continue;}}Object.defineProperty(target, key, descriptor);}}return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}function _defineDecoratedPropertyDescriptor(target, key, descriptors) {var _descriptor = descriptors[key];if (!_descriptor) return;var descriptor = {};for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;Object.defineProperty(target, key, descriptor);}(function () {
	/*
 	var throttle = function(type, name, obj) {
 		var obj = obj || window;
 		var running = false;
 		var func = function() {
 			if (running) { return; }
 			running = true;
 			requestAnimationFrame(function() {
 				obj.dispatchEvent(new CustomEvent(name));
 				running = false;
 			});
 		};
 		obj.addEventListener(type, func);
 	};
 
 	// init - you can init any event
 	//throttle("resize", "optimizedResize");
 */


	function fireEvent(name) {
		var e = new Event(name);
		document.dispatchEvent(e);}




	var animation = { 

		circle: { 

			_calculate: function _calculate(element, from) {
				var width = element.offsetWidth;
				var height = element.offsetHeight;
				//var x = e.layerX;
				//var y = e.layerY;
				var x = from.offsetLeft + 12; // icon width is 24px. initiate animation from center
				var y = from.offsetTop + 12; // icon height is 24px. initiate animation from center
				var a = x > width / 2 ? x : width - x;
				var b = y > height / 2 ? y : height - y;
				// distance to the furthest corner
				var distance = Math.sqrt(a * a + b * b);
				return { x: x, y: y, distance: distance };}, 


			show: function show(element, from) {var _this = this;
				return new Promise(function (resolve) {var _calculate2 = 
					_this._calculate(element, from);var x = _calculate2.x;var y = _calculate2.y;var distance = _calculate2.distance;
					// reset display from hidden to previous.
					// empty string gets default css value (could be flex) rather than block
					element.style.display = '';
					element.animate([
					{ clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }, 
					{ clipPath: 'circle(' + distance + 'px at ' + x + 'px ' + y + 'px)' }], 
					{ 
						duration: 400, 
						easing: 'ease-in-out' }).
					onfinish = resolve;});}, 



			hide: function hide(element, from) {var _this2 = this;
				return new Promise(function (resolve) {var _calculate3 = 
					_this2._calculate(element, from);var x = _calculate3.x;var y = _calculate3.y;var distance = _calculate3.distance;
					//element.style.display = '';
					element.animate([
					{ clipPath: 'circle(' + distance + 'px at ' + x + 'px ' + y + 'px)' }, 
					{ clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }], 
					{ 
						duration: 400, 
						easing: 'ease-in-out' }).
					onfinish = function () {
						element.style.display = 'none';
						resolve();};});} }, 






		fade: { 

			'in': function _in(element) {
				return new Promise(function (resolve) {
					// reset display from hidden to previous.
					// empty string gets default css value (could be flex) rather than block
					element.style.display = '';
					element.animate([
					{ opacity: 0 }, 
					{ opacity: 1 }], 
					100).onfinish = resolve;});}, 



			out: function out(element) {
				return new Promise(function (resolve) {
					element.animate([
					{ opacity: 1 }, 
					{ opacity: 0 }], 
					100).onfinish = function () {
						element.style.opacity = 1; // to be removed when animate-polyfill fixed TODO
						element.style.display = 'none';
						resolve();};});}, 




			outAndKeepDisplayed: function outAndKeepDisplayed(element) {
				return new Promise(function (resolve) {
					element.animate([
					{ opacity: 1 }, 
					{ opacity: 0 }], 
					100).onfinish = function () {
						element.style.opacity = 1; // to be removed when animate-polyfill fixed TODO
						//element.style.display = 'none';
						resolve();};});} }, 






		slideIn: { 

			left: function left(element) {
				console.log('slideIn left');
				return new Promise(function (resolve) {
					// reset display from hidden to previous.
					// empty string gets default css value (could be flex) rather than block
					element.style.display = '';
					element.animate([
					{ opacity: 0, transform: 'translate3d(10%,0,0)' }, 
					{ opacity: 1, transform: 'translate3d(0%,0,0)' }], 
					{ 
						duration: 100, // ???
						easing: 'ease-out' // ???
					}).onfinish = function () {return resolve();};});}, 



			right: function right(element) {
				return new Promise(function (resolve) {
					// reset display from hidden to previous.
					// empty string gets default css value (could be flex) rather than block
					element.style.display = '';
					element.animate([
					{ opacity: 0, transform: 'translate3d(-10%,0,0)' }, 
					{ opacity: 1, transform: 'translate3d(0%,0,0)' }], 
					{ 
						duration: 100, // ???
						easing: 'ease-out' // ???
					}).onfinish = resolve;});} }, 





		slideOut: { 

			left: function left(element) {
				return new Promise(function (resolve) {
					element.animate([
					{ opacity: 1, transform: 'translate3d(0%,0,0)' }, 
					{ opacity: 0, transform: 'translate3d(-10%,0,0)' }], 
					{ 
						duration: 100, // ???
						easing: 'ease-out' // ???
					}).onfinish = function () {
						element.style.display = 'none';
						resolve();};});}, 




			right: function right(element) {
				return new Promise(function (resolve) {
					element.animate([
					{ opacity: 1, transform: 'translate3d(0%,0,0)' }, 
					{ opacity: 0, transform: 'translate3d(10%,0,0)' }], 
					{ 
						duration: 100, // ???
						easing: 'ease-out' // ???
					}).onfinish = function () {
						element.style.display = 'none';
						resolve();};});} }, 






		rotateIcon: { 

			show: function show(element) {
				_.forEach(element.children, function (element) {
					if (element.localName == 'button' && element.hasAttribute('icon')) {
						anim(element);}});


				function anim(element) {
					element.animate([
					{ transform: 'rotate(-180deg)' }, 
					{ transform: 'rotate(0deg)' }], 
					{ 
						duration: 300, 
						easing: 'ease-in-out' });}}, 




			hide: function hide(element) {
				_.forEach(element.children, function (element) {
					if (element.localName == 'button' && element.hasAttribute('icon')) {
						anim(element);}});


				function anim(element) {
					element.animate([
					{ transform: 'rotate(0deg)' }, 
					{ transform: 'rotate(180deg)' }], 
					{ 
						duration: 300, 
						easing: 'ease-in-out' });}} } };











	// import
	var _fx = fx;var _ = _fx._;var platform = _fx.platform;var render = _fx.render;var constrain = _fx.constrain;var template = _fx.template;var reflect = _fx.reflect;var nonenumerable = _fx.nonenumerable;var autobind = _fx.autobind;var draggable = _fx.draggable;var traverse = _fx.traverse;var traverse = _fx.traverse;var 



	Toolbar = (function () {var _instanceInitializers = {};function Toolbar() {_classCallCheck(this, _Toolbar);_defineDecoratedPropertyDescriptor(this, 'multisection', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'flexible', _instanceInitializers);this.








			overlap = 0;_defineDecoratedPropertyDescriptor(this, 'waterfall', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'elevation', _instanceInitializers);this.






			selection = false;this.


			search = false;}_createDecoratedClass(Toolbar, [{ key: 'ready', 

			// todo - this was not attached to instance (bug in shadowmaster), moved to constructor for now
			//unregister = [];
			value: 
			function ready() {

				// todo - execute all these unregister functions when element being removed from dom
				this.unregister = [];

				var children = this.children;
				this.section = {};

				if (!this.multisection) {
					this.multisection = _.some(this.children, function (child) {return child.localName == 'section';});}


				if (this.multisection) {
					this.section.main = _.find(children, function (child) {return child.hasAttribute('main');}) || children[0];

					// todo - this was supposed to be autobound. there might be bug in the decorator
					this.onSearchOpen = this.onSearchOpen.bind(this);
					this.onSearchClose = this.onSearchClose.bind(this);
					this.onSelectionOpen = this.onSelectionOpen.bind(this);
					this.onSelectionClose = this.onSelectionClose.bind(this);

					this.section.selection = _.find(children, function (child) {return child.hasAttribute('selection');});
					if (this.selection = this.section.selection !== undefined) {
						this.setupSelection();}


					this.section.search = _.find(children, function (child) {return child.hasAttribute('search');});
					if (this.search = this.section.search !== undefined) {
						this.setupSearch();}

					/*
     				if (this.flexible) {
     					this.fade = true;
     					this.extendContainer();
     					if (!this.overlap) {
     						this.extendToolbar();
     					}
     					this.watchScroll()
     				}*/}} }, { key: 'setupSelection', value: 




			function setupSelection() {var _this3 = this;
				this.section.selection.style.display = 'none';

				this.setAttribute('relative', '');
				this.section.selection.setAttribute('absolute-top', '');
				this.section.selection.style.display = 'none';
				this.selectionOpen = false;

				// the very first child (button) of he search section will be closing it
				var selectionCloseButton = this.section.selection.children[0];
				selectionCloseButton.addEventListener('click', function (e) {return _this3.emit('fx-toolbar-selection-close');});

				document.addEventListener('fx-toolbar-selection-open', this.onSelectionOpen);
				document.addEventListener('fx-toolbar-selection-close', this.onSelectionClose);
				this.unregister.push(
				function () {return document.removeEventListener('fx-toolbar-selection-open', _this3.onSelectionOpen);}, 
				function () {return document.removeEventListener('fx-toolbar-selection-close', _this3.onSelectionClose);});} }, { key: 'onSelectionOpen', value: 



			function onSelectionOpen(e) {
				console.log('fx-toolbar-selection-open', e);
				if (this.selectionOpen) {
					return;} else 
				{
					this.selectionOpen = true;}

				//this.section.selection.style.display = 'flex';
				//this.section.main.style.display = 'none';
				animation.fade.outAndKeepDisplayed(this.section.main);
				animation.slideIn.left(this.section.selection);
				//var animationName = this.section.selection.getAttribute('enter-animation') || 'fade';
				//if (animationName == 'fade') {
				//	animation.fade.in(this.section.selection);
				//	animation.rotateIcon.show(this.section.selection);
				//	animation.rotateIcon.hide(this.section.main);
				//}
			} }, { key: 'onSelectionClose', value: 
			function onSelectionClose(e) {
				if (this.selectionOpen) {
					this.selectionOpen = false;} else 
				{
					return;}

				console.log('fx-toolbar-selection-close', e);
				//this.section.selection.style.display = 'none';
				//this.section.main.style.display = 'flex';
				animation.fade.out(this.section.selection);
				animation.slideIn.right(this.section.main);
				//var animationName = this.section.selection.getAttribute('leave-animation') || 'fade';
				//if (animationName == 'fade') {
				//	animation.fade.out(this.section.selection);
				//	animation.rotateIcon.hide(this.section.selection);
				//	animation.rotateIcon.show(this.section.main);
				//}
			} }, { key: 'setupSearch', value: 

			function setupSearch() {var _this4 = this;
				// TODO - android only. winjs does not have cards and card search will be rendered as usual input
				// idea: - normal (invisible) search input remains invisible (in both android and winjs)
				//       - card search input will look as card in android, and as bordered input in winjs (like in many win10 apps there is visible textbox in the toolbar)
				if (platform.material) {
					if (this.section.search.hasAttribute('card')) {
						// card takes 64px height space (48 + margin) even on phone
						// and main section has to have the same height to prevent janky transition
						this.section.main.style.height = '64px';}}


				// search section has to overlay the main section to blend them in animation
				this.setAttribute('relative', '');
				this.section.search.setAttribute('absolute-top', '');
				// hide the section for now. only the main section is visible
				this.section.search.style.display = 'none';
				this.searchOpen = false;

				// get search icon to show the section
				var searchButton = this.searchButton = _.find(this.section.main.children, function (child) {return child.getAttribute('icon') == 'search';});
				// the very first child (button) of he search section will be closing it
				var searchCloseButton = this.section.search.children[0];

				// todo - memory leak
				searchButton.addEventListener('click', function (e) {return _this4.emit('fx-toolbar-search-open');});
				searchCloseButton.addEventListener('click', function (e) {return _this4.emit('fx-toolbar-search-close');});

				document.addEventListener('fx-toolbar-search-open', this.onSearchOpen);
				document.addEventListener('fx-toolbar-search-close', this.onSearchClose);
				this.unregister.push(
				function () {return document.removeEventListener('fx-toolbar-search-open', _this4.onSearchOpen);}, 
				function () {return document.removeEventListener('fx-toolbar-search-close', _this4.onSearchClose);});} }, { key: 'onSearchOpen', value: 



			function onSearchOpen(e) {var _this5 = this;
				console.log('fx-toolbar-search-open', e);
				if (this.searchOpen) {
					return;} else 
				{
					this.searchOpen = true;}


				var animationPromise;
				if (platform.material) {
					animationPromise = animation.circle.show(this.section.search, this.searchButton);} else 
				{
					animation.fade.outAndKeepDisplayed(this.section.main);
					animationPromise = animation.slideIn.left(this.section.search);
					//this.section.search.style.display = '';
					//this.section.main.style.display = 'none';
				}
				animationPromise.then(function () {
					console.log('now');
					// focus the search input
					_this5.section.search.querySelector('input').focus();});} }, { key: 'onSearchClose', value: 


			function onSearchClose(e) {
				console.log('fx-toolbar-search-close', e);
				if (this.searchOpen) {
					this.searchOpen = false;} else 
				{
					return;}

				if (platform.material) {
					var animationName = this.section.search.getAttribute('exit-animation') || 'circle';
					if (animationName == 'circle') {
						animation.circle.hide(this.section.search, this.searchButton);} else 
					if (animationName == 'fade') {
						animation.fade.out(this.section.search);}} else 

				{
					animation.fade.out(this.section.search);
					animation.slideIn.right(this.section.main);
					//animation.slideIn.right(this.section.main);
					//this.section.main.style.display = '';
					//this.section.search.style.display = 'none';
				}
				this.searchOpen = false;} }, { key: 'emit', value: 


			function emit(name) {
				var e = new Event(name);
				document.dispatchEvent(e);
				this.dispatchEvent(e);}

			/*
   
   		extendToolbar() {
   			this.setAttribute('absolute-top', '');
   		}
   
   		extendContainer() {
   			this.parentNode.setAttribute('relative', '');
   			//this.parentNode.setAttribute('scroll', '');
   			//this.watchScroll();
   		}
   
   		measureScrollHeight() {
   	
   			this.wholeHeight = this.offsetHeight;
   
   			var scrollable = Polymer.dom(this).querySelector('[scrollable]');
   			if (scrollable) {
   				this.imageHeight = scrollable.offsetHeight;
   			} else {
   				this.imageHeight = 0;
   			}
   
   			this.targetHeight = this.wholeHeight - this.imageHeight;
   			//this.targetHeight = 56;
   
   			//this.defaultHeight = 56;
   			// todo 56 / 64 media query watch
   		}
   
   		watchScroll() {
   			//var top = this.$.top;
   			var title = Polymer.dom(this).querySelector('[title]');
   			var sectionMain = Polymer.dom(this).querySelector('section[main]');
   			var scrollable = Polymer.dom(this).querySelector('[scrollable]');
   			var scrollcontent = this.nextElementSibling;
   
   			var parallax = this.parentNode.querySelector('[parallax]');
   			console.log(parallax)
   
   			var $overlappingClassList;
   			setTimeout(() => {
   				if (this.overlap) {
   					$overlappingClassList = Polymer.dom(this.root).querySelector('#overlapping').classList;
   				}
   			})
   
   			this.measureScrollHeight();
   			setTimeout(() => this.measureScrollHeight(), 0)
   			setTimeout(() => this.measureScrollHeight(), 1000)
   
   			sectionMain.style.transform = 'translate3d(0,0,0)';
   			if (scrollable) scrollable.style.transform = 'translate3d(0,0,0)';
   
   			throttle("scroll", "optimizedScroll", scrollcontent);
   			scrollcontent.addEventListener('optimizedScroll', () => {
   				var toBeScrolled = this.wholeHeight - this.targetHeight;
   				var scrolled = scrollcontent.scrollTop;
   				var percent = constrain(scrolled / toBeScrolled, 0, 1);
   				var opacity = 1 - percent;
   				console.log('toBeScrolled', toBeScrolled, 'scrolled', scrolled, 'percent', percent, 2 - percent);
   
   				if (toBeScrolled > scrolled) {
   					//sectionMain.style.transform = `translate3d(0, ${scrolled}px, 0)`;
   					this.style.transform = `translate3d(0, ${-scrolled}px, 0)`;
   					if (scrollable) scrollable.style.opacity = opacity;
   				} else {
   					//sectionMain.style.transform = `translate3d(0, ${toBeScrolled}px, 0)`;
   					this.style.transform = `translate3d(0, ${-toBeScrolled}px, 0)`;
   					if (scrollable) scrollable.style.opacity = 0;
   				}
   				if (parallax) parallax.style.transform = `translate3d(0, ${-scrolled/2}px, 0)`;
   
   				if (this.waterfall) {
   					//if (scrolled > 0) {
   					if (scrolled > toBeScrolled) {
   						this.elevation = 2;
   					} else {
   						this.elevation = 0;
   					}
   				}
   
   				if (this.overlap) {
   					if (scrolled > 0) {
   						$overlappingClassList.add('hide')
   					} else {
   						$overlappingClassList.remove('hide')
   					}
   				}
   			});
   		}
   */ }, { key: 'multisection', decorators: [reflect], initializer: function initializer() {return false;}, enumerable: true }, { key: 'flexible', decorators: [reflect], initializer: function initializer() {return false;}, //@reflect
			//overlap = Boolean;
			enumerable: true }, { key: 'waterfall', decorators: [reflect], initializer: function initializer() {return Boolean;}, enumerable: true }, { key: 'elevation', decorators: [reflect], initializer: function initializer() {return Number;}, //@reflect
			enumerable: true }], null, _instanceInitializers);var _Toolbar = Toolbar;Toolbar = fx.Element(Toolbar) || Toolbar;Toolbar = autobind(Toolbar) || Toolbar;return Toolbar;})();})(); //@notify
//@reflect