'use strict';var _createDecoratedClass = (function () {function defineProperties(target, descriptors, initializers) {for (var i = 0; i < descriptors.length; i++) {var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {for (var f = 0; f < decorators.length; f++) {var decorator = decorators[f];if (typeof decorator === 'function') {descriptor = decorator(target, key, descriptor) || descriptor;} else {throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);}}if (descriptor.initializer !== undefined) {initializers[key] = descriptor;continue;}}Object.defineProperty(target, key, descriptor);}}return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}function _defineDecoratedPropertyDescriptor(target, key, descriptors) {var _descriptor = descriptors[key];if (!_descriptor) return;var descriptor = {};for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;Object.defineProperty(target, key, descriptor);}(function () {

	// TODO: REQEST ANIMATION FRAME

	// import
	var _fx = fx;var platform = _fx.platform;var render = _fx.render;var constrain = _fx.constrain;var template = _fx.template;var reflect = _fx.reflect;var nonenumerable = _fx.nonenumerable;var autobind = _fx.autobind;var draggable = _fx.draggable;var traverse = _fx.traverse;var traverse = _fx.traverse;

	var maxOpacity = 0.6;
	var drawerWidth;
	function drawerWidthUpdate() {
		if (platform.material) {
			drawerWidth = window.innerWidth - 56;} else 
		{
			drawerWidth = 250; // todo solve material design (it's 100% - toolbar height in layout 0)
		}}

	drawerWidthUpdate();

	console.log('drawer.js');var 

































































	Drawer = (function () {var _instanceInitializers = {};function Drawer() {_classCallCheck(this, _Drawer);_defineDecoratedPropertyDescriptor(this, 'overlay', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'squeze', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'autoclose', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'autoExpandWhenWide', _instanceInitializers);_defineDecoratedPropertyDescriptor(this, 'dragging', _instanceInitializers);this.




















			_expanded = false;this.





























































			breakpoint1 = 500;this.
			breakpoint2 = 1024;_defineDecoratedPropertyDescriptor(this, 'hidden', _instanceInitializers);this.


























			_layout = 1;this.




































			_showToolbarNav = false;this.












			_canDrag = true;this.
















			expandedPreffered = true;}_createDecoratedClass(Drawer, [{ key: 'ready', value: function ready() {var _this = this;console.log('drawer ready');this._killbacks = []; //this.setAttribute('touch-action', 'none');
				this.setAttribute('touch-action', 'pan-y'); // by default the app might not want to expand drawer when wide
				// but user might want toggle it. therefore not to expand is just
				// initial prefference (by programmer) that user could override
				this.expandedPreffered = this.autoExpandWhenWide;if (platform.metro) {var menuButton = document.createElement('button');menuButton.setAttribute('icon', 'menu');this.insertBefore(menuButton, this.firstChild);} /*if (platform.material) {
                                                                                                                                                                                                                     	var userHeader = document.createElement('div');
                                                                                                                                                                                                                     	userHeader.style.backgroundColor = 'grey';
                                                                                                                                                                                                                     	userHeader.style.height = '180px';
                                                                                                                                                                                                                     	this.insertBefore(userHeader, this.firstChild);
                                                                                                                                                                                                                     }*/this.handle = this.shadowRoot.querySelector('#handle');this.shadow = this.shadowRoot.querySelector('#shadow');if (platform.metro) {this.shadow.style.display = 'none';}this.setupMediaQueries();this.setupDragging();this.setupClickawayClose();this.setupItemClose();document.addEventListener('drawer-toggle', function () {return _this.toggle();});document.addEventListener('drawer-open', function () {return _this.expanded = true;});document.addEventListener('drawer-close', function () {return _this.expanded = false;});} //_killbacks = []; // TODO
		}, { key: 'detached', value: function detached() {this._killbacks.forEach(function (fn) {return fn();});} }, { key: 'setupMediaQueries', value: function setupMediaQueries() {var _this2 = this;var handleQuery = function handleQuery(mql, i) {if (mql.matches) {//this.updateLayout(i);
						_this2.layout = i;}};['(max-width: ' + (this.breakpoint1 - 1) + 'px)', '(min-width: ' + this.breakpoint1 + 'px) and (max-width: ' + (this.breakpoint2 - 1) + 'px)', '(min-width: ' + this.breakpoint2 + 'px)'].map(function (query) {return window.matchMedia(query);}).forEach(function (mql, i) {handleQuery(mql, i);mql.addListener(function (mql) {return handleQuery(mql, i);});});} }, { key: 'toggle', value: function toggle() {console.log('toggle()', this.expanded);this.expanded = !this.expanded;if (this.layout == 2) {this.expandedPreffered = this.expanded;}} }, { key: 'setupItemClose', value: 
			function setupItemClose() {var _this3 = this;
				// automatically close on item click
				var callback = function callback(e) {
					// only close when expanded overlay
					if (!_this3.expanded || !_this3.overlay) return;
					var target = e.target;
					if (target.getAttribute('icon') != 'menu') {
						// temp: removed until Edge supports shadowDom to drop the fx-item need
						//var name = target.localName;
						//if (name == 'button' || name == 'a') {
						// target has to be [fx-item] (or child)
						if (traverse(target, function (node) {return node.hasAttribute('fx-item');})) {
							var close = target.hasAttribute('drawer-close');
							var noclose = target.hasAttribute('drawer-noclose');
							// close if autoclose is true and item doesn't have [drawer-noclose]
							// or if it has [drawer-close]
							if (_this3.autoclose && !noclose || close) {
								console.log('item closing');
								_this3.toggle();}}}};




				this.addEventListener('click', callback);
				this._killbacks.push(function () {
					_this3.removeEventListener('click', callback);});} }, { key: 'setupClickawayClose', value: 



			function setupClickawayClose() {var _this4 = this;
				// click is listened on document level and it interferes with draggable keyup/touchend
				// and needs to be ignored if caused during dragging
				this._ignoreClick = false;

				// automaticaly close when clicking away from drawer
				var callback = function callback(e) {
					console.log('click');
					if (_this4._ignoreClick) {
						console.log('setupClickawayClose _ignoreClick');
						_this4._ignoreClick = false;
						return false;}


					// just toggle if target is hamburger button
					if (e.target.getAttribute('icon') == 'menu') {
						_this4.toggle();
						// toggle the window and prevent further execution
						return;}


					// close drawer if clicked node is not a child of drawer
					if (_this4.expanded && (_this4.layout == 0 || _this4.overlay)) {
						if (traverse(e.target, function (node) {return node == _this4;}) == null) {
							_this4.expanded = false;}}};




				document.addEventListener('click', callback);
				this._killbacks.push(function () {
					document.removeEventListener('click', callback);});} }, { key: 'setupDragging', value: 



			function setupDragging() {var _this5 = this;
				this.onPointerDown = this.onPointerDown.bind(this);
				this.onPointerMove = this.onPointerMove.bind(this);
				this.onPointerUp = this.onPointerUp.bind(this);
				this.onPointerUp = this.onPointerUp.bind(this);
				this.rendermove = this.rendermove.bind(this);


				this. /*handle.*/addEventListener('pointerdown', this.onPointerDown);
				this._killbacks.push(function () {
					_this5. /*handle.*/removeEventListener('pointerdown', _this5.onPointerDown);});} }, { key: 'pointerdown', value: 



			function pointerdown(e) {
				drawerWidthUpdate();
				this.dragging = true;
				if (platform.material) {
					fx.overlay.setAttribute('noanimation', '');}


				this._movementHistory = [];
				this.initx = e.x + (this.expanded ? -drawerWidth : 0);
				this._lastx = e.x;} }, { key: 'pointermove', value: 

			function pointermove(e) {
				var movement = e.x - this._lastx;
				this._movementHistory.push(movement);
				if (this._movementHistory.length > 5) {
					// only keep 5 records max
					this._movementHistory.shift();}

				console.log('movement', movement);

				var dragX = e.x - this.initx;
				var value = constrain(dragX, 0, drawerWidth);
				this._transform = value - drawerWidth;
				this._opacity = fx.mapRange(value, 0, drawerWidth, 0, maxOpacity);
				//console.log(e.x - this.initx)
				render.once(this.rendermove);
				this._lastx = e.x;} }, { key: 'rendermove', value: 

			function rendermove() {
				//console.log('rendermove', this._transform, this._opacity)
				this.style.transform = 'translate3d(' + this._transform + 'px, 0, 0)';
				if (platform.material) {
					fx.overlay.style.opacity = this._opacity;}} }, { key: 'pointerup', value: 


			function pointerup(e) {
				this.dragging = false;
				// calculate speed of last few pointermoves to determine if it was fast enough
				// to conscider a flick to close/open
				var steps = this._movementHistory.reduce(function (prev, current) {return prev + current;}, 0);
				var averageStep = steps / this._movementHistory.length;
				if (averageStep > 9) {
					this.expanded = true;} else 
				if (averageStep < -9) {
					this.expanded = false;} else 
				{
					// last few moves were slow, close/open based on location
					var dragX = e.x - this.initx;
					this.expanded = dragX > drawerWidth / 2;}


				// make sure this transform reset gets called AFTER any other
				// potential pointermove rendering
				render.prevent(this.rendermove);
				this.style.transform = '';

				if (e.pointerType == 'mouse') {
					// ignore click (gets fired afterwards) when using mouse to drag expand drawer
					this._ignoreClick = true;}}


			/*pointermove(e) {
   	var dragX = e.x - this.initx;
   	var value = constrain(dragX, 0, drawerWidth);
   	//var compensation = this.expanded ? 0 : drawerWidth;
   	this.style.transform = `translate3d(${value - drawerWidth}px, 0, 0)`;
   	//this.shadow.style.opacity = fx.mapRange(value, 0, drawerWidth, 0, 1);
   	fx.overlay.style.opacity = fx.mapRange(value, 0, drawerWidth, 0, maxOpacity);
   	console.log(e.x - this.initx)
   }*/ }, { key: 'overlay', decorators: [reflect], initializer: function initializer() {return true;}, enumerable: true }, { key: 'squeze', decorators: [reflect], initializer: function initializer() {return false;}, // - item-autoclose only when overlayed
			//*@reflect*/ clickaway = true; // close overlayed drawer on click outside
			enumerable: true }, { key: 'autoclose', decorators: [reflect], initializer: function initializer() {return true;}, // close on item click
			enumerable: true }, { key: 'autoExpandWhenWide', decorators: [reflect], initializer: function initializer() {return true;}, // stops transition while dragging
			enumerable: true }, { key: 'dragging', decorators: [reflect], initializer: function initializer() {return false;}, //@reflect expanded = false;
			enumerable: true }, { key: 'expanded', decorators: [reflect], get: function get() {return this._expanded;}, set: function set(newval) {this._expanded = newval;fx.overlay.removeAttribute('noanimation'); // remove any inline dragging styles for css to handle transition
				this.style.transform = ''; // only material design has shadow under the drawer
				if (platform.material) {fx.overlay.style.opacity = newval ? maxOpacity : 0;}} }, { key: 'hidden', decorators: [reflect], initializer: function initializer() {return false;}, // layouts:
			//  0: max 499
			//  1: 500 - 1023
			//  2: min 1024
			enumerable: true }, { key: 'layout', get: function get() {return this._layout;}, set: function set(i) {this._layout = i;console.log('updateLayout', i);switch (i) {case 0:this.showToolbarNav = false;this.hidden = true;this.expanded = false;this.overlay = true;this.canDrag = true;break;case 1:this.showToolbarNav = true;this.hidden = false;this.expanded = false;this.overlay = true; //console.log('disabling')
						this.canDrag = false;break;case 2:this.showToolbarNav = true;this.hidden = false; //if (this.autoExpandWhenWide) {
						//if (this.squeze) {
						this.expanded = this.expandedPreffered; //}
						this.overlay = false;this.canDrag = false;break;}} }, { key: 'showToolbarNav', get: function get() {return this._showToolbarNav;}, set: function set(newval) {if (newval) {document.body.setAttribute('hide-explicit-nav', '');} else {document.body.removeAttribute('hide-explicit-nav');}this._showToolbarNav = newval;} }, { key: 'canDrag', decorators: [reflect], get: function get() {return this._canDrag;}, set: function set(newval) {console.log('set canDrag', newval);this._canDrag = newval;this.handle.style.display = newval ? 'block' : 'none';if (platform.material) {fx.overlay.style.display = newval ? 'block' : 'none';}} // store users preffered drawer state
			// usecase: if in wide layout (2) and minimizes toolbar to save space we want to keep
			// it that way even after resizing window (which would otherwise expand drawer by default)
		}], null, _instanceInitializers);var _Drawer = Drawer;Drawer = draggable(Drawer) || Drawer;Drawer = template('\n\t\t<style>\n\t\t:host {\n\t\t\ttransform: translate3d(0,0,0);\n\t\t}\n\n\t\t#handle,\n\t\t#shadow {\n\t\t\tposition: absolute;\n\t\t\tleft: 100%;\n\t\t\ttop: 0;\n\t\t\tbottom: 0;\n\t\t}\n\t\t#handle {\n\t\t\twidth: 16px;\n\t\t\tbackground-color: red;\n\t\t\topacity: 0;\n\t\t}\n\t\t#shadow {\n\t\t\twidth: 20px;\n\t\t\tbackground: linear-gradient(to right, rgba(0,0,0,0.17) 0%,rgba(0,0,0,0.09) 23%,rgba(0,0,0,0.06) 39%,rgba(0,0,0,0.04) 50%,rgba(0,0,0,0.02) 65%,rgba(0,0,0,0) 100%);\n\t\t}\n\n\t\t/*:host(:not([dragging])) #shadow {\n\t\t\ttransition: all 0.2s;\n\t\t}*/\n\t\t:host(:not([expanded]):not([dragging])) #shadow {\n\t\t\topacity: 0;\n\t\t\tpointer-events: none;\n\t\t}\n\n\n\t\t#section-main {\n\t\t\tflex: 1;\n\t\t\toverflow-y: auto;\n\t\t}\n\t\t#section-sticky {\n\t\t\t/* todo */\n\t\t\tborder-top: 1px solid rgba(127,127,127, 0.5);\n\t\t}\n\t\t#section-main {\n\t\t\t/* drawer itself cannot have overflow:hidden because of #handle and #bg */\n\t\t\toverflow-x: hidden;\n\t\t}\n\t\t#section-sticky {\n\t\t\toverflow: hidden;\n\t\t}\n\t\t</style>\n\t\t<div id="handle"></div>\n\t\t<div id="shadow"></div>\n\n\t\t<!--content></content-->\n\t\t\n\t\t<content select="button[icon=\'menu\']"></content>\n\t\t<div id="section-main">\n\t\t\t<content select=":not([sticky])"></content>\n\t\t</div>\n\t\t<div id="section-sticky">\n\t\t\t<content select="[sticky]"></content>\n\t\t</div>\n\t')(Drawer) || Drawer;Drawer = fx.Element(Drawer) || Drawer;Drawer = autobind(Drawer) || Drawer;return Drawer;})();})(); // TODO
// - squeze all the way - calendar
// - overlay all the way - weather
// - combined (overlay when 1, squeze when 2) - music
// - hidden all the way (important for android)
// - completely hidden unless clicked toolbar hamburger - onenote