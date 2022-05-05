<template lang="pug">
e-layout(:padding="false")
	.create
		i-button(type="primary", @click="create") 创建密钥
	i-table(:columns="columns", :data="tableData")
		template(#createTime="{row}")
			span {{ $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') }}
		template(#appKey="{row}")
			.secret
				.secret-row
					label appKey:
					.content {{ row.appKey }}
				.secret-row
					label appSecret:
					.content {{ row.isSecretKeyShow ? row.appSecret : row.appSecret.replace(/./g, '*') }}
						.show.pointer(@click="row.isSecretKeyShow = !row.isSecretKeyShow") {{ row.isSecretKeyShow ? '隐藏' : '显示' }}
		template(#isUsed="{row}")
			span.use(v-if="row.isUsed") 使用中
			span.stop(v-else) 已停用
		template(#action="{row}")
			i-button(type="warning", @click="handleUse(row)", v-if="row.isUsed") 停用
			i-button(type="info", @click="handleUse(row)", v-else) 启用
</template>
<script lang="ts">
import { Table, Button } from 'view-design'
import { createSecretKey, getAllSecretKey, stopSecretKey, useSecretKey } from '@/api/secretKey.api.js'

export default {
	components: {
		'i-table': Table,
		'i-button': Button,
	},
	data() {
		return {
			tableData: [],
			columns: [
				{
					width: 200,
					title: '创建时间',
					slot: 'createTime',
				},
				{
					minWidth: 300,
					title: 'appKey/appSecret',
					slot: 'appKey',
				},
				{
					title: '状态',
					slot: 'isUsed',
				},
				{
					title: '操作',
					slot: 'action',
				},
			],
		}
	},
	methods: {
		async getList() {
			let res = await getAllSecretKey()
			res = res.map(v => {
				v.isSecretKeyShow = false
				return v
			})
			this.tableData = res
		},
		async handleUse(row) {
			if (row.isUsed) {
				await stopSecretKey({
					appKey: row.appKey,
					appSecret: row.appSecret,
				})
			} else {
				await useSecretKey({
					appKey: row.appKey,
					appSecret: row.appSecret,
				})
			}
			this.$Message.success('操作成功')
			this.getList()
		},
	},
	async create() {
		await createSecretKey()
		await this.getList()
	},
	async mounted() {
		await this.getList()
		if (this.tableData.length === 0) {
			this.$Message.success({
				content: '让我们创建第一个密钥吧',
			})
		}
	},
}
</script>
<style lang="scss" scoped>
.secret {
	.secret-row {
		display: flex;
		align-items: center;
		height: 40px;
		label {
			width: 80px;
			margin-right: 6px;
			text-align: right;
		}
		.content {
			position: relative;
			width: 290px;
			height: 32px;
			padding: 6px 12px;
			font-size: 12px;
			color: #adbcd9;
			background-color: #f5f7fa;
			border: 1px solid #e9edf4;
			border-radius: 4px;

			.show {
				position: absolute;
				top: 7px;
				right: 4px;
				z-index: 2;
				width: 33px;
				height: 18px;
				padding: 0;
				font-size: 12px;
				line-height: 18px;
				color: #fff;
				text-align: center;
				user-select: none;
				background-color: #b8c7e6;
				border-radius: 3px;
			}
		}
	}
}
.use {
	color: #67c23a;
}
.stop {
	color: #777;
}
.create {
	display: flex;
	justify-content: flex-end;
	margin-bottom: 10px;
}
</style>
