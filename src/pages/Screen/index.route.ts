export default {
	path: '/screen',
	name: 'Screen',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
