<template lang="pug">
i-modal.check-modal(v-model="modalShow", title="审核")
	d-view.pos-r(v-if="modalShow")
	div(slot="footer")
		i-button(type="primary", @click="submit", :loading="loading") 通过
		i-button(type="error", @click="cancel") 拒绝
</template>

<script lang="ts">
import { Modal, Button } from 'view-design'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import html2canvas from 'html2canvas'
import { dView } from '@eslinkv/vue2'
import { checkError, checkSuccess } from '@/api/marketComponent.api.js'
import { file } from '@/api/upload.api.js'
import { Editor } from '@eslinkv/core'

export default {
	components: {
		'i-button': Button,
		'i-modal': Modal,
		dView,
	},
	props: {
		value: {
			type: Boolean,
		},
		detail: {
			type: Object,
		},
	},
	data() {
		return {
			modalShow: false,
			loading: false,
			editor: Editor.Instance(),
		}
	},
	watch: {
		value: function (val) {
			this.modalShow = val
		},
		modalShow: function (val) {
			this.$emit('input', val)
		},
	},
	methods: {
		cancel(): void {
			checkError({ componentId: this.detail.componentId }).then(() => {
				this.modalShow = false
				this.$emit('reload')
			})
		},

		submit(): void {
			this.loading = true
			document.getElementsByClassName('widget-part')[0].classList.remove('animate__fadeIn')
			html2canvas(document.getElementsByClassName('widget-part')[0] as HTMLElement, {
				allowTaint: true,
				scale: 1,
				useCORS: true,
				backgroundColor: 'transparent',
			})
				.then(canvas => {
					canvas.toBlob(
						blob => {
							this.upload(blob)
						},
						'image/png',
						0.9,
					)
				})
				.catch(e => {
					console.log(e)
					this.$Message.error('组件截图失败')
					checkSuccess({
						componentId: this.detail.componentId,
						componentAvatar: '',
						componentEnTitle: this.detail.componentEnTitle,
					})
						.then(() => {
							this.modalShow = false
							this.loading = false
							this.$emit('reload')
						})
						.catch(() => {
							this.loading = false
						})
				})
		},

		upload(blob): void {
			const name = `${+new Date()}.png`
			const data = new FormData()
			data.append('file', blob, name)
			data.append('library', `componentAvatar/${this.detail.componentEnTitle}/${this.detail.componentVersion}`)
			file(data).then(res => {
				checkSuccess({
					componentId: this.detail.componentId,
					componentAvatar: res.url,
					componentEnTitle: this.detail.componentEnTitle,
				})
					.then(() => {
						this.modalShow = false
						this.loading = false
						this.$emit('reload')
					})
					.catch(() => {
						this.loading = false
					})
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.check-modal {
	&::v-deep {
		.ivu-modal-body {
			max-width: 500px;
			max-height: 500px;
			overflow-x: auto;
			overflow-y: auto;
		}
	}
}
</style>
