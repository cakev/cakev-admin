<template lang="pug">
i-modal.check-modal(v-model="modalShow", :title="detail.linkId ? '更新' : '新增'")
	i-form(:label-width="100")
		i-form-item(label="外链名")
			i-input(v-model="detail.linkName")
		i-form-item(label="外链链接")
			i-input(v-model="detail.linkUrl")
		i-form-item(label="外链类型")
			i-select(v-model="detail.linkType")
				i-option(value="javascript") javascript
				i-option(value="css") css
		i-form-item(label="关联大屏")
			i-select(v-model="detail.linkScreenId")
				i-option(:value="k.screenId", v-for="(k, i) in screens", :key="i") {{ k.screenName }}
	div(slot="footer")
		i-button(type="primary", @click="submit") 提交
		i-button(type="error", @click="modalShow = false") 取消
</template>
<script lang="ts">
import { Modal, Button, Form, FormItem, Input, Select, Option } from 'view-design'
import { createLink, updateLink } from '@/api/link.api'
import { all } from '@/api/screen.api'

export default {
	name: 'dialog-component-type',
	components: {
		'i-button': Button,
		'i-modal': Modal,
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
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
			screens: [],
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
		async submit() {
			if (this.detail.linkId) {
				await updateLink({ ...this.detail })
			} else {
				await createLink({ ...this.detail })
			}
			this.modalShow = false
			this.$emit('init')
		},
	},
	async created() {
		const res = await all()
		this.screens = res.list
	},
}
</script>
<style lang="scss" scoped>
.check-modal {
	&::v-deep {
		.ivu-modal-body {
			max-width: 500px;
			max-height: 500px;
		}
	}
}
</style>
