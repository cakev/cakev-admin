export default {
	path: '/editor/new',
	name: 'editorNew',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
