import request, { headers } from './request'

export function list(data) {
	return request({
		url: '/collection/component/list',
		method: 'post',
		data,
		headers,
	})
}

export function create(data) {
	return request({
		url: '/collection/component/create',
		method: 'post',
		data,
		headers,
	})
}
