import request, { headers } from './request'

export function create(data) {
	return request({
		url: '/collection/componentType/create',
		method: 'post',
		data,
		headers,
	})
}

export function update(data) {
	return request({
		url: '/collection/componentType/update',
		method: 'post',
		data,
		headers,
	})
}

export function destroy(data) {
	return request({
		url: '/collection/componentType/destroy',
		method: 'post',
		data,
		headers,
	})
}

export function levelList(data) {
	return request({
		url: '/collection/componentType/levelList',
		method: 'post',
		data,
		headers,
	})
}
