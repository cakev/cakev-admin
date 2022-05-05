<template lang="pug">
e-layout.market-container(:padding="false")
	e-page(
		@init="init",
		:total="total",
		ref="page",
		:loaded="loaded",
		:pageSize="20")
		ul.list-item-card-box
			item-card(
				v-for="(item, i) in list",
				:item="item",
				:key="i",
				@reload="reload")
</template>
<script lang="ts">
import { Table, Button, Input, Option, Select } from 'view-design'
import itemCard from './item-card2.vue'
import { list } from '@/api/collectionComponent.api.js'
import { levelList } from '@/api/collectionComponentType.api'

export default {
	components: {
		'i-table': Table,
		'i-button': Button,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
		itemCard,
	},
	data() {
		return {
			list: [],
			typeList: [],
			total: 0,
			loaded: false,
			query: {
				componentTitle: '',
				componentTypeId: '',
			},
		}
	},
	methods: {
		search(): void {
			this.init({
				pageSize: 20,
				pageNum: 1,
			})
		},

		async init({ pageNum, pageSize }) {
			const data = {
				pageNum,
				pageSize,
				status: 'SUCCESS',
				isCurrentVersion: true,
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

		reload(): void {
			;(this.$refs.page as any).reload()
		},
	},
	mounted() {
		levelList().then(res => {
			this.typeList = res
		})
	},
}
</script>
<style lang="scss" scoped>
.market-container {
	.list-item-card-box {
		grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
		padding-right: 0;
	}
	&::v-deep {
		.viewer-canvas {
			background-color: rgba(0, 0, 0, 0.5);
		}
	}

	.avatar {
		width: 100px;
		height: 60px;
		vertical-align: middle;
	}

	.mr10 {
		margin-right: 10px;
	}

	.btn-box {
		margin-bottom: 10px;
	}
}
</style>
