import request from './request'

export function screenShareUse(data) {
	return request({
		url: '/screenShare/use',
		method: 'post',
		data,
	})
}

export function screenShareLogin(data) {
	return request({
		url: '/screenShare/login',
		method: 'post',
		data,
	})
}

export function screenShareUpdate(data) {
	return request({
		url: '/screenShare/update',
		method: 'post',
		data,
	})
}

export function screenShareDetail(data) {
	return request({
		url: '/screenShare/detail',
		method: 'post',
		data,
	})
}
