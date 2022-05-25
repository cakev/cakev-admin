export default {
	path: '/screen/editor/:screenId',
	name: 'ScreenEditor',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
