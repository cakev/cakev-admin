export default {
	path: '/secretKey',
	name: 'secretKey',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
