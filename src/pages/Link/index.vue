<template lang="pug">
e-layout(:padding="false")
	.create
		.search
			i-input(v-model="linkName" style="margin-right: 10px;" placeholder="外链名")
			i-button(type="primary", @click="init") 查询
		i-button(type="primary", @click="create") 创建外链
	i-table(:columns="columns", :data="tableData")
		template(#action="{row}")
			i-button(type="warning", @click="handleRemove(row)" style="margin-right: 10px;") 删除
			i-button(type="info", @click="handleEdit(row)") 编辑
	e-page(@init="init", :total="total", ref="page", :loaded="loaded")
	dialogLink(v-model="dialogShow" :detail="current" @init="search")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Input } from 'view-design'
import dialogLink from './dialogLink.vue'
import { getLinkList, destroyLink } from '@/api/link.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
		'i-input': Input,
		dialogLink,
	},
})
export default class Link extends Vue {
	linkName = ''
	total = 0
	tableData = []
	loaded = false
	dialogShow = false
	current: any = {}
	columns = [
		{
			title: '外链名',
			key: 'linkName',
		},
		{
			title: '外链链接',
			key: 'linkUrl',
		},
		{
			title: '外链类型',
			key: 'linkType',
		},
		{
			title: '关联大屏',
			key: 'linkScreenName',
		},
		{
			title: '操作',
			slot: 'action',
		},
	]

	search() {
		this.init({
			pageSize: 10,
			pageNum: 1,
		})
	}

	async init({ pageNum = 1, pageSize = 10 }) {
		const req: any = {
			pageNum,
			pageSize,
		}
		if (this.linkName) req.linkName = this.linkName
		const res = await getLinkList(req)
		this.tableData = res.list
		this.loaded = true
		this.total = res.count
	}

	create() {
		this.current = {
			linkName: '',
			linkUrl: '',
			linkScreenId: '',
		}
		this.dialogShow = true
	}

	handleEdit(row) {
		this.dialogShow = true
		this.current = { ...row }
	}

	handleRemove(row): void {
		this.$Modal.confirm({
			title: '提示',
			content: '确认删除吗？',
			loading: true,
			onOk: () => {
				destroyLink({ linkId: row.linkId }).then(() => {
					this.$Message.success('删除成功')
					this.$Modal.remove()
					this.search()
				})
			},
		})
	}
}
</script>
<style lang="scss" scoped>
.create {
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
	.search {
		display: flex;
		align-items: center;
	}
}
</style>
