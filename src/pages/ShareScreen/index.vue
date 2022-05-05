<template lang="pug">
.detail-container
	.pwd-container(v-if="maskShow")
		.pwd-box(v-if="shareType === 'PASSWORD'")
			.pwd-title 已打开密码保护，请输入密码
			.pwd-main
				i-input.pwd(v-model="pwd", type="password", style="margin-right: 10px")
				i-button(type="primary", @click="unlock") 确定
		.time(v-if="shareType === 'TIME'")
			template(v-if="!isOvertime")
				vue-countdown(
					:time="leftTime",
					v-slot="{ days, hours, minutes, seconds }",
					@end="timeEnd")
					.time-left 剩余：{{ `${days}天${hours}小时${minutes}分${seconds}秒` }}
				i-button(
					type="primary",
					@click="maskShow = false",
					style="margin-top: 10px") 点击进入
			template(v-else)
				span 分享时效已过，请联系你的分享者
	.preview-wrapper.fit-mode(
		v-if="!maskShow",
		:style="{ backgroundColor: editor.backgroundColor }")
		d-view
	d-detail(:show="false", ref="dDetail")
</template>
<script lang="ts">
import { dView, dDetail } from '@eslinkv/vue2'
import { Editor } from '@eslinkv/core'
import { Input, Button } from 'view-design'
import VueCountdown from '@chenfengyuan/vue-countdown'
import { screenShareLogin, screenShareUse } from '@/api/screenShare.api.js'

let shareInfo: any

export default {
	components: {
		'i-input': Input,
		'i-button': Button,
		VueCountdown,
		dView,
		dDetail,
	},
	data() {
		return {
			editor: Editor.Instance(),
			maskShow: true,
			isOvertime: false,
			pwd: '',
			shareType: '',
			leftTime: '',
		}
	},
	methods: {
		timeEnd() {
			this.isOvertime = true
		},

		async unlock() {
			if (!this.pwd) return
			const res = await screenShareLogin({
				screenId: this.$route.params.shareScreenId,
				screenSharePassword: this.pwd,
			})
			this.maskShow = false
			this.editor.init(res)
		},
	},
	async mounted() {
		shareInfo = await screenShareUse({
			screenId: this.$route.params.shareScreenId,
		})
		this.shareType = shareInfo.screenShareType
		if (this.shareType === 'ALL') {
			this.maskShow = false
			this.editor.init(shareInfo)
		}
		if (this.shareType === 'TIME') {
			this.leftTime = new Date(shareInfo.screenShareTime).getTime() - new Date().getTime()
			this.isOvertime = this.leftTime <= 0
			!this.isOvertime && this.editor.init(shareInfo)
		}
	},
}
</script>
<style lang="scss" scoped>
.detail-container {
	height: 100%;
}

.preview-wrapper {
	position: fixed;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: 99999;
	display: flex;

	&::-webkit-scrollbar {
		width: 0;
		height: 0;
	}

	#screen {
		position: relative;
		flex-grow: 0;
		flex-shrink: 0;
	}

	&.fit-mode {
		align-items: center;
		justify-content: center;
		overflow: hidden;
	}

	&.mobile {
		align-items: unset;
		overflow: auto;

		#screen {
			transform-origin: 0 0;
		}
	}

	.mobile-wrap {
		position: relative;
		width: 100%;
		overflow: hidden;
	}
}

.pwd-container {
	height: 100%;
	background: rgb(49, 50, 57);
	.pwd-box {
		width: 330px;
		padding-top: 100px;
		margin: 0 auto;
		.pwd-title {
			margin-bottom: 8px;
			font-size: 12px;
			color: #fff;
		}
		.pwd-main {
			display: flex;
			justify-content: space-between;
		}
	}
}

.time {
	padding-top: 100px;
	font-size: 18px;
	color: #fff;
	text-align: center;
}
</style>
