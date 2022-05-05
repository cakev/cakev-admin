<template lang="pug">
i-modal.check-modal(v-model="modalShow", title="新增")
	i-form(:label-width="100")
		i-form-item(label="分类名")
			i-input(v-model="detail.componentTypeName")
	div(slot="footer")
		i-button(type="primary", @click="submit") 提交
		i-button(type="error", @click="modalShow = false") 取消
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Modal, Button, Form, FormItem, Input, Select, Option } from 'view-design'
import { update, create } from '@/api/collectionComponentType.api.js'

@Component({
	components: {
		'i-button': Button,
		'i-modal': Modal,
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
	},
})
export default class DialogComponentType extends Vue {
	@Prop(Boolean) value: boolean
	@Prop(Object) detail
	modalShow = false
	@Watch('value')
	onValueChange(val): void {
		this.modalShow = val
	}

	@Watch('modalShow')
	onModalShow(val): void {
		this.$emit('input', val)
	}

	async submit() {
		if (this.detail.componentTypeId) {
			await update({ ...this.detail })
		} else {
			await create({ ...this.detail })
		}
		this.modalShow = false
		this.$emit('reload')
	}
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
