import Vue from 'vue'
import VueRouter from 'vue-router'
import common from './store/common.store.js'

const routes: Array<any> = []
const context = require.context('./pages', true, /\.(route.ts)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

Vue.use(VueRouter)

const router: any = new VueRouter({
	mode: 'history',
	routes,
})
router.beforeEach((to, _from, next) => {
	if (to.meta.requireAuth) {
		if (common.state.user || localStorage.getItem('cakev-login')) {
			next()
		} else {
			next('/login')
		}
	} else {
		next()
	}
})
export default router
