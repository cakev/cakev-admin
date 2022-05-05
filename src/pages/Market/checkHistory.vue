<template lang="pug">
div
	i-table(
		:columns="columns",
		:data="list",
		v-if="total > 0",
		@on-selection-change="selectHandle")
		template(#status="{ row }")
			span(:class="row.status") {{ status[row.status] }}
		template(#updateTime="{ row }")
			span {{ $format(new Date(row.updateTime), 'yyyy-MM-dd HH:mm:ss') }}
	e-page(@init="init", :total="total", ref="page", :loaded="loaded")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import { Editor } from '@eslinkv/core'
import { checkHistoryList } from '@/api/marketComponent.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
	},
})
export default class Market extends Vue {
	editor = Editor.Instance()
	list = []
	columns = [
		{
			type: 'selection',
			width: 60,
			align: 'center',
		},
		{
			title: '组件名',
			key: 'componentTitle',
		},
		{
			title: '组件英文名',
			key: 'componentEnTitle',
		},
		{
			title: '组件版本号',
			key: 'componentVersion',
		},
		{
			title: '审核状态',
			slot: 'status',
		},
		{
			title: '更新时间',
			slot: 'updateTime',
		},
	]
	loaded = false
	total = 0
	dialogCheckShow = false
	currentRow: any = null
	selectMore: any = false
	selectOne: any = false
	status: any = {
		ERROR: '审核失败',
		PENDING: '待审核',
		SUCCESS: '审核通过',
	}

	async init({ pageNum, pageSize }) {
		const res = await checkHistoryList({
			pageNum,
			pageSize,
		})
		this.list = res.list
		this.total = res.count
		this.loaded = true
	}

	selectHandle(selection): void {
		if (selection.length > 1) {
			this.selectMore = selection
		} else {
			this.selectMore = false
		}
		if (selection.length === 1) {
			this.selectOne = selection[0]
		} else {
			this.selectOne = false
		}
	}

	reload(): void {
		;(this.$refs.page as any).reload()
	}
}
</script>
<style lang="scss" scoped>
.ERROR {
	color: red;
}
.SUCCESS {
	color: green;
}
</style>
