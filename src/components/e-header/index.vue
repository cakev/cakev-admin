<template lang="pug">
.e-header.pos-f.fn-flex.flex-row
	h1 cakev
	ul.fn-flex.flex-row.e-header-nav
		li.pointer.pos-r(
			:class="{ active: item.url === common.navIndex }",
			@click="handleLink(item.url, item.title)",
			v-for="item in list",
			:key="item.title") {{ item.title }}
	i-button(type="primary", v-if="!common.user", @click="handleLogin") 登录
	img.circle.e-header-user-avatar(:src="userAvatar", v-if="common.user")
	i-drop-down.e-header-user(@on-click="handleUser", v-if="common.user")
		.pointer
			span.e-header-user-name {{ name }}
			i-icon(type="ios-arrow-down", color="#fff")
		i-drop-down-menu(slot="list")
			i-drop-down-item(name="child", v-if="!common.user.userIsChild")
				i-icon(type="md-people", :size="16", color="#333")
				span.e-header-user-item 子账号管理
			i-drop-down-item(name="secretKey")
				i-icon(type="md-lock", :size="16", color="#333")
				span.e-header-user-item 密钥管理
			i-drop-down-item(name="link")
				i-icon(type="ios-link", :size="16", color="#333")
				span.e-header-user-item 外链管理
			i-drop-down-item(name="logout")
				i-icon(type="md-log-out", :size="16", color="#333")
				span.e-header-user-item 退出登录
</template>
<script lang="ts">
import { Icon, Button, Dropdown, DropdownItem, DropdownMenu } from 'view-design'
import common from '../../store/common.store.js'
import { logout, detail } from '@/api/user.api.js'

export default {
	name: 'e-header',
	components: {
		'i-icon': Icon,
		'i-button': Button,
		'i-drop-down': Dropdown,
		'i-drop-down-item': DropdownItem,
		'i-drop-down-menu': DropdownMenu,
	},
	data() {
		return {
			common: common.state,
			userAvatar:
				'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAABTVBMVEUAAAD////////////////////////a7P////////////9lpf////////////////////////////////////////////////9lpP9mp/9mpP9mpf9mpf9lpP9mpf9lpP9lpf9lpP9mqP92s/9sqv+61/+rzP9lpP////9lpP//3saGXDD3za2QaUD+3cWw0P/1+f/928KKYTbT5f96sf/+/fuetd//59TSwsPXxL+gf1yZdlCUbUWpzP/8+vn/69z/4s382L3207j40bPwzLLRwK/Bq5S7oom2nIGrjW6NZDn4+/+cxf+TwP9xq/9tqf90qPf59/X49fP/9/D/9Ovy7un/8eXr49vd0cX31r3ty6/kwaXKt6PMqIe/mne8l3OigV5npv/j2c7YyrvTw7PoxqrLuaXeu57Tr5DDnnyniWmuh2KogVuhelKac0r4gQbmAAAAKHRSTlMA/seg+cMVB3NJ+/rw7N+zpnlwRkA+GQqjP+5x38fDwrN5RhkW8KBJ8MIH6wAAAsJJREFUSMeU00lrwlAUhuGYxDjgmKj5Cx85RGigmyguSh13LZSK1oHO8/9fVq0S7jmJxmf/cuFwPy2e69QNvVI2zXJFN+qOq6Vm2VkTCjNrW6nSZrWIGMVq82TayCJRtnE0bdVwVK2V3BZKOKFUSGrzGZyUycemOQOpGDnZWjpS0i3xrmyTa/62gTMY7FY4i3K1QgbS42DtB/7n8yWETCFqWyVwNw8d2gvvIJSi31ID1/cp0rmFUDu0DfHsmBQjSId/zrfQC4kZD/s9vpL9BsGMKIbfh+p/oVWo7ineKxTVbWvx7Q8pgXr1orWJbTAhJRhAYcecC11K0BEnc00wAXHB+2p3MyhMV3PA+cT8zj1vSUQTqBytDm5Niu7iwtv4JgqhqkdblNcOuj9fH/O2t3M1oZFYpg5uShuT1dv1NossaQqVrlXA9QIif+ZxM5/vtqKVIYyJFp40AFPWTAhPRC+ybYthmn+NltlOwkAUhqkmcNGIUTGWfVV7gHRJF9poI6XcsSYQjIk3vv9LGIpTSf+Zlu/6fOl0lnN+nuy8j2YcWUX5RkW+R19DRMVll1XEeePIUygrx0cFfJooT7B/Cxr28BL5Or6eyBTlDyi6ix8GMkH5AEUP8ZNEDijv4aSe4maASLhuB1IGa0PALv+X71kDRPapvZYgHhWT1ovstPPvgqvesqbPJQqZas5U5JGNG8TQbX8chaammWE09m3dwO2KqXDUDZE7TnCJNim9Ihqx1pqOeMz16MjaghGLw13S6cTW+3O3dEKXUsMdYoW0ogTXn899lxJWEosVgkCzpAyWLNDwo1RAmQT/UQpDnEU5WCzEYXxc2HmyvbgqCoJrQLm8lASR2fjJdevCsP6cp9ZeC0L6Srar9AtZVFtitVWFctA7Ms+UO6ByGdTbcsps1weFiyn1ukqzUZPlWqOpdHslftUvU57KNvh4/SEAAAAASUVORK5CYII=',
			index: '',
			list: [
				{
					url: '/editor/Manger',
					title: '大屏管理',
				},
				{
					url: '/market',
					title: '组件开发',
				},
				// {
				// 	url: '/help',
				// 	title: '帮助中心',
				// },
			],
		}
	},
	computed: {
		name() {
			if (this.common.user) {
				return this.common.user.nickName || this.common.user.userName
			} else {
				return ''
			}
		},
	},
	methods: {
		handleLogin(): void {
			this.$router.push('/login')
		},
		handleUser(name: string): void {
			switch (name) {
				case 'logout':
					common.actions.setUser(null)
					localStorage.removeItem('cakev-login')
					logout()
					this.$router.push('/login')
					break
				case 'child':
					this.$router.push('/userChild')
					break
				case 'secretKey':
					this.$router.push('/secretKey')
					break
				case 'link':
					this.$router.push('/link')
					break
			}
		},
		handleLink(url: string, title: string): void {
			common.actions.setNavIndex(url)
			document.title = title
			this.$router.push(url)
		},
	},
	mounted(): void {
		common.actions.setNavIndex(this.$route.path)
		detail()
			.then(res => {
				common.actions.setUser(res)
			})
			.catch(() => {
				common.state.user = null
				localStorage.removeItem('cakev-login')
				window.top.location.href = `${location.origin}/login`
			})
	},
}
</script>
<style lang="scss" scoped>
.e-header-user {
	height: 100%;
}
.e-header-user-item {
	margin-left: 10px;
}

.e-header-user-avatar {
	width: 30px;
	height: 30px;
}

.e-header-user-name {
	margin-right: 10px;
	margin-left: 8px;
	line-height: 50px;
	color: #fff;
}

.e-header-nav {
	height: 100%;
	margin-right: auto;

	li {
		height: 100%;
		padding: 0 14px;
		font-size: 14px;
		line-height: 50px;
		color: rgb(191, 191, 191);

		&:hover {
			background-color: rgb(48, 50, 62);
		}

		&.active {
			background-color: rgb(48, 50, 62);

			&::before {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 3px;
				content: '';
				background-color: var(--themeColor);
			}
		}
	}
}

.e-header {
	top: 0;
	left: 0;
	z-index: 8;
	align-items: center;
	width: 100%;
	height: 50px;
	padding: 0 20px;
	background-color: #22242b;

	h1 {
		width: 200px;
		font-size: 18px;
		color: #fff;
	}
}
</style>
