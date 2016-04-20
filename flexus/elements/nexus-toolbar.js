'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {
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
		return Math.max(Math.min(number, max), min);}var 



	Toolbar = (function () {function Toolbar() {_classCallCheck(this, _Toolbar);}_createClass(Toolbar, [{ key: 'ready', value: 

			function ready() {var _this = this;
				/*
    			this.sections = false;
    			this.tabs = false;
    
    			this.search = false;
    			this.searchActive = false;
    			this.searchSection = false;
    
    			this.selection = false;
    			this.selectionActive = false;
    			this.selectionSection = false;
    
    			Polymer.dom(this).children.forEach(child => {
    				if (child.localName == 'section') {
    					this.sections = true;
    				}
    				if (child.localName == 'paper-tabs') {
    					this.tabs = true;
    					this.sections = true;
    				}
    				if (child.hasAttribute('selection')) {
    					this.selection = true;
    					this.selectionSection = child;
    					child.style.display = 'none'; // temp hide. todo: some classes and animations
    				}
    				if (child.hasAttribute('search')) {
    					this.search = true;
    					this.searchSection = child;
    					child.style.display = 'none'; // temp hide. todo: some classes and animations
    				}
    			}.bind(this))
    */
				var ratio = this.getAttribute('ratio');
				if (ratio) {
					this.scrollable = true;
					setTimeout(function () {
						_this.extendContainer();
						_this.extendToolbar();}, 
					0);} else 
				{
					this.scrollable = false;}} }, { key: 'extendToolbar', value: 




			function extendToolbar() {
				this.setAttribute('absolute-top', '');
				this.watchMediaQuery();} }, { key: 'watchMediaQuery', value: 


			function watchMediaQuery() {
				this.targetHeight = 64;
				// todo 56 / 64 media query watch
			} }, { key: 'extendContainer', value: 

			function extendContainer() {
				if (this.hasAttribute('ratio')) {
					this.parentNode.setAttribute('relative', '');
					this.parentNode.setAttribute('scroll', '');
					this.watchScroll();}} }, { key: 'measureScrollHeight', value: 



			function measureScrollHeight() {
				//this.toolbarHeight = this.filler.offsetHeight;
				this.toolbarHeight = this.offsetHeight;} }, { key: 'watchScroll', value: 


			function watchScroll() {var _this2 = this;
				//var top = this.$.top;
				var top = Polymer.dom(this.root).querySelector('#top');
				var bg = Polymer.dom(this.root).querySelector('#bg');
				var title = Polymer.dom(this).querySelector('[title]');
				var parent = this.parentNode;

				var lastVal = 0;

				this.measureScrollHeight();
				setTimeout(function () {return _this2.measureScrollHeight();}, 0);
				setTimeout(function () {return _this2.measureScrollHeight();}, 1000);

				throttle("scroll", "optimizedScroll", parent);
				parent.addEventListener('optimizedScroll', function () {
					var sweetspot = _this2.toolbarHeight - _this2.targetHeight;
					var val = parent.scrollTop;
					var percent = constrain(val / sweetspot, 0, 1);
					var opacity = 1 - percent;
					var diff = _this2.toolbarHeight - val;
					//console.log(val, sweetspot, percent, val.map(0,1,2,1))
					if (diff > _this2.targetHeight) {
						//title.style.transform = `scale(${percent.map(0,1,2,1)})`;
						//title.style.fontSize = `${percent.map(0,1,40,20)}px`;
						bg.style.opacity = opacity;
						bg.style.transform = 'translateY(' + val / 2 + 'px)';
						top.style.transform = 'translateY(' + val + 'px)';
						_this2.style.transform = 'translateY(0px)';} else 
					{
						bg.style.opacity = 0;
						bg.style.transform = 'translateY(' + sweetspot / 2 + 'px)';
						top.style.transform = 'translateY(' + sweetspot + 'px)';
						_this2.style.transform = 'translateY(' + (_this2.targetHeight - diff) + 'px)';}});} }]);var _Toolbar = Toolbar;Toolbar = PolymerElement('nexus-toolbar')(Toolbar) || Toolbar;return Toolbar;})();})();