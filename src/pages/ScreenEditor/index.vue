<template lang="pug">
div
	d-detail
	d-screen
</template>
<script lang="ts">
import { Editor } from '@cakev/sdk'
import { detail } from '@/api/screen.api'

export default {
	name: 'editor',
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	mounted() {
		const screenId = this.$route.params.screenId
		detail({ screenId }).then(res => {
			this.editor.screen.init(res)
			this.editor.resetZoom()
		})
	},
}
</script>
