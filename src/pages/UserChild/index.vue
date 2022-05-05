<template lang="pug">
e-layout.user-child-container(:padding="false")
	i-table(:columns="columns", :data="tableData", v-if="total > 0")
		template(#createTime="{row}")
			span {{ $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') }}
		template(#password="{row}")
			.content {{ row.isSecretKeyShow ? row.password : row.password.replace(/./g, '*') }}
				.show.pointer(@click="row.isSecretKeyShow = !row.isSecretKeyShow") {{ row.isSecretKeyShow ? '隐藏' : '显示' }}
	e-page(
		@init="init",
		:total="total",
		:pageSize="999",
		:show="false",
		:loaded="loaded")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button } from 'view-design'
import { childList } from '@/api/user.api.js'

@Component({
	components: {
		'i-table': Table,
		'i-button': Button,
	},
})
export default class SecretKey extends Vue {
	tableData = []
	total = 0
	loaded = false
	columns = [
		{
			title: '创建时间',
			key: 'userName',
		},
		{
			title: '账号昵称',
			key: 'userNickName',
		},
		{
			title: '账号密码',
			slot: 'password',
		},
	]

	async init() {
		let res = await childList()
		res = res.map(v => {
			v.isSecretKeyShow = false
			return v
		})
		this.loaded = true
		this.tableData = res
	}
}
</script>
<style lang="scss" scoped>
.content {
	position: relative;
	min-width: 290px;
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
</style>
