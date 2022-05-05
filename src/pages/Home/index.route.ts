export default {
	path: '/',
	name: 'home',
	meta: {
		requireAuth: false,
	},
	redirect: '/editor/Manger',
	component: () => import('./index.vue'),
}
