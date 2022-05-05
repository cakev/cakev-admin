<template lang="pug">
.login-container.fn-flex
	.login-card.fn-flex
		.login-card-logo.pos-r.fn-flex
			.login-card-logo-img.pos-a
			.login-card-logo-mask.pos-a
			h2.pos-r CakeV
		Form.login-card-content(@keydown.native.enter.prevent="login")
			FormItem
				i-input(prefix="md-contact", placeholder="用户名", v-model="userName")
			FormItem
				i-input(
					prefix="md-lock",
					placeholder="密码",
					v-model="password",
					@keyup.enter="login",
					type="password")
			FormItem
				i-button(type="primary", shape="circle", :long="true", @click="login") 登录
</template>
<script lang="ts">
import { Input, Button, Icon, Form, FormItem } from 'view-design'
import common from '../../store/common.store.js'
import { login } from '@/api/user.api.js'

export default {
	name: 'login',
	components: {
		'i-input': Input,
		'i-button': Button,
		'i-icon': Icon,
		Form,
		FormItem,
	},
	data() {
		return {
			userName: '',
			password: '',
		}
	},
	methods: {
		async login() {
			if (!this.userName || !this.password) return
			const res = await login({
				userName: this.userName,
				password: this.password,
			})
			common.actions.setUser(res)
			localStorage.setItem('cakev-login', 'true')
			this.$router.replace('/')
		},
	},
}
</script>
<style lang="scss" scoped>
@import '../../scss/conf';

.login-container {
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
}

.login-card {
	width: 720px;
	height: 380px;
	box-shadow: 0 10px 30px 0 $themeColor_01;
}

.login-card-logo {
	align-items: center;
	justify-content: center;
	width: 450px;

	.login-card-logo-img {
		background-image: url('../../assets/login/login-bg.jpg');
		background-position: center;
		background-size: cover;
	}

	.login-card-logo-img,
	.login-card-logo-mask {
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}

	.login-card-logo-mask {
		background-color: $themeColor_03;
	}

	h2 {
		font-size: 40px;
		color: #fff;
	}
}

.login-card-content {
	width: 270px;
	padding: 91px 30px 0 30px;
	background-color: #fff;

	li {
		margin-bottom: 34px;
	}
}
</style>
