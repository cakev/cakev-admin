<template lang="pug">
.detail-container
	.preview-wrapper.fit-mode(
		:style="{ backgroundColor: editor.backgroundColor }")
		d-view
</template>
<script lang="ts">
import { dView } from '@cakev/sdk'
import { Editor } from '@cakev/sdk'

export default {
	name: 'detail',
	components: {
		dView,
	},
	data() {
		return {
			editor: Editor.Instance() as Editor,
		}
	},
}
</script>
<style lang="scss">
.detail-container {
	height: 100%;
}

.preview-wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99999;
	display: flex;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	#screen {
		position: relative;
		flex-grow: 0;
		flex-shrink: 0;
	}
}
</style>
