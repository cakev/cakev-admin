export default {
	namespaced: true,
	state: {
		navIndex: '/editor/Manger',
		user: null,
	},
	mutations: {
		setNavIndex(state, navIndex) {
			state.navIndex = navIndex
		},
		setUser(state, user) {
			state.user = user
		},
	},
}
