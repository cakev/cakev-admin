export default {
	path: '/screen/detail/:screenId',
	name: 'ScreenDetail',
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
