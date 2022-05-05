import request, { headers } from './request'

export function createLink(data) {
	return request({
		url: '/link/create',
		method: 'post',
		headers,
		data,
	})
}

export function updateLink(data) {
	return request({
		url: '/link/update',
		method: 'post',
		headers,
		data,
	})
}

export function destroyLink(data) {
	return request({
		url: '/link/destroy',
		method: 'post',
		headers,
		data,
	})
}

export function getLinkDetail(data) {
	return request({
		url: '/link/detail',
		method: 'post',
		headers,
		data,
	})
}

export function getLinkList(data) {
	return request({
		url: '/link/list',
		method: 'post',
		headers,
		data,
	})
}
