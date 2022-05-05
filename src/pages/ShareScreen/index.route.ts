export default {
	path: '/shareScreen/:shareScreenId',
	name: 'shareScreen',
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
