export default {
	path: '/editor/Manger',
	name: 'editorManger',
	meta: {
		requireAuth: true,
	},
	component: () => import('./index.vue'),
}
