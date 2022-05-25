<template lang="pug">
d-view
</template>
<script lang="ts">
import { Editor } from '@cakev/sdk'
import { detail } from '@/api/screen.api'

export default {
	name: 'detail',
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
	mounted() {
		const screenId = this.$route.params.screenId
		detail({ screenId }).then(res => {
			this.editor.screen.init(res)
		})
	},
}
</script>
