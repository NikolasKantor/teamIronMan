'use strict';var _createDecoratedClass = (function () {function defineProperties(target, descriptors, initializers) {for (var i = 0; i < descriptors.length; i++) {var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {for (var f = 0; f < decorators.length; f++) {var decorator = decorators[f];if (typeof decorator === 'function') {descriptor = decorator(target, key, descriptor) || descriptor;} else {throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);}}if (descriptor.initializer !== undefined) {initializers[key] = descriptor;continue;}}Object.defineProperty(target, key, descriptor);}}return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) {if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers);if (staticProps) defineProperties(Constructor, staticProps, staticInitializers);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}function _defineDecoratedPropertyDescriptor(target, key, descriptors) {var _descriptor = descriptors[key];if (!_descriptor) return;var descriptor = {};for (var _key in _descriptor) descriptor[_key] = _descriptor[_key];descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined;Object.defineProperty(target, key, descriptor);}(function () {

	// TODO
	//   - camelCase property to kebab-case attribute translation
	//   - polymer like this.$.* ids

	// lodash shim
	var _ = _ || fx._;
	var nonenumerable = fx.nonenumerable;

	//var metasymbol = Symbol('metadata');
	var symbol = { 
		meta: Symbol(), 
		reflectedAttrs: Symbol(), 
		value: Symbol(), 
		template: Symbol() };


	function fxElement(arg) {
		var name;
		var Class;
		if (typeof arg == 'function') {
			// @fxElement used without name argument
			name = arg.name.toLowerCase();
			Class = arg;var _prepareAndSharedCode = 
			prepareAndSharedCode(Class);var proto = _prepareAndSharedCode.proto;var metadata = _prepareAndSharedCode.metadata;var instance = _prepareAndSharedCode.instance;
			customAttribute(Class, 'fx-' + name, instance, proto, metadata);
			var elementConstructor = customElement(Class, 'flexus-' + name, instance, proto, metadata);
			return elementConstructor;} else 
		return function (Class) {
			// @fxElement('element-name')
			name = arg;var _prepareAndSharedCode2 = 
			prepareAndSharedCode(Class);var proto = _prepareAndSharedCode2.proto;var metadata = _prepareAndSharedCode2.metadata;var instance = _prepareAndSharedCode2.instance;
			// TODO: this is just temp solution and works only with simlpe selectors
			// either plain element or plain [attribute]
			// WARNING: this will probably break when using complicated selectors like elm[attr]
			if (name.includes('[')) {
				name = name.substring(1, name.length - 1); // rychly fix protoze se mi s tim uz v 1 rano nechce srat
				/*return*/customAttribute(Class, name, instance, proto, metadata);} else 
			{
				/*return*/customElement(Class, name, instance, proto, metadata);}};}





	var customAttributes = [];
	function customAttribute(Class, name, instance, proto, metadata) {
		//console.log('creating custom attribute:', name)
		customAttributes.push(name);
		var existingElements = document.querySelectorAll('[' + name + ']');

		// TODO: this is the first pass (and works if script is at the end of body)
		// add also callback for domready and then do 2nd pass 
		_.forEach(existingElements, function (element) {return extendAttribute.call(element, Class, instance, proto, metadata);});
		// todo elements observer
	}


	var customElements = [];
	function customElement(Class, name, instance, proto, metadata) {
		//console.log('creating custom element:', name)
		customElements.push(name);

		var elementProto = Object.create(HTMLElement.prototype);

		assignProtypalThings.call(elementProto, Class, instance, proto, metadata);

		elementProto.createdCallback = function () {
			assignInstanceThings.call(this, Class, instance, proto, metadata);
			!!this.created && this.created();};


		elementProto.attachedCallback = function () {
			!!this.attached && this.attached();
			!!this.ready && this.ready();};


		elementProto.detachedCallback = function () {
			!!this.detached && this.detached();};


		//proto.createdCallback = function() {//console.log('createdCallback')};
		//proto.attachedCallback = function() {//console.log('attachedCallback')};
		//proto.detachedCallback = function() {//console.log('detachedCallback')};
		//proto.attributeChangedCallback = function(keyName, oldValue, newValue) {//console.log('attributeChangedCallback', keyName, oldValue, newValue)};

		var ElementConstructor = document.registerElement(name, { 
			prototype: elementProto });

		return ElementConstructor;}


	function extendAttribute(Class, instance, proto, metadata) {
		assignProtypalThings.call(this, Class, instance, proto, metadata);
		assignInstanceThings.call(this, Class, instance, proto, metadata);

		var observer = observeAttributeMutations(this, metadata);

		!!this.created && this.created();
		!!this.attached && this.attached();
		!!this.ready && this.ready();

		// todo removal discovery
		/*function onremove() {
  	!!this.detached && this.detached();
  	// todo disconnect on removal
  	observer.disconnect();
  }*/}



	function prepareAndSharedCode(Class) {
		var proto = Class.prototype;
		var metadata = getMetadata(proto);
		//var metadata = proto.constructor[symbol.meta];
		var instance = new Class();
		assignMethodsMetadata(proto, metadata);
		assignPropertiesMetadata(instance, metadata);
		return { proto: proto, metadata: metadata, instance: instance };}


	function assignProtypalThings(Class, instance, proto, metadata) {
		assignMethods(proto, this, metadata);

		this.attributeChangedCallback = function (keyName, oldValue, newValue) {
			//console.log('attributeChangedCallback', 'keyName', keyName, 'oldValue', oldValue, 'newValue', newValue);
			!!this.attributeChanged && this.attributeChanged(keyName, oldValue, newValue);
			var keyMeta = metadata.get(keyName);
			// skip reflection caused by this attribute deserialization
			// it would otherwise cause infinite loop
			deserializeAttribute(this, keyName, newValue, keyMeta);};}



	function assignInstanceThings(Class, instance, proto, metadata) {
		assignProperties(instance, this, metadata);
		setupAttrPropSync(this, metadata);

		var template = Class[symbol.template];
		if (template) {
			var shadowroot = this.createShadowRoot();
			shadowroot.innerHTML = template;}}



	// note: had to break down original assignMethods into two functions
	// because when defining both attribute and element at the same time
	// the meta object of class was setup by both attr and element
	// e.g. the callbacks were duplicated
	function assignMethodsMetadata(proto, metadata) {
		_.forEach(Object.getOwnPropertyNames(proto), function (methodName) {
			if (methodName == 'constructor') return;
			if (methodName.endsWith('Changed')) {
				//console.log('add observer', methodName)
				metadata.get(methodName.slice(0, -7)).observers.push(methodName);}});}



	function assignMethods(proto, target) {
		_.forEach(Object.getOwnPropertyNames(proto), function (methodName) {
			var func = proto[methodName];
			if (func) {
				target[methodName] = func;} else 
			{
				// get/set
				var descriptor = Object.getOwnPropertyDescriptor(proto, methodName);
				Object.defineProperty(target, methodName, descriptor);}});


		/*_.forEach(Object.getOwnPropertyNames(proto), methodName => {
  	target[methodName] = proto[methodName];
  });*/}


	function assignPropertiesMetadata(source, metadata) {
		Object.keys(source).concat(metadata.gettersetters).forEach(function (keyName) {
			// assign value from definition class (to be onest: from it's dummy instance) to instance
			var keyVal = source[keyName];

			// define metadata
			var type = keyVal.constructor;
			var keyMeta = metadata.get(keyName);
			if (type === Function) {
				// type is Function which is constructor of primitives which means
				// keyVal is actually a primitive and not a value
				keyMeta.type = keyVal;} else 
			{
				keyMeta.type = type;}});}



	function assignProperties(source, target, metadata) {
		// assings properties and also getter-setters which are actually functions but behave at property
		Object.keys(source).forEach(function (keyName) {
			var keyVal = source[keyName];
			target[keyName] = keyVal;});

		metadata.gettersetters.forEach(function (keyName) {
			var keyVal = source[keyName];});}



	function setupAttrPropSync(element, metadata) {
		_.forEach(Object.keys(metadata), function (keyName) {
			var keyMeta = metadata.get(keyName);
			var keyValue = element.getAttribute(keyName);

			// deserialize all properties
			//console.log('deserialize', keyName, keyValue, keyValue !== 'false' && keyValue !== null);
			deserializeAttributeInitial(element, keyName, keyValue, keyMeta);

			// reflect
			if (keyMeta.reflect) {
				reflectPropertyInitial(element, keyName, element[keyName], keyMeta);}


			if (keyMeta.reflect || keyMeta.observers.length) {
				setupGetSet(element, keyName, keyMeta);}});}




	function deserializeAttributeInitial(element, keyName, keyValue, keyMeta) {
		if (keyMeta.type === Boolean) {
			if (element[keyName] === Boolean) {
				// property without default value (has Boolean constructor as value)
				// which means it sets it according to presence of attribute
				if (keyValue !== 'false' && keyValue !== null) {
					element[keyName] = true;} else 
				{
					element[keyName] = false;}} else 

			if (keyValue === 'false') {
				// overwrite default value (mostly true or Boolean) if attribute has explicit false
				// e.g. default value is property=true and element has [attribute="false" ]
				element[keyName] = false;} else 
			if (keyValue !== null) {
				// overwrite default value (mostly false or Boolean) if attribute is present
				// e.g. default value is property=false but eolement has [attribute]
				element[keyName] = true;}} else 

		if (keyMeta.type === Number) {
			if (keyValue !== null) {
				// if attribute present, overwrite default property value
				element[keyName] = +keyValue;} else 
			if (element[keyName] === Number) {
				// if default value is undefined (Number constructor)
				// and attribute is not present -> the value is 0
				element[keyName] = 0;}} else 

		{
			element[keyName] = keyValue;}}


	function deserializeAttribute(element, keyName, keyValue, keyMeta) {
		//console.log('deserializeAttribute', keyName, keyValue, '|', keyMeta.deserializeSkip ? 'SKIP' : 'PASS')
		if (keyMeta.deserializeSkip) {
			keyMeta.deserializeSkip = false;} else 
		{
			// prevent endless loop by preventing reflection (which will be triggered by this deserialization)
			keyMeta.reflectSkip = true;
			_deserializeAttribute(element, keyName, keyValue, keyMeta);}}


	function _deserializeAttribute(element, keyName, keyValue, keyMeta) {
		if (keyMeta.type === Boolean) {
			if (keyValue !== 'false' && keyValue !== null) {
				element[keyName] = true;} else 
			{
				element[keyName] = false;}} else 

		if (keyMeta.type === Number) {
			element[keyName] = +keyValue;} else 
		{
			element[keyName] = keyValue;}}



	function reflectPropertyInitial(element, keyName, keyValue, keyMeta) {
		_reflectProperty(element, keyName, keyValue, keyMeta);}

	function reflectProperty(element, keyName, keyValue, keyMeta) {
		//console.log('reflectProperty', keyName, keyValue, '|', keyMeta.reflectSkip ? 'SKIP' : 'PASS')
		if (keyMeta.reflectSkip) {
			keyMeta.reflectSkip = false;} else 
		{
			_reflectProperty(element, keyName, keyValue, keyMeta);}}


	function _reflectProperty(element, keyName, keyValue, keyMeta) {
		// prevent endless loop by preventing deserialization (which will be triggered by this reflection)
		keyMeta.deserializeSkip = true;

		if (keyMeta.type === Boolean) {
			if (keyValue === true) {
				element.setAttribute(keyName, '');} else 
			{
				element.removeAttribute(keyName);}} else 

		{
			element.setAttribute(keyName, keyValue);}}


	/*
 	function reflectPropertyInitial(element, keyName, keyValue, keyMeta) {
 		keyMeta.deserializeSkip = true;
 		_reflectProperty(element, keyName, keyValue, keyMeta);
 	}
 	function reflectProperty(element, keyName, keyValue, keyMeta) {
 		console.log('reflectProperty', keyName, keyValue, '|', keyMeta.reflectSkip ? 'SKIP' : 'PASS')
 		if (keyMeta.reflectSkip) {
 			keyMeta.reflectSkip = false;
 		} else {
 			// prevent endless loop by preventing deserialization (which will be triggered by this reflection)
 			keyMeta.deserializeSkip = true;
 			_reflectProperty(element, keyName, keyValue, keyMeta);
 		}
 	}
 	function _reflectProperty(element, keyName, keyValue, keyMeta) {
 		if (keyMeta.type === Boolean) {
 			if (keyValue === true) {
 				element.setAttribute(keyName, '');
 			} else {
 				element.removeAttribute(keyName);
 			}
 		} else {
 			element.setAttribute(keyName, keyValue);
 		}
 	}*/


	// each property is in fact getter-setter to be able to listen for changes and reflest them
	function setupGetSet(element, keyName, keyMeta) {
		//console.log('setupGetSet', keyName, keyMeta);
		var value = element[keyName];
		var getset = keyMeta.getter && keyMeta.setter;

		Object.defineProperty(element, keyName, { 

			// if property is getter-setter use it's own getter
			// otherwise create new which returns local scoped value
			// note: no need to bind getter. It will be invoked on the context
			// as it it directly passed onto the element
			get: getset ? keyMeta.getter : function () {return value;}, 

			set: function set(newValue) {var _this = this;
				// get old value. if property is user defined getter-setter
				// call users getter (in elements context!) because he is storing
				// the value on his own. Otherwise use local scoped value
				//console.log('SET', keyName, newValue, '| reflect', keyMeta.reflect);
				//var oldValue = getset ? keyMeta.getter.call(this) : value;

				//if (oldValue !== newValue) {
				if (keyMeta.reflect) {
					reflectProperty(this, keyName, newValue, keyMeta);}

				if (getset) {
					// call the user defined setter in elements context
					// also getter-setter obviously doesn't have any observers
					keyMeta.setter.call(this, newValue);} else 
				{
					// store value in local scope and call observers
					value = newValue;
					_.forEach(keyMeta.observers, function (observerName) {return _this[observerName]();});}

				//}
			} });}









	// polyfills native custom elements callback
	function observeAttributeMutations(element, metadata) {
		// create an observer instance
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				var keyName = mutation.attributeName;
				var newValue = element.getAttribute(keyName);
				if (mutation.oldValue !== newValue) {
					element.attributeChangedCallback(keyName, mutation.oldValue, newValue);}});});




		var config = { 
			// temporarily disabled
			// TODO: make this work with get/set (currently only attributes are added to the reflectedAttrs array)
			//attributeFilter: metadata[symbol.reflectedAttrs],
			attributeOldValue: true, 
			attributes: true };

		observer.observe(element, config);

		return observer;}


	function observeNewElements() {
		var observer = new MutationObserver(function (mutations) {
			mutations.forEach(function (mutation) {
				//console.log(mutation.addedNodes, mutation.removedNodes);
				if (mutation.addedNodes.length) {
					//console.log('added', mutation.addedNodes);
				}
				if (mutation.removedNodes.length) {
					//console.log('removed', mutation.removedNodes);
					//console.log(mutation.removedNodes[0].querySelectorAll('div'));
				}});});



		var config = { 
			childList: true, 
			subtree: true };


		observer.observe(document.documentElement, config);}








	function getMetadata(proto) {
		var metadata = proto.constructor[symbol.meta];
		if (metadata === undefined) {
			//metadata = proto.constructor[symbol.meta] = {};
			metadata = proto.constructor[symbol.meta] = new ElementMetadata();
			metadata[symbol.reflectedAttrs] = [];}

		return metadata;}var 


	ElementMetadata = (function () {var _instanceInitializers = {};function ElementMetadata() {_classCallCheck(this, ElementMetadata);_defineDecoratedPropertyDescriptor(this, 'gettersetters', _instanceInitializers);}





















































		// decorators
		_createDecoratedClass(ElementMetadata, [{ key: 'get', decorators: [nonenumerable], value: function get(key) {if (this[key] === undefined) {return this[key] = { observers: [], type: undefined, reflect: false, reflectSkip: false, deserializeSkip: false };} else {return this[key];} //return this[key];
			} }, { key: 'set', decorators: [nonenumerable], value: function set(key, val) {this[key] = val;} }, { key: 'gettersetters', decorators: [nonenumerable], initializer: function initializer() {return [];}, enumerable: true }], null, _instanceInitializers);return ElementMetadata;})();function reflect(proto, keyName, descriptor) {
		//console.log('reflect', Class, keyName, descriptor);
		//console.log('reflect', proto, keyName);
		var metadata = getMetadata(proto);
		metadata[symbol.reflectedAttrs].push(keyName);

		var keyMeta = metadata.get(keyName);
		keyMeta.reflect = true;

		if (descriptor.get && descriptor.set) {
			keyMeta.getter = descriptor.get;
			keyMeta.setter = descriptor.set;
			metadata.gettersetters.push(keyName);}}


	function observe() {for (var _len = arguments.length, props = Array(_len), _key2 = 0; _key2 < _len; _key2++) {props[_key2] = arguments[_key2];}
		//console.log('@observe', ...props)
		return function (proto, observerName) {
			var metadata = getMetadata(proto);
			_.forEach(props, function (keyName) {
				metadata.get(keyName).observers.push(observerName);});};}



	function template(templateString) {
		return function (Class) {
			Class[symbol.template] = templateString;
			//console.log('Class', Class, 'templateString', templateString)
		};}







	// export
	fx.Element = fxElement;
	fx.template = template;
	fx.reflect = reflect;



	/*
 setTimeout(function() {
 	var div = document.createElement('div');
 	div.id = 'e49';
 	div.setAttribute('fx-drawer', '');
 	document.body.appendChild(div);
 }, 300)
 
 setTimeout(function() {
 	var div = document.querySelector('#e49').innerHTML = '<div fx-test id="a1"></div><div fx-test id="a2"></div>'
 }, 600)
 
 setTimeout(function() {
 	var div = document.querySelector('#a1').innerHTML = '<div id="wow"></div>';
 	var div = document.querySelector('#a2').appendChild(new Mytag());
 }, 800)
 
 setTimeout(function() {
 	//document.body.innerHTML = '';
 	//document.querySelector('#e49').innerHTML = '';
 	document.querySelector('#e49').remove();
 }, 1000)
 */})(); /*
         	@nonenumerable
         	map = new Map;
         
         	@nonenumerable
         	get(key) {
         		if (this.map.has(key)) {
         			return this.map.get(key);
         		} else {
         			var keyMeta = {
         				observers: [],
         				type: undefined,
         				reflect: false,
         				reflectSkip: false,
         				deserializeSkip: false
         			};
         			this.map.set(key, keyMeta);
         			return keyMeta;
         		}
         		//return this[key];
         	}
         
         	@nonenumerable
         	set(key, val) {
         		this.map.set(key, val);
         	}
         */