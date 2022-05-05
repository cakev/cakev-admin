<template lang="pug">
div
	.search.fn-flex.flex-row
		i-input(
			v-model="query.componentTitle",
			placeholder="组件标题",
			style="width: 200px",
			size="small",
			clearable)
		i-select(
			:style="{ width: '100px', marginLeft: '10px' }",
			v-model="query.componentTypeId",
			placeholder="组件分类",
			size="small",
			clearable)
			i-option(
				v-for="item in typeList",
				:value="item.componentTypeId",
				:key="item.componentTypeId") {{ item.componentTypeName }}
		i-button(
			icon="ios-search",
			size="small",
			style="margin-left: 15px",
			@click="search")
	i-table(
		:border="true",
		size="small",
		row-key="componentId",
		:columns="columns",
		@on-sort-change="sortChange",
		:data="list",
		v-if="total > 0")
		template(#componentAvatar="{ row }")
			.component-avatar(v-viewer)
				img(:src="row.componentAvatar")
		template(#createTime="{ row }")
			span {{ row.createTime ? $format(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss') : '' }}
		template(#action="{ row }")
			a.mr10(@click="handleEdit(row)") 编辑
			a.mr10(@click="handleVersion(row)") 切换版本
			a(@click="handleRemove(row)") 删除
	e-page(@init="init", :total="total", ref="page", :loaded="loaded")
	i-modal(v-model="dialogEditVersionShow", title="切换版本")
		i-select(v-model="currentItem.componentVersion")
			i-option(
				:value="k.componentVersion",
				v-for="(k, i) in versionList",
				:key="i") {{ k.componentVersion }}
		div(slot="footer")
			i-button(type="primary", @click="submitVersion") 确定
	i-modal.market-edit-modal(v-model="dialogEditShow", title="编辑")
		i-form(:label-width="100")
			i-form-item(label="组件名")
				i-input(v-model="currentItem.componentTitle")
			i-form-item(label="组件英文名")
				span {{ currentItem.componentEnTitle }}
			i-form-item(label="当前版本号")
				span {{ currentItem.componentVersion }}
			i-form-item(label="组件类型")
				i-select(v-model="currentItem.componentType", clearable)
					i-option(value="BASICS") 基础
					i-option(value="ANTV") 图表antv
					i-option(value="ECHARTS") 图表Echarts
					i-option(value="MAP") 地图
			i-form-item(label="排序")
				i-input(v-model="currentItem.sort", number)
			i-form-item(label="类型")
				tree-select(
					v-model="currentItem.componentTypeId",
					:options="typeList",
					:normalizer="normalizer",
					:load-options="loadOptions")
					label(slot="value-label", slot-scope="{ node }") {{ node.raw.componentTypeName || currentItem.componentTypeName }}
			i-form-item(label="缩略图")
				.img-wrap
					d-upload(v-model="currentItem.componentAvatar", :data="formData")
		div(slot="footer")
			i-button(type="primary", @click="submitEdit") 确定
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { Table, Button, Input, Option, Select, Modal, FormItem, Form } from 'view-design'
import { destroy, getVersionList, list, update } from '@/api/marketComponent.api.js'
import { levelList } from '@/api/marketComponentType.api'
import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'
import TreeSelect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import dUpload from '../../components/d-upload/index.vue'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer)

@Component({
	components: {
		'i-form': Form,
		'i-form-item': FormItem,
		'i-modal': Modal,
		'i-table': Table,
		'i-button': Button,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
		TreeSelect,
		dUpload,
	},
})
export default class MarketComponentList extends Vue {
	list = []
	typeList = []
	versionList: any = []
	total = 0
	orderKey = ''
	orderType = ''
	loaded = false
	dialogEditShow = false
	dialogEditVersionShow = false
	currentItem: any = {}
	query: any = {
		componentTitle: '',
		componentTypeId: '',
	}
	columns = [
		{
			title: '组件名称',
			key: 'componentTitle',
			sortable: 'custom',
		},
		{
			title: '缩略图',
			slot: 'componentAvatar',
		},
		{
			title: '组件版本号',
			key: 'componentVersion',
		},
		{
			title: '分类名称',
			key: 'componentTypeName',
		},
		{
			title: '创建时间',
			key: 'createTime',
			slot: 'createTime',
			sortable: 'custom',
		},
		{
			title: '操作',
			slot: 'action',
		},
	]
	loadOptions({ action, parentNode, callback }): void {
		if (action === LOAD_CHILDREN_OPTIONS) {
			levelList({
				componentTypeParentId: parentNode.componentTypeId,
			}).then(r => {
				parentNode.children = r
				callback()
			})
		}
	}

	normalizer(node) {
		return {
			id: node.componentTypeId,
			label: node.componentTypeName,
			children: node.children,
		}
	}

	get formData() {
		return {
			library: `componentStatic/${this.currentItem.componentType}/${this.currentItem.componentVersion}`,
		}
	}

	sortChange(obj): void {
		this.orderKey = obj.key
		this.orderType = obj.order
		;(this.$refs.page as any).reload()
	}

	search(): void {
		this.init({
			pageSize: 10,
			pageNum: 1,
		})
	}

	handleVersion(row): void {
		this.dialogEditVersionShow = true
		this.currentItem = row
		getVersionList({
			componentEnTitle: row.componentEnTitle,
		}).then(r => {
			this.versionList = r
		})
	}

	handleEdit(row): void {
		this.dialogEditShow = true
		this.currentItem = row
	}

	submitEdit(): void {
		update({
			componentId: this.currentItem.componentId,
			sort: this.currentItem.sort,
			componentAvatar: this.currentItem.componentAvatar,
			componentTitle: this.currentItem.componentTitle,
			componentTypeId: this.currentItem.componentTypeId,
			componentChart: this.currentItem.componentChart,
			componentChartType: this.currentItem.componentChartType,
		}).then(() => {
			this.dialogEditShow = false
			this.$Message.success('更新成功')
			;(this.$refs.page as any).reload()
		})
	}

	submitVersion(): void {
		update({
			componentEnTitle: this.currentItem.componentEnTitle,
			componentVersion: this.currentItem.componentVersion,
		}).then(() => {
			this.dialogEditVersionShow = false
			this.$Message.success('更新成功')
			;(this.$refs.page as any).reload()
		})
	}

	async init({ pageNum, pageSize }) {
		const data = {
			pageNum,
			pageSize,
			status: 'SUCCESS',
			isCurrentVersion: true,
			...this.query,
			orderKey: this.orderKey,
			orderType: this.orderType,
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
	}

	handleRemove(row): void {
		this.$Modal.confirm({
			title: '提示',
			content: '确认删除吗？',
			loading: true,
			onOk: async () => {
				await destroy({
					componentId: row.componentId,
					componentEnTitle: row.componentEnTitle,
				})
				this.$Message.success('删除成功')
				this.$Modal.remove()
				;(this.$refs.page as any).reload()
			},
		})
	}

	reload(): void {
		;(this.$refs.page as any).reload()
	}

	mounted(): void {
		levelList().then(r => {
			r.forEach(v => {
				v.children = null
			})
			this.typeList = r
		})
	}
}
</script>
<style lang="scss" scoped>
.component-avatar {
	img {
		width: 64px;
		height: 64px;
		object-fit: contain;
	}
}
.list-item-card-box {
	grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
	padding-right: 0;
}
/deep/ {
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

.search {
	align-items: center;
	margin-bottom: 10px;
	&::v-deep {
		.ivu-input,
		.ivu-select-selected-value,
		.ivu-select-placeholder {
			font-size: 12px;
		}
	}
}
</style>
