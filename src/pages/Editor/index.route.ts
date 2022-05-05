export default {
	path: '/editor/manger/:id',
	name: 'editorEdit',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
