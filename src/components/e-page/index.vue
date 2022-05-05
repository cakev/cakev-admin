<template lang="pug">
div
	slot(v-show="total > 0")
	i-page.e-page(
		:current.sync="pageNum",
		:total="total",
		v-show="total > 0",
		:show-elevator="show",
		:page-size="pageSize",
		:show-total="show",
		:class="{ 'fn-hide': !show }",
		@on-change="handleChange",
		@on-page-size-change="handlePageSize")
	.e-page-list-empty.fn-flex.flex-column(v-show="total <= 0 && loaded")
		i
		span 暂无数据
</template>
<script lang="ts">
import { Page } from 'view-design'

export default {
	name: 'e-page',
	components: {
		'i-page': Page,
	},
	props: {
		total: {
			type: Number,
			default: 0,
		},
		loaded: {
			type: Boolean,
			default: false,
		},
		show: {
			type: Boolean,
			default: true,
		},
		pageSize: {
			type: Number,
			default: 10,
		},
	},
	data() {
		return {
			pageNum: 1,
		}
	},
	methods: {
		handlePageSize(pageSize: number): void {
			this.pageSize = pageSize
			this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
		},

		handleChange(pageNum: number): void {
			this.pageNum = pageNum
			this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
		},

		reload(): void {
			this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
		},
	},
	mounted(): void {
		this.$emit('init', { pageSize: this.pageSize, pageNum: this.pageNum })
	},
}
</script>
<style lang="scss" scoped>
.e-page-list-empty {
	align-items: center;
	justify-content: center;
	i {
		width: 420px;
		height: 233px;
		margin: 20px 0;
		background-image: url('../../assets/e-page/empty.png');
		background-size: 420px 233px;
	}
	span {
		font-size: 16px;
		color: rgba(51, 51, 51, 0.85);
	}
}
.e-page {
	margin-top: 15px;
}
</style>
