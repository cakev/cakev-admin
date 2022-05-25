import request from './request'

// 登陆
export const login = data => {
	return request({
		url: '/user/login-by-cookie',
		method: 'post',
		data,
	})
}

// 登出
export const logout = () => {
	return request({
		url: '/user/logout-by-cookie',
		method: 'post',
	})
}

// 个人信息详情
export const detail = () => {
	return request({
		url: '/user/detail-by-cookie',
		method: 'post',
	})
}
