'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {

	var $ = document.querySelector.bind(document);

	// polyfills
	if (!Array.prototype.includes) {
		Array.prototype.includes = function (searchElement) {
			'use strict';
			var O = Object(this);
			var len = parseInt(O.length) || 0;
			if (len === 0) {
				return false;}

			var n = parseInt(arguments[1]) || 0;
			var k;
			if (n >= 0) {
				k = n;} else 
			{
				k = len + n;
				if (k < 0) {k = 0;}}

			var currentElement;
			while (k < len) {
				currentElement = O[k];
				if (searchElement === currentElement || 
				searchElement !== searchElement && currentElement !== currentElement) {
					return true;}

				k++;}

			return false;};}


	if (!String.prototype.includes) {
		String.prototype.includes = function () {
			'use strict';
			return String.prototype.indexOf.apply(this, arguments) !== -1;};}


	if (!String.prototype.endsWith) {
		String.prototype.endsWith = function (searchString, position) {
			var subjectString = this.toString();
			if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
				position = subjectString.length;}

			position -= searchString.length;
			var lastIndex = subjectString.indexOf(searchString, position);
			return lastIndex !== -1 && lastIndex === position;};}


	if (!String.prototype.startsWith) {
		String.prototype.startsWith = function (searchString, position) {
			position = position || 0;
			return this.indexOf(searchString, position) === position;};}



	// lodash shim
	if (typeof _ == 'undefined') {
		var _ = { 
			chain: function chain() {
				// todo
			}, 
			forEach: function forEach(array, callback) {
				for (var i = 0; i < array.length; i++) {
					callback(array[i]);}}, 


			find: function find(collection, arg2, arg3) {
				if (typeof arg2 == 'function') {
					// arg2 is callback
					for (var i = 0; i < collection.length; i++) {
						if (arg2(collection[i])) return collection[i];}} else 

				if (arguments.length == 3) {
					// arg2 is key, arg3 is value
					for (var i = 0; i < collection.length; i++) {
						if (collection[i][arg2] == arg3) return collection[i];}} else 

				{
					// only arg2 is key. arg3 is undefined. this only looks for presence of key in object of collection
				}}, 

			some: function some(collection, arg2, arg3) {
				if (typeof arg2 == 'function') {
					// arg2 is callback
					for (var i = 0; i < collection.length; i++) {
						if (arg2(collection[i])) return true;}} else 

				if (arguments.length == 3) {
					// arg2 is key, arg3 is value
					for (var i = 0; i < collection.length; i++) {
						if (collection[i][arg2] == arg3) return true;}} else 

				{
					// only arg2 is key. arg3 is undefined. this only looks for presence of key in object of collection
				}
				return false;}, 

			map: function map(arr, cmp) {return arr.map(cmp);}, 
			filter: function filter(arr, cmp) {return arr.filter(cmp);}, 
			xor: function xor(arr1, arr2) {
				return arr1.filter(function (i) {return arr2.indexOf(i) < 0;});} };}




	function removeFromArray(array, item) {
		var i = array.indexOf(item);
		if (i != -1) {
			array.splice(i, 1);}}



	function autobind() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
		if (args.length === 1) {
			return autobindClass.apply(undefined, args);} else 
		{
			return autobindMethod.apply(undefined, args);}}



	function autobindClass(target) {
		var proto = target.prototype;
		var keys = Object.getOwnPropertyNames(proto);
		keys.forEach(function (key) {
			if (key.startsWith('on') && /^[A-Z]/.test(key[2])) {
				var descriptor = Object.getOwnPropertyDescriptor(proto, key);
				Object.defineProperty(proto, key, autobindMethod(target, key, descriptor));}});}




	function autobindMethod(target, key, descriptor) {
		var fn = descriptor.value;

		if (typeof fn !== 'function') {
			throw new Error('@autobind decorator can only be applied to methods not: ' + typeof fn);}


		// return descriptor with temporary getter (gets replaced when first used)
		return { 
			configurable: true, 
			get: function get() {
				var boundFn = fn.bind(this);
				// replace this getter by function bound to this instance
				Object.defineProperty(this, key, { 
					value: boundFn, 
					configurable: true, 
					writable: true });

				return boundFn;} };}






	/*function draggable(target) {
 	target.prototype.onMousedown2 = function(e) {
 		e.preventDefault();
 		console.log('onMousedown2', this)
 		document.addEventListener('mousemove', this.onMousemove2);
 		document.addEventListener('mouseup', this.onMouseup2);
 		this.mousedown(e);
 	}
 	target.prototype.onMousemove2 = function(e) {
 		e.preventDefault();
 		this.mousemove(e);
 	}
 	target.prototype.onMouseup2 = function(e) {
 		e.preventDefault();
 		document.removeEventListener('mousemove', this.onMousemove2);
 		document.removeEventListener('mouseup', this.onMouseup2);
 		this.mouseup(e);
 	}
 }*/
	function draggable(target) {
		target.prototype.onPointerDown = function (e) {
			if (e.pointerType == 'mouse') {
				e.preventDefault();}

			document.addEventListener('pointermove', this.onPointerMove);
			document.addEventListener('pointerup', this.onPointerUp);
			document.addEventListener('pointercancel', this.onPointerUp);
			this.pointerdown(e);};

		target.prototype.onPointerMove = function (e) {
			//e.preventDefault();
			this.pointermove(e);};

		target.prototype.onPointerUp = function (e) {
			//e.preventDefault();
			document.removeEventListener('pointermove', this.onPointerMove);
			document.removeEventListener('pointerup', this.onPointerUp);
			document.removeEventListener('pointercancel', this.onPointerUp);
			this.pointerup(e);};}



	/*
 	class RenderManager {
 
 		temporary = [];
 		running = [];
 
 		requests = new Map;
 		rafid = 0;
 
 		register(name, renderer) {
 			this.requests.set(name, renderer);
 		}
 
 		start(name) {
 			console.log('start', name);
 			var renderer = this.requests.get(name);
 			var rendererIndex = this.running.indexOf(renderer);
 			// add request to the list of running requests and start animation frame
 			if (rendererIndex == -1) {
 				this.running.push(renderer);
 				if (!RAF.rafid) {
 					RAF.frame();
 				}
 			}
 		}
 
 		stop(name) {
 			console.log('stop', name);
 			// remove request from list of running requests
 			var renderer = this.requests.get(name);
 			var rendererIndex = this.running.indexOf(renderer);
 			if (rendererIndex != -1) {
 				this.running.splice(rendererIndex, 1);
 			}
 			// if no other requests, stop
 			if (this.running.length == 0 && this.rafid) {
 				this.cancel();
 			}
 		}
 
 		once(fn) {
 			this.temporary.push(fn);
 		}
 
 		cancel() {
 			window.cancelAnimationFrame(this.rafid);
 			this.rafid = 0;
 		}
 
 		frame() {
 			// render all one-off functions
 			if (this.temporary.length) {
 				while (this.temporary.length) {
 					this.temporary.shift()();
 				}
 			}
 			if (this.running.length) {
 				// if theres something to render, render it
 				for (var i = 0; i < this.running.length; i++) {
 					this.running[i]();
 				}
 				// request another frame
 				this.rafid = window.requestAnimationFrame(this.frame);
 			}
 		}
 
 	}
 */var 

	RenderManager = (function () {_createClass(RenderManager, [{ key: 'running', get: 







			function get() {
				return this.rafid != 0;} }]);


		function RenderManager() {_classCallCheck(this, RenderManager);this.temporary = [];this.looping = [];this.requests = new Map();this.rafid = 0;
			this.frame = this.frame.bind(this);}


		// register repeated resusable renderer with a name and use it to start/stop
		_createClass(RenderManager, [{ key: 'register', value: function register(name, renderer) {
				this.requests.set(name, renderer);} }, { key: 'start', value: 

			function start(name) {
				console.log('start', name);
				var renderer = this.requests.get(name);
				var rendererIndex = this.looping.indexOf(renderer);
				// add request to the list of looping requests and start animation frame
				if (rendererIndex == -1) {
					this.looping.push(renderer);
					if (!this.rafid) {
						this.frame();}}} }, { key: 'stop', value: 



			function stop(name) {
				console.log('stop', name);
				// remove request from list of looping requests
				var renderer = this.requests.get(name);
				var rendererIndex = this.looping.indexOf(renderer);
				if (rendererIndex != -1) {
					this.looping.splice(rendererIndex, 1);}

				// if no other requests, stop
				if (this.looping.length == 0 && this.rafid) {
					this.cancel();}} }, { key: 'once', value: 



			function once(fn) {
				//console.log('once !includes', !this.temporary.includes(fn), this.temporary)
				if (!this.temporary.includes(fn)) {
					this.temporary.push(fn);
					if (!this.running) {
						this.request();}}


				//this.start();
			} }, { key: 'prevent', value: 
			function prevent(fn) {
				if (this.temporary.includes(fn)) {
					removeFromArray(this.temporary, fn);}} }, { key: 'request', value: 



			function request() {
				this.rafid = requestAnimationFrame(this.frame);} }, { key: 'cancel', value: 


			function cancel() {
				cancelAnimationFrame(this.rafid);
				this.rafid = 0;} }, { key: 'frame', value: 


			function frame() {
				//console.log('frame this.looping', this.looping)
				if (this.looping.length) {
					// request another frame
					this.request();} else 
				{
					this.rafid = 0;}

				if (this.looping.length) {
					//this.rafid = requestAnimationFrame(this.frame);
					// if theres something to render, render it
					for (var i = 0; i < this.looping.length; i++) {
						console.log(this.looping[i]);
						this.looping[i]();}}


				// render all one-off functions
				if (this.temporary.length) {
					while (this.temporary.length) {
						this.temporary.shift()();}}} }]);return RenderManager;})();









	var metro = _.some(document.styleSheets, function (sheet) {return sheet.href != null && sheet.href.includes('metro');});
	var platform = { 
		metro: metro, 
		material: !metro };



	var overlay = document.createElement('div');
	overlay.id = 'fx-overlay';
	document.body.insertBefore(overlay, document.body.childNodes[0]);


	// export

	window.fx = { 

		platform: platform, 

		overlay: overlay, 

		render: new RenderManager(), 

		fire: function fire(name, data) {var target = arguments.length <= 2 || arguments[2] === undefined ? document : arguments[2];
			var e = new Event(name, data);
			target.dispatchEvent(e);}, 


		// decorators

		autobind: autobind, 

		draggable: draggable, 

		nonenumerable: function nonenumerable(target, name, descriptor) {
			descriptor.enumerable = false;
			return descriptor;}, 



		// helper functions

		// traverse node's parents until condition is met
		traverse: function traverse(node, condition) {
			while (node != null) {
				if (condition(node)) {
					break;}

				node = node.parentElement;}

			return node;}, 


		runAll: function runAll(array) {
			for (var i = 0; i < array.length; i++) {
				array[i]();}}, 



		constrain: function constrain(num, min, max) {
			return num < min ? min : num > max ? max : num;}, 


		mapRange: function mapRange(num, in_min, in_max, out_min, out_max) {
			return (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;}, 



		// lodash shim
		_: _ };})();


















// TODO: detect CPU, RAM and GPU and estimate how much material effects can the device handle
// to ensure best and jank free experience
//var cpuCores = navigator.hardwareConcurrency;


/*
function delegate(callback) {
	document.addEventListener('click', e => {
		var el = e.target;
		while (el) {
			//console.log(el, el.localName);
			var name = el.localName;
			if (name == null) break;
			if (name == 'button') break;
			if (name == 'input') break;
			if (name == 'textarea') break;
			if (callback(el)) break;
			el = el.parentNode;
		}
	})
}

delegate(elm => {
	if (elm.getAttribute('expandable') != null) {
		//console.log('done', elm, elm.hasAttribute('expanded'));
		if (elm.hasAttribute('expanded')) {
			elm.removeAttribute('expanded');
			//var section = elm.querySelector('[expand]');
			//collapse(section);
		} else {
			// if there is another already expanded item within parent elemnt collapse it
			var otherExpanded = elm.parentNode.querySelector('[expanded]');
			if (otherExpanded) {
				otherExpanded.removeAttribute('expanded');
			}
			elm.setAttribute('expanded', '');
			//var section = elm.querySelector('[expand]');
			//expand(section);
		}
		return true;
	} else {
		return false;
	}
});

function expand(elm) {
	elm.animate([
		{minHeight: 'initial', height: '0px'},
		{minHeight: 'initial', height: `${elm.offsetHeight}px`}
	], 150)
	//elm.style.overflow = 'hidden';
	//elm.animate([
	//	{minHeight: '0px', height: `${elm.offsetHeight}px`},
	//	{minHeight: `${elm.offsetHeight}px`, height: `${elm.offsetHeight}px`}
	//], 150)
}
function collapse(elm) {
	elm.animate([
		{minHeight: 'initial', height: `${elm.offsetHeight}px`},
		{minHeight: 'initial', height: '0px'}
	], 150)
}









var forEach = Array.prototype.forEach;



function materialEnhancements() {

	var observer = new MutationObserver(mutationCallback);
	function mutationCallback(mutations) {
		//console.log('mutations', mutations);
		mutations.forEach(mutation => {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var node = mutation.addedNodes[i];
				//console.log('added', node)
				//if (node.localName == 'button') {
				//	addRipple(node);
				//}
			}
		})
	}
	observer.observe(document.body, {childList: true});

	//document.addEventListener('DOMContentLoaded', function() {
	setTimeout(() => {
		//var buttons = document.querySelectorAll('nexus-item, [nx-item], nexus-toolbar button');
		var buttons = document.querySelectorAll('[ink]');
		console.log('adding ripple to', buttons)
		//forEach.call(buttons, addRipple);
	}, 2000)
	//});

	function addRipple(toElement) {
		// todo? create custom ripple
		var ripple = document.createElement('paper-ripple');
		toElement.appendChild(ripple);
	}

}

//materialEnhancements();
*/