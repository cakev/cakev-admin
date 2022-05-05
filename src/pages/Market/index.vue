<template lang="pug">
e-layout.market-container(:padding="false")
	.fn-flex.flex-row
		ul.market-left
			li.pointer(
				v-for="(item, index) in list",
				@click="select(index)",
				:key="item.title",
				:class="{ active: index === selectIndex }") {{ item.title }}
		component(
			:is="currentComponent",
			:style="{ flex: 1, paddingTop: '20px', paddingLeft: '20px' }")
</template>
<script lang="ts">
export default {
	data() {
		return {
			currentComponent: null,
			selectIndex: 0,
			list: [
				{
					title: '我的组件',
					component: () => import('./myComponent.vue'),
				},
				{
					title: '组件审核',
					component: () => import('./checkMyComponent.vue'),
				},
				{
					title: '审核历史',
					component: () => import('./checkHistory.vue'),
				},
				{
					title: '组件分类',
					component: () => import('./myComponentType.vue'),
				},
				{
					title: '我的收藏',
					component: () => import('./collectionComponent.vue'),
				},
				{
					title: '收藏分类',
					component: () => import('./collectionComponentType.vue'),
				},
				{
					title: '回收站',
					component: () => import('./recycleComponent.vue'),
				},
			],
		}
	},
	methods: {
		async select(index: number) {
			this.selectIndex = index
			this.currentComponent = this.list[index].component
		},
	},
	mounted(): void {
		this.select(this.selectIndex)
	},
}
</script>
<style lang="scss" scoped>
.market-container {
	&::v-deep {
		.e-layout-content {
			padding: 0 20px 20px 0;
		}
	}
}
.market-left {
	width: 200px;
	min-width: 200px;
	min-height: calc(100vh - 50px);
	background: #fff;
	box-shadow: 2px 0 4px 0 rgba(0, 0, 0, 0.08);
	li {
		height: 48px;
		padding: 0 16px;
		font-size: 14px;
		line-height: 48px;
		color: #666;
		&.active {
			color: var(--themeColor);
			background-color: #f2f9ff;
			border-left: 3px solid var(--themeColor);
		}
	}
}
</style>
