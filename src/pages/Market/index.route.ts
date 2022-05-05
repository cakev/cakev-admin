export default {
	path: '/market',
	name: 'market',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
