if (typeof global == 'object') {
	module.exports = new (require('events').EventEmitter);
} else {
	var events = new EventEmitter;
}
