import request, { headers } from './request'

export function list(data) {
	return request({
		url: '/backupsScreen/list',
		method: 'post',
		headers,
		data,
	})
}

export function reduce(data) {
	return request({
		url: '/backupsScreen/reduce',
		method: 'post',
		headers,
		data,
	})
}
