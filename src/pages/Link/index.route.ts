export default {
	path: '/link',
	name: 'link',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
