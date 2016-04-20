'use strict';var _createDecoratedClass = (function () {function defineProperties(target, descriptors, initializers) {for (var i = 0; i < descriptors.length; i++) {var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {for (var f = 0; f < decorators.length; f++) {var decorator = decorators[f];if (typeof decorator === 'function') {descriptor = decorator(target, key, descriptor) || descriptor;} else {throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);}}if (descriptor.initializer !== undefined) {initializers[key] = descriptor;continue;}}Object.defineProperty(target, key, descriptor);}}return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}function _defineDecoratedPropertyDescriptor(target, key, descriptors) {var _descriptor = descriptors[key];if (!_descriptor) return;var descriptor = {};for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;Object.defineProperty(target, key, descriptor);}(function () {
	var throttle = function throttle(type, name, obj) {
		var obj = obj || window;
		var running = false;
		var func = function func() {
			if (running) {return;}
			running = true;
			requestAnimationFrame(function () {
				obj.dispatchEvent(new CustomEvent(name));
				running = false;});};


		obj.addEventListener(type, func);};


	/* init - you can init any event */
	//throttle("resize", "optimizedResize");

	Number.prototype.map = function (in_min, in_max, out_min, out_max) {
		return (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;};

	Number.prototype.constrain = function (min, max) {
		return Math.max(Math.min(this, max), min);};

	function constrain(number, min, max) {
		return Math.max(Math.min(number, max), min);}


	function fireEvent(name) {
		var e = new Event(name);
		document.dispatchEvent(e);}



	if (typeof _ === 'undefined') {
		var _ = { 
			forEach: function forEach(array, callback) {
				for (var i = 0; i < array.length; i++) {
					callback(array[i]);}} };}






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


			show: function show(element, from) {var _calculate2 = 
				this._calculate(element, from);var x = _calculate2.x;var y = _calculate2.y;var distance = _calculate2.distance;
				// reset display from hidden to previous.
				// empty string gets default css value (could be flex) rather than block
				element.style.display = '';
				element.animate([
				{ clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }, 
				{ clipPath: 'circle(' + distance + 'px at ' + x + 'px ' + y + 'px)' }], 
				{ 
					duration: 400, 
					easing: 'ease-in-out' });}, 



			hide: function hide(element, from) {var _calculate3 = 
				this._calculate(element, from);var x = _calculate3.x;var y = _calculate3.y;var distance = _calculate3.distance;
				//element.style.display = '';
				element.animate([
				{ clipPath: 'circle(' + distance + 'px at ' + x + 'px ' + y + 'px)' }, 
				{ clipPath: 'circle(0px at ' + x + 'px ' + y + 'px)' }], 
				{ 
					duration: 400, 
					easing: 'ease-in-out' }).
				onfinish = function () {
					element.style.display = 'none';};} }, 





		fade: { 

			show: function show(element) {
				// reset display from hidden to previous.
				// empty string gets default css value (could be flex) rather than block
				element.style.display = '';
				element.animate([
				{ opacity: 0 }, 
				{ opacity: 1 }], 
				100);}, 


			hide: function hide(element) {
				element.animate([
				{ opacity: 1 }, 
				{ opacity: 0 }], 
				100).onfinish = function () {
					element.style.opacity = 1; // to be removed when animate-polyfill fixed TODO
					element.style.display = 'none';};} }, 





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
						easing: 'ease-in-out' });}} } };var 










	Toolbar = (function () {var _instanceInitializers = {};function Toolbar() {_classCallCheck(this, _Toolbar);_defineDecoratedPropertyDescriptor(this, 'multisection', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'flexible', _instanceInitializers);this.










			overlap = 0;_defineDecoratedPropertyDescriptor(this, 'waterfall', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'elevation', _instanceInitializers);this.








			selection = false;this.


			search = false;}_createDecoratedClass(Toolbar, [{ key: 'ready', value: 

			function ready() {

				var children = Polymer.dom(this).children;

				if (!this.multisection) {
					this.multisection = children.some(function (child) {return child.localName == 'section';});}


				if (this.multisection) {
					this.mainSection = children.find(function (child) {return child.hasAttribute('main');}) || children[0];

					this.selectionSection = children.find(function (child) {return child.hasAttribute('selection');});
					this.selection = this.selectionSection !== undefined;
					if (this.selection) {
						this.setupSelection();}


					this.searchSection = children.find(function (child) {return child.hasAttribute('search');});
					this.search = this.searchSection !== undefined;
					if (this.search) {
						this.setupSearch();}


					if (this.flexible) {
						this.fade = true;
						this.extendContainer();
						if (!this.overlap) {
							this.extendToolbar();}

						this.watchScroll();}}} }, { key: 'setupSelection', value: 





			function setupSelection() {
				var mainSection = this.mainSection;
				var selectionSection = this.selectionSection;

				this.setAttribute('relative', '');
				selectionSection.setAttribute('absolute-top', '');

				selectionSection.style.display = 'none';
				// if section has no background (it actually has transparent black background)
				// it has to inherit parents background color to be able to animate overlay over main section
				//var computedStyle = window.getComputedStyle(selectionSection, null);
				//if (computedStyle.backgroundColor == 'rgba(0, 0, 0, 0)') {
				//	selectionSection.style.backgroundColor = 'inherit';
				//}

				document.addEventListener('fx-selection', function (e) {
					console.log('fx-selection', e);
					//selectionSection.style.display = 'flex';
					//mainSection.style.display = 'none';
					//var animationName = selectionSection.getAttribute('entry-animation') || 'fade';
					var animationName = selectionSection.getAttribute('enter-animation') || 'fade';
					if (animationName == 'fade') {
						animation.fade.show(selectionSection);
						animation.rotateIcon.show(selectionSection);
						animation.rotateIcon.hide(mainSection);}});


				document.addEventListener('fx-selection-clear', function (e) {
					console.log('fx-selection-clear', e);
					//selectionSection.style.display = 'none';
					//mainSection.style.display = 'flex';
					//var animationName = selectionSection.getAttribute('exit-animation') || 'fade';
					var animationName = selectionSection.getAttribute('leave-animation') || 'fade';
					if (animationName == 'fade') {
						animation.fade.hide(selectionSection);
						animation.rotateIcon.hide(selectionSection);
						animation.rotateIcon.show(mainSection);}});} }, { key: 'setupSearch', value: 




			function setupSearch() {var _this = this;
				var mainSection = this.mainSection;
				var searchSection = this.searchSection;
				if (searchSection.hasAttribute('card')) {
					// card takes 64px height space (48 + margin) even on phone
					// and main section has to have the same height to prevent janky transition
					mainSection.style.height = '64px';}


				this.setAttribute('relative', '');
				searchSection.setAttribute('absolute-top', '');

				var searchButton = Polymer.dom(mainSection).children.find(function (child) {return child.getAttribute('icon') == 'search';});
				this.searchButton = searchButton;
				searchButton.addEventListener('click', function (e) {return fireEvent('fx-search');});
				var searchCloseButton = Polymer.dom(searchSection).children[0];
				console.log(searchCloseButton);
				searchCloseButton.addEventListener('click', function (e) {return fireEvent('fx-search-close');});

				searchSection.style.display = 'none';
				// if section has no background (it actually has transparent black background)
				// it has to inherit parents background color to be able to animate overlay over main section
				//var computedStyle = window.getComputedStyle(searchSection, null);
				//if (computedStyle.backgroundColor == 'rgba(0, 0, 0, 0)') {
				//	searchSection.style.backgroundColor = 'inherit';
				//}

				var searchOpen = false;

				document.addEventListener('fx-search', function (e) {
					console.log('fx-search', e);
					if (searchOpen) return;
					animation.circle.show(searchSection, _this.searchButton);
					searchOpen = true;
					//searchSection.style.display = 'flex';
					//mainSection.style.display = 'none';
				});
				document.addEventListener('fx-search-close', function (e) {
					console.log('fx-search-close', e);
					if (!searchOpen) return;
					var animationName = searchSection.getAttribute('exit-animation') || 'circle';
					if (animationName == 'circle') {
						animation.circle.hide(searchSection, _this.searchButton);} else 
					if (animationName == 'fade') {
						animation.fade.hide(searchSection);}

					searchOpen = false;
					//searchSection.style.display = 'none';
					//mainSection.style.display = 'flex';
				});} }, { key: 'extendToolbar', value: 



			function extendToolbar() {
				this.setAttribute('absolute-top', '');} }, { key: 'extendContainer', value: 


			function extendContainer() {
				this.parentNode.setAttribute('relative', '');
				//this.parentNode.setAttribute('scroll', '');
				//this.watchScroll();
			} }, { key: 'measureScrollHeight', value: 

			function measureScrollHeight() {

				this.wholeHeight = this.offsetHeight;

				var scrollable = Polymer.dom(this).querySelector('[scrollable]');
				if (scrollable) {
					this.imageHeight = scrollable.offsetHeight;} else 
				{
					this.imageHeight = 0;}


				this.targetHeight = this.wholeHeight - this.imageHeight;
				//this.targetHeight = 56;

				//this.defaultHeight = 56;
				// todo 56 / 64 media query watch
			} }, { key: 'watchScroll', value: 

			function watchScroll() {var _this2 = this;
				//var top = this.$.top;
				var title = Polymer.dom(this).querySelector('[title]');
				var sectionMain = Polymer.dom(this).querySelector('section[main]');
				var scrollable = Polymer.dom(this).querySelector('[scrollable]');
				var scrollcontent = this.nextElementSibling;

				var parallax = this.parentNode.querySelector('[parallax]');
				console.log(parallax);

				var $overlappingClassList;
				setTimeout(function () {
					if (_this2.overlap) {
						$overlappingClassList = Polymer.dom(_this2.root).querySelector('#overlapping').classList;}});



				this.measureScrollHeight();
				setTimeout(function () {return _this2.measureScrollHeight();}, 0);
				setTimeout(function () {return _this2.measureScrollHeight();}, 1000);

				sectionMain.style.transform = 'translate3d(0,0,0)';
				if (scrollable) scrollable.style.transform = 'translate3d(0,0,0)';

				throttle("scroll", "optimizedScroll", scrollcontent);
				scrollcontent.addEventListener('optimizedScroll', function () {
					var toBeScrolled = _this2.wholeHeight - _this2.targetHeight;
					var scrolled = scrollcontent.scrollTop;
					var percent = constrain(scrolled / toBeScrolled, 0, 1);
					var opacity = 1 - percent;
					console.log('toBeScrolled', toBeScrolled, 'scrolled', scrolled, 'percent', percent, 2 - percent);

					if (toBeScrolled > scrolled) {
						//sectionMain.style.transform = `translate3d(0, ${scrolled}px, 0)`;
						_this2.style.transform = 'translate3d(0, ' + -scrolled + 'px, 0)';
						if (scrollable) scrollable.style.opacity = opacity;} else 
					{
						//sectionMain.style.transform = `translate3d(0, ${toBeScrolled}px, 0)`;
						_this2.style.transform = 'translate3d(0, ' + -toBeScrolled + 'px, 0)';
						if (scrollable) scrollable.style.opacity = 0;}

					if (parallax) parallax.style.transform = 'translate3d(0, ' + -scrolled / 2 + 'px, 0)';

					if (_this2.waterfall) {
						//if (scrolled > 0) {
						if (scrolled > toBeScrolled) {
							_this2.elevation = 2;} else 
						{
							_this2.elevation = 0;}}



					if (_this2.overlap) {
						if (scrolled > 0) {
							$overlappingClassList.add('hide');} else 
						{
							$overlappingClassList.remove('hide');}}});} }, { key: 'multisection', decorators: [reflect], initializer: function initializer() {return false;}, enumerable: true }, { key: 'flexible', decorators: [reflect], initializer: function initializer() {return false;}, //@reflect
			//overlap = Boolean;
			enumerable: true }, { key: 'waterfall', decorators: [reflect], initializer: function initializer() {return Boolean;}, enumerable: true }, { key: 'elevation', decorators: [reflect], initializer: function initializer() {return Number;}, //@reflect
			enumerable: true }], null, _instanceInitializers);var _Toolbar = Toolbar;Toolbar = PolymerElement('flexus-toolbar')(Toolbar) || Toolbar;return Toolbar;})();})(); //@notify
//@reflect