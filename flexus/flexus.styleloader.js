(function() {
	var head = document.getElementsByTagName('head')[0];
	var styles = Array.from(document.styleSheets).map(style => style.href).filter(href => href && href.includes('flexus') && !href.includes('flexus-layout'));
	if (styles.length) return;

	function loadStyle(path) {
	//if (!document.getElementById(cssId)) {
		var link  = document.createElement('link');
		//link.id   = cssId;
		link.rel  = 'stylesheet';
		link.type = 'text/css';
		link.href = path;
		link.media = 'all';
		head.appendChild(link);
	}


	// platform detection
	var UD = 'undefined';
	var hasNode = typeof global != UD;
	var hasNavigator = typeof navigator != UD;
	var ua = hasNavigator ? navigator.userAgent.toLowerCase() : '';
	var p = window.platform = {};
	p.nwjs = typeof nw != UD && typeof nw.App != UD;
	p.chromeapp = !p.nwjs && typeof chrome != UD && typeof chrome.runtime != UD && typeof chrome.runtime.id == 'string';
	p.android = ua.indexOf('android') != -1; // todo


	var design = p.chromeapp || p.android ? 'material' : 'metro';
	var path = 'flexus/css/';
	var files = ['flexus-' + design + '.css', 'flexus-' + design + '-icons.css'];

	files.map(file => path + file).forEach(loadStyle);

	document.addEventListener('DOMContentLoaded', function() {
		document.body.setAttribute(design, '')
	});
})()