// ES6 class syntax only runs in strict mode
'use strict';

class EventEmitter {

	constructor() {
		this._events = {}
	}

	on(ev, handler) {
		var events = this._events;
		(events[ev] || (events[ev] = [])).push(handler)
	}

	removeListener(ev, handler) {
		var array = this._events[ev]
		array && array.splice(array.indexOf(handler), 1)
	}

	emit(name, ...args) {
		var callbacks = this._events[name];
		if (callbacks && callbacks.length) {
			for (var i = 0, len = callbacks.length; i < len; i++) {
				callbacks[i].call(this, ...args)
			}
		}
	}

	once(ev, handler) {
		function remover() {
			handler.apply(this, arguments)
			this.removeListener(ev, remover)
		}
		this.on(ev, remover);
	}
	
}
