<template lang="pug">
e-card
	empty-image.list-item-card-avatar.pos-r.pointer(:image="screenAvatar", @click="handleEdit")
		.list-item-card-mask.fn-flex.flex-row.pos-a
			i-tooltip(content="删除")
				i-icon.pointer(type="md-trash", color="#fff", :size="16", @click="handleRemove", @click.stop)
	template(slot="content")
		h2.list-item-card-title.ellipsis {{ screenName }}
		.list-item-card-btn.fn-flex.flex-row
			span.list-item-card-btn-time {{ createTime }}
			.list-item-card-btn-link.pointer(@click="handleLink")
				i-icon(type="md-laptop", :style="{ marginLeft: 'auto' }")
				span 预览
</template>
<script lang="ts">
import { Button, Icon, Modal, Input, Tooltip } from 'view-design'
import EmptyImage from '../../components/empty-image/index.vue'
import { destroy } from '@/api/screen.api'

export default {
	name: 'item-card',
	components: {
		'i-button': Button,
		'i-icon': Icon,
		EmptyImage,
		'i-modal': Modal,
		'i-input': Input,
		'i-tooltip': Tooltip,
	},
	props: {
		screenAvatar: {
			type: String,
		},
		screenId: {
			type: String,
		},
		screenPublish: {
			type: String,
		},
		screenName: {
			type: String,
		},
		createTime: {
			type: String,
		},
		screenMainScene: {
			type: [String, Number],
		},
		screenConfig: {
			type: Object,
		},
	},
	computed: {
		statusStr() {
			return this.screenPublish === 'COMPLETE' ? '已发布' : '未发布'
		},
	},
	methods: {
		handleEdit(): void {
			this.$router.push(`/screen/editor/${this.screenId}`)
		},
		handleLink(): void {
			window.open(`${location.origin}/screen/detail/${this.screenId}`)
		},
		handleRemove(): void {
			this.$Modal.confirm({
				title: '提示',
				content: '确认删除吗？',
				loading: true,
				onOk: () => {
					destroy({ screenId: this.screenId }).then(() => {
						this.$Message.success('删除成功')
						this.$Modal.remove()
						this.$emit('reload')
					})
				},
			})
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../scss/conf';
.list-item-card-btn-link {
	margin-left: auto;
	color: #666;
	span {
		margin-left: 4px;
	}

	&:hover {
		color: $themeColor;
	}
}

.list-item-card-btn {
	align-items: center;
	margin-top: 10px;
}

.list-item-card-mask {
	top: -40px;
	left: 0;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 40px;
	padding: 0 8px;
	background-color: rgba(0, 0, 0, 0.8);
	transition: all 0.3s;
}

.list-item-card-avatar {
	padding-bottom: 50%;

	&:hover {
		.list-item-card-mask {
			top: 0;
		}
	}
}
.list-item-card-btn-time {
	color: #666;
}
.list-item-card-title {
	padding-bottom: 10px;
	font-size: 14px;
	font-weight: normal;
	line-height: 14px;
	color: rgb(51, 51, 51);
	border-bottom: 1px solid rgba(216, 216, 216, 0.37);
}
</style>
