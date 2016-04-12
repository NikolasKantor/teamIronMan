// ES6 class syntax only runs in strict mode
'use strict';

class MathLib {

	static add(numbers) {
		return numbers[1] + numbers[0]
	}

	static sub(numbers) {
		return numbers[1] - numbers[0]
	}

	static mul(numbers) {
		return numbers[1] * numbers[0]
	}

	static div(numbers) {
		return numbers[1] / numbers[0]
	}

	static helloWorld() {
		return 'very script, much class, WOW!';
	}

}

// export MathLib class the old fashioned way for both brower and node (for testing)
(typeof window === 'object' ? window : global).MathLib = MathLib;
