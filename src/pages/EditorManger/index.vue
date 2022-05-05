<template lang="pug">
e-layout(:padding="false")
	.search.fn-flex.flex-row
		i-input(
			v-model="query.screenName",
			placeholder="输入大屏名称搜索",
			style="width: 200px",
			size="small",
			:search="true",
			@on-search="search",
			clearable)
		i-button(type="primary", @click="handleNew", style="margin-left: auto") 新建
	e-page(
		@init="init",
		:total="total",
		ref="page",
		:loaded="loaded",
		:pageSize="999",
		:show="false")
		ul.list-item-card-box
			item-card(
				v-for="item in list",
				v-bind="item",
				:key="item.screenId",
				@reload="reload")
</template>
<script lang="ts">
import itemCard from './item-card.vue'
import { Page, Button, Input, DatePicker, Select, Option } from 'view-design'
import { list } from '@/api/screen.api.js'

export default {
	name: 'edit-manger',
	components: {
		itemCard,
		'i-page': Page,
		'i-button': Button,
		'i-input': Input,
		'i-date-picker': DatePicker,
		'i-select': Select,
		'i-option': Option,
	},
	data() {
		return {
			list: [],
			total: 0,
			loaded: false,
			query: {
				screenName: '',
			},
		}
	},
	methods: {
		handleNew(): void {
			this.$router.push('/editor/new')
		},

		reload(): void {
			;(this.$refs.page as any).reload()
		},

		search(): void {
			this.init({
				pageSize: 10,
				pageNum: 1,
			})
		},

		async init({ pageSize, pageNum }) {
			const data = {
				pageSize,
				pageNum,
				screenType: 'CUSTOM',
				...this.query,
			}
			const result = {}
			for (const key in data) {
				if (data[key]) {
					result[key] = data[key]
				}
			}
			const res = await list(result)
			this.loaded = true
			this.list = res.list
			this.total = res.count
		},
	},
}
</script>
<style lang="scss" scoped>
.search {
	align-items: center;
	&::v-deep {
		.ivu-input {
			font-size: 12px;
		}
	}
}
</style>
