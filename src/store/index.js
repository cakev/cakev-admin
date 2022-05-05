export const store = function (name, _state, _actions) {
	let state, actions
	if (!window.eslinkV) {
		window.eslinkV = {}
	}

	if (!window.eslinkV.$store) {
		window.eslinkV.$store = {}
	}

	if (window.eslinkV.$store[name]) {
		state = window.eslinkV.$store[name].state
		actions = window.eslinkV.$store[name].actions
	} else {
		state = _state
		actions = _actions
		window.eslinkV.$store[name] = { state, actions }
	}
	return { state, actions }
}
