'use strict';var _createClass = (function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ('value' in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};})();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError('Cannot call a class as a function');}}(function () {var 


	PageView = (function () {function PageView() {_classCallCheck(this, _PageView);this.

			page = String;this.
			design = String;this.
			layout = String;this.
			theme = String;}_createClass(PageView, [{ key: 'ready', value: 

			function ready() {var _this = this;
				console.log('ready');
				this.design = this.design || 'material';
				this.layout = this.layout || 'normal';
				this.theme = this.theme || 'light';

				this.list = ['items.html', 'items2.html', 'settings.security.html', 'edit'];

				this.$.settings.addEventListener('click', function (e) {
					if (e.target.localName == 'input') {
						_this.update(e.target.name, e.target.value);}});



				this.pagePromise = getFile('/pages/' + this.page + '.html');
				this.reload();} }, { key: 'reload', value: 



			function reload() {var _this2 = this;
				var frame = this.$.frame;
				frame.onload = function () {
					var body = frame.contentWindow.document.body;
					_this2.pagePromise.then(function (data) {return body.innerHTML += data;});
					_this2.applySettings(body);};

				frame.src = '/base.' + this.design + '.html?dom=shadow';} }, { key: 'update', value: 



			function update(what, value) {
				var frame = this.$.frame;
				var body = frame.contentWindow.document.body;
				this[what] = value;
				switch (what) {
					case 'design':
						this.reload();
						break;
					case 'layout':
						body.setAttribute('nx-layout', value);
						break;
					case 'theme':
						body.setAttribute('nx-theme', value);
						break;}} }, { key: 'applySettings', value: 



			function applySettings(body) {
				body.setAttribute('nx-layout', this.layout);
				body.setAttribute('nx-theme', this.theme);} }]);var _PageView = PageView;PageView = PolymerElement('page-view')(PageView) || PageView;return PageView;})();




	function getFile(url) {
		return new Promise(function (resolve) {
			var xmlhttp = new XMLHttpRequest();
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.status == 200 && xmlhttp.readyState == 4) {
					resolve(xmlhttp.responseText);}};


			xmlhttp.open('GET', url, true);
			xmlhttp.send();});}})();