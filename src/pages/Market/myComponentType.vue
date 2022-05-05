<template lang="pug">
e-layout.market-container(:padding="false")
	.btn-box
		i-button.mr10(type="primary", @click="create") 新增
	i-table(
		row-key="componentTypeId",
		:columns="columns",
		:data="list",
		v-if="total > 0",
		:load-data="handleLoadData")
		template(#componentTypeParentName="{ row }")
			span {{ row.componentTypeParentName ? row.componentTypeParentName : '无' }}
		template(#createTime="{ row }")
			span {{ row.createTime ? $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') : '' }}
		template(#action="{ row }")
			i-button.mr10(type="primary", @click="edit(row)") 编辑
			i-button(type="error", @click="remove(row)") 删除
	e-page(
		@init="init",
		:total="total",
		ref="page",
		:show="false",
		:loaded="loaded")
	dialogComponentType(
		v-model="dialogEditShow",
		:detail="currentRow",
		@reload="init")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import dialogComponentType from './dialogComponentType.vue'
import common from '../../store/common.store.js'
import { levelList, destroy } from '@/api/marketComponentType.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		dialogComponentType,
	},
})
export default class MarketComponentType extends Vue {
	common = common.state
	list = []
	columns = [
		{
			title: '分类名',
			key: 'componentTypeName',
			tree: true,
		},
		{
			title: '创建时间',
			slot: 'createTime',
		},
		{
			title: '操作',
			slot: 'action',
		},
	]
	loaded = false
	total = 0
	dialogEditShow = false
	currentRow = {
		componentTypeName: '',
	}

	handleLoadData(item, callback): void {
		if (this.common.user.userAdmin) {
			levelList({ componentTypeParentId: item.componentTypeId }).then(res => {
				callback(res)
			})
		} else {
			callback([])
		}
	}

	init(): void {
		levelList().then(res => {
			res.map(item => {
				item.children = []
				item._loading = false
				return item
			})
			this.loaded = true
			this.total = res.length
			this.list = res
		})
	}

	async remove(row) {
		this.$Modal.confirm({
			title: '提示',
			content: '确认删除吗？',
			loading: true,
			onOk: async () => {
				await destroy({
					componentTypeId: row.componentTypeId,
				})
				this.$Message.success('删除成功')
				this.$Modal.remove()
				this.init()
			},
		})
	}

	create(): void {
		this.dialogEditShow = true
		this.currentRow = {
			componentTypeName: '',
		}
	}

	edit(row): void {
		this.currentRow = { ...row }
		this.dialogEditShow = true
	}

	reload(): void {
		;(this.$refs.page as any).reload()
	}

	mounted(): void {
		common.actions.setNavIndex('/market/componentList')
	}
}
</script>
<style lang="scss" scoped>
.btn-box {
	margin-bottom: 10px;
}

.market-container {
	.mr10 {
		margin-right: 10px;
	}
}
</style>
