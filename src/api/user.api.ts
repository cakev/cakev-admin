import request from './request'

// 登陆
export function login(data) {
	return request({
		url: '/user/login',
		method: 'post',
		data,
	})
}

// 登出
export function logout() {
	return request({
		url: '/user/logout',
		method: 'post',
	})
}

// 个人信息详情
export function detail() {
	return request({
		url: '/user/detail',
		method: 'post',
	})
}

// 获取子账号列表
export function childList() {
	return request({
		url: '/user/child/all',
		method: 'post',
	})
}
