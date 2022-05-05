<template lang="pug">
.d-upload
	.d-upload-img.pos-r(v-if="value")
		img(:src="value", v-if="type === 'img'")
		video(:src="value", v-if="type === 'video'", loop, autoplay)
		i-upload.pointer.pos-a(
			:action="action",
			:data="data",
			:show-upload-list="false",
			:on-success="handleSuccess")
		i-icon.d-upload-download-icon.pos-a.pointer(
			title="下载",
			type="ios-download-outline",
			color="#fff",
			size="14",
			@click="handleDown")
		i-icon.d-upload-remove-icon.pos-a.pointer(
			title="删除",
			type="ios-trash-outline",
			color="#fff",
			size="14",
			@click="handleRemove")
	i-upload.pointer(
		v-else,
		:action="action",
		:data="data",
		:show-upload-list="false",
		:on-success="handleSuccess")
		.d-upload-text 点击上传
</template>
<script lang="ts">
import { Upload, Icon } from 'view-design'

export default {
	name: 'd-upload',
	components: {
		'i-upload': Upload,
		'i-icon': Icon,
	},
	props: {
		action: {
			type: String,
			default: '/node/upload/file',
		},
		data: {},
		type: {
			type: String,
			default: 'img',
		},
		value: {},
	},
	methods: {
		handleDown() {
			const a = document.createElement('a')
			a.setAttribute('download', this.value)
			a.setAttribute('href', this.value)
			a.click()
		},
		handleRemove() {
			this.$emit('input', '')
			this.$emit('success', '')
		},
		handleSuccess(res) {
			this.$emit('input', res.result.url)
			this.$emit('success', res)
		},
	},
}
</script>
<style lang="scss" scoped>
@import 'src/scss/conf';

.d-upload-download-icon {
	top: 10px;
	right: 30px;
}

.d-upload-remove-icon {
	top: 10px;
	right: 10px;
}

.d-upload-img {
	display: flex;
	display: -webkit-flex;
	align-items: center;
	justify-content: center;
	width: 208px;
	height: 115px;
	video,
	img {
		max-width: 100%;
		max-height: 100%;
	}
}

.d-upload {
	border: 1px solid #393b4a;

	&:hover {
		border: 1px solid $themeColor;

		.d-upload-text {
			color: $themeColor;
		}
	}

	&::v-deep {
		.ivu-upload-select {
			display: flex;
			display: -webkit-flex;
			align-items: center;
			justify-content: center;
			width: 208px;
			height: 115px;
			transition: all 0.3s;

			.d-upload-text {
				font-size: 14px;
			}
		}
	}
}
</style>
