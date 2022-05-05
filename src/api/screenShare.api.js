import request, { headers } from './request'

export function screenShareUse(data) {
	return request({
		url: '/screenShare/use',
		method: 'post',
		headers,
		data,
	})
}

export function screenShareLogin(data) {
	return request({
		url: '/screenShare/login',
		method: 'post',
		headers,
		data,
	})
}

export function screenShareUpdate(data) {
	return request({
		url: '/screenShare/update',
		method: 'post',
		data,
		headers,
	})
}

export function screenShareDetail(data) {
	return request({
		url: '/screenShare/detail',
		method: 'post',
		data,
		headers,
	})
}
