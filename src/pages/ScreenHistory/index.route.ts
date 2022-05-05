export default {
	path: '/screenHistory/:id',
	name: 'ScreenHistory',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
