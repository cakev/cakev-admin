<template lang="pug">
.detail-container
	.preview-wrapper.fit-mode(
		:style="{ backgroundColor: editor.backgroundColor }")
		d-view
		d-detail(:show="false")
</template>
<script lang="ts">
import { dView, dDetail } from '@eslinkv/vue2'
import { Editor } from '@eslinkv/core'

export default {
	name: 'detail',
	components: {
		dView,
		dDetail,
	},
	data() {
		return {
			editor: Editor.Instance(),
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

	&.fit-mode {
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	&.mobile {
		align-items: unset;
		overflow: auto;

		#screen {
			transform-origin: 0 0;
		}
	}

	.mobile-wrap {
		position: relative;
		width: 100%;
		overflow: hidden;
	}
}
</style>
