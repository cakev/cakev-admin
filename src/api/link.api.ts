import request from './request'

export function createLink(data) {
	return request({
		url: '/link/create',
		method: 'post',
		data,
	})
}

export function updateLink(data) {
	return request({
		url: '/link/update',
		method: 'post',
		data,
	})
}

export function destroyLink(data) {
	return request({
		url: '/link/destroy',
		method: 'post',
		data,
	})
}

export function getLinkDetail(data) {
	return request({
		url: '/link/detail',
		method: 'post',
		data,
	})
}

export function getLinkList(data) {
	return request({
		url: '/link/list',
		method: 'post',
		data,
	})
}
