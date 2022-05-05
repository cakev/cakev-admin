export default {
	path: '/login',
	name: 'login',
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
