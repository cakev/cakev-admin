export default {
	path: '/detail/:id',
	name: 'editorDetail',
	meta: {
		requireAuth: false,
	},
	component: () => import('./index.vue'),
}
