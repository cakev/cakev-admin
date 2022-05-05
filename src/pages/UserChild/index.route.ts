export default {
	path: '/userChild',
	name: 'userChild',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
