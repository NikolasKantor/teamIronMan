/// Páteřní ústředna událostí
var events;
if (typeof global == 'object') {
	// instance nativniho EventEmitteru pri behu v prostredi Node.js a export jako Node modul
	module.exports = events = new (require('events').EventEmitter);
} else {
	// instanciace vlastni implementace EventEmitteru pri behu v prostredi prohlizece do globalni promenne
	var events = new EventEmitter;
}
