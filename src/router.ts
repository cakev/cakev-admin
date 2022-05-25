import Vue from 'vue'
import VueRouter from 'vue-router'

const routes: Array<any> = []
const context = require.context('./pages', true, /\.(route.ts)$/)

context.keys().forEach(name => {
	routes.push(context(name).default)
})

Vue.use(VueRouter)

const router: any = new VueRouter({
	mode: 'history',
	routes: [
		{
			path: '/',
			redirect: '/screen',
		},
		...routes,
	],
})
router.beforeEach((to, _from, next) => {
	if (to.meta.requireAuth) {
		if (localStorage.getItem('cakev-login')) {
			next()
		} else {
			next('/login')
		}
	} else {
		next()
	}
})
export default router
