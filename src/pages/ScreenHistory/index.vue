<template lang="pug">
e-layout
	i-table(
		row-key="componentTypeId",
		:columns="columns",
		:data="list",
		v-if="total > 0")
		template(#createTime="{ row }")
			span {{ row.createTime ? $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') : '' }}
		template(#lastReduceTime="{ row }")
			span {{ row.lastReduceTime ? $format(new Date(row.lastReduceTime), 'yyyy-MM-dd HH:mm:ss') : '' }}
		template(#action="{ row }")
			i-button(type="primary", @click="reduce(row)") 还原
	e-page(
		@init="init",
		:total="total",
		:pageSize="999",
		:show="false",
		:loaded="loaded")
</template>
<script lang="ts">
import { list, reduce } from '@/api/backupsScreen.api'
import { Button, Table } from 'view-design'

export default {
	components: {
		'i-table': Table,
		'i-button': Button,
	},
	data() {
		return {
			list: [],
			columns: [
				{
					title: '分类名',
					key: 'screenName',
				},
				{
					title: '创建时间',
					slot: 'createTime',
				},
				{
					title: '最近一次还原时间',
					slot: 'lastReduceTime',
				},
				{
					title: '操作',
					slot: 'action',
				},
			],
			loaded: false,
			total: 0,
			currentRow: {
				componentTypeName: '',
			},
		}
	},
	methods: {
		reduce(row): void {
			this.$Modal.confirm({
				title: '提示',
				content: '确认还原吗？',
				loading: true,
				onOk: () => {
					reduce({ backupId: row.backupId }).then(() => {
						this.$Message.success('还原成功')
						this.$router.push('/editor/Manger')
						this.$Modal.remove()
					})
				},
			})
		},
		init(): void {
			const id = this.$route.params.id
			list({ screenId: id }).then(res => {
				res.map(item => {
					item.children = []
					item._loading = false
					return item
				})
				this.loaded = true
				this.total = res.length
				this.list = res
			})
		},
	},
}
</script>
