import Vue from 'vue'
import { store } from './index'

const state = Vue.observable({
	navIndex: '/editor/Manger',
	user: null,
})
const actions = {
	setNavIndex(navIndex) {
		state.navIndex = navIndex
	},
	setUser(user) {
		state.user = user
	},
}
const scene = store('common', state, actions)

export default scene
