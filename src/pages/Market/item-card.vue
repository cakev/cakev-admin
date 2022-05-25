<template lang="pug">
e-card(:style="{ borderRadius: '3px 3px 0 0' }")
	empty-image.avatar(:image="currentItem.componentAvatar", background-size="contain")
		.pos-a(:style="{ top: '-2px' }")
	template(slot="content")
		.fn-flex
			h2.ellipsis {{ currentItem.componentTitle }}
		.fn-flex
			i-tag(color="blue", v-if="currentItem.componentTypeName") {{ currentItem.componentTypeName }}
			span(v-else, :style="{ height: '22px', margin: '2px 4px 2px 0' }")
		.fn-flex.flex-row.list-item-card-time-box
			p {{ currentItem.createTime }}
			span(:style="{ marginLeft: 'auto' }") V{{ currentItem.componentVersion }}
	.pos-a.list-item-card-mask.fn-flex.flex-row
		i-tooltip(content="编辑组件", placement="top")
			i-icon.pointer(type="md-create", color="#fff", @click="handleEdit", @click.stop)
		i-tooltip(content="切换版本", placement="top")
			i-icon.pointer(type="md-shirt", color="#fff", @click="handleVersion", :style="{ marginLeft: '10px' }", @click.stop)
		i-tooltip(content="删除组件", placement="top")
			i-icon.pointer(type="md-trash", color="#fff", @click="handleRemove", :style="{ marginLeft: '10px' }", @click.stop)
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
				//tree-select(
				//	v-model="currentItem.componentTypeId",
				//	:options="componentTypeList",
				//	:normalizer="normalizer",
				//	:load-options="loadOptions")
				//	label(slot="value-label", slot-scope="{ node }") {{ node.raw.componentTypeName || currentItem.componentTypeName }}
			i-form-item(label="缩略图")
				.img-wrap
					c-upload-img(v-model="currentItem.componentAvatar")
		div(slot="footer")
			i-button(type="primary", @click="submitEdit") 确定
	i-modal(v-model="dialogEditVersionShow", title="切换版本")
		i-select(v-model="currentItem.componentVersion")
			i-option(:value="k.componentVersion", v-for="(k, i) in versionList", :key="i") {{ k.componentVersion }}
		div(slot="footer")
			i-button(type="primary", @click="submitVersion") 确定
</template>
<script lang="ts">
import { Card, Button, Modal, Form, FormItem, Input, Select, Option, Switch, Tag, Icon, Tooltip } from 'view-design'
import EmptyImage from '../../components/empty-image/index.vue'
import { levelList } from '@/api/marketComponentType.api'
import { update, getVersionList, destroy } from '@/api/marketComponent.api'

export default {
	components: {
		'i-card': Card,
		'i-tooltip': Tooltip,
		'i-icon': Icon,
		'i-tag': Tag,
		'i-button': Button,
		'i-modal': Modal,
		'i-form': Form,
		'i-form-item': FormItem,
		'i-input': Input,
		'i-select': Select,
		'i-option': Option,
		'i-switch': Switch,
		EmptyImage,
	},
	props: {
		item: {
			type: Object,
		},
	},
	data() {
		return {
			dialogEditShow: false,
			dialogEditVersionShow: false,
			componentTypeList: [],
			versionList: [],
		}
	},
	computed: {
		currentItem: {
			get() {
				return this.item
			},
			set(val) {
				this.$emit('update:item', val)
			},
		},
	},
	methods: {
		// loadOptions({ action, parentNode, callback }): void {
		// 	if (action === LOAD_CHILDREN_OPTIONS) {
		// 		levelList({
		// 			componentTypeParentId: parentNode.componentTypeId,
		// 		}).then(r => {
		// 			parentNode.children = r
		// 			callback()
		// 		})
		// 	}
		// },

		normalizer(node) {
			return {
				id: node.componentTypeId,
				label: node.componentTypeName,
				children: node.children,
			}
		},

		submitVersion(): void {
			update({
				componentEnTitle: this.currentItem.componentEnTitle,
				componentVersion: this.currentItem.componentVersion,
			}).then(() => {
				this.dialogEditVersionShow = false
				this.$Message.success('更新成功')
				this.$emit('reload')
			})
		},

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
				this.$emit('reload')
			})
		},

		handleEdit(): void {
			this.dialogEditShow = true
			levelList().then(r => {
				r.forEach(v => {
					v.children = null
				})
				this.componentTypeList = r
			})
		},

		handleVersion(): void {
			this.dialogEditVersionShow = true
			getVersionList({
				componentEnTitle: this.currentItem.componentEnTitle,
			}).then(r => {
				this.versionList = r
			})
		},

		handleRemove(): void {
			this.$Modal.confirm({
				title: '提示',
				content: '确认删除吗？',
				loading: true,
				onOk: async () => {
					await destroy({
						componentId: this.currentItem.componentId,
						componentEnTitle: this.currentItem.componentEnTitle,
					})
					this.$Message.success('删除成功')
					this.$Modal.remove()
					this.$emit('reload')
				},
			})
		},
	},
}
</script>
<style lang="scss">
.market-edit-modal {
	.img-wrap {
		img {
			max-width: 100%;
			max-height: 100%;
		}
	}
}
</style>
<style lang="scss" scoped>
.list-item-card {
	&::v-deep {
		.ivu-icon {
			font-size: 16px;
		}
		.ivu-tag {
			span {
				word-break: break-all;
				white-space: nowrap;
			}
		}
	}

	&:hover {
		.list-item-card-mask {
			bottom: 0;
		}
	}

	.list-item-card-mask {
		bottom: -103px;
		left: 0;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 103px;
		padding: 0 8px;
		background-color: rgba(0, 0, 0, 0.8);
		transition: all 0.3s;
	}

	.list-item-card-time-box {
		padding-top: 10px;
		margin-top: 10px;
		font-size: 12px;
		line-height: 12px;
		color: #999;
		border-top: 1px solid rgba(216, 216, 216, 0.37);
	}

	.avatar {
		padding-bottom: 50%;
		background-color: #000;
	}

	h2 {
		padding-bottom: 10px;
		font-size: 14px;
		font-weight: normal;
		line-height: 14px;
	}
}
</style>
