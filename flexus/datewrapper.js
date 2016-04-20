'use strict';var _bind = Function.prototype.bind;var proto = { 

	day: { 
		get: function get() {return this.getDate();}, 
		set: function set(value) {return this.setDate(value);} }, 


	weekday: { 
		get: function get() {return this.getDay();}, 
		set: function set(value) {return this.setDay(value);} }, 


	month: { 
		get: function get() {return this.getMonth() + 1;}, 
		month: function month(value) {return this.setMonth(value - 1);} }, 


	year: { 
		get: function get() {return this.getFullYear();}, 
		set: function set(value) {return this.setFullYear(value);} }, 


	time: { 
		get: function get() {return this.getTime();}, 
		set: function set(value) {return this.setTime(value);} } };




function Date2() {for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {args[_key] = arguments[_key];}
	var _date = new (_bind.apply(Date, [null].concat(args)))();
	Object.defineProperties(_date, proto);
	return _date;}



var date = new Date2();

console.log('Date2', Date2);
console.log('date', date);
console.log('date+', date.valueOf());
console.log('---', date.day, date.month, date.year);