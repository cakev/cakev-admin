import request, { headers, requestNoBaseURL } from './request'

export function list(data) {
	return request({
		url: '/screen/list',
		method: 'post',
		headers,
		data,
	})
}

export function destroy(data) {
	return request({
		url: '/screen/destroy',
		method: 'post',
		headers,
		data,
	})
}

export function create(data) {
	return request({
		url: '/screen/create',
		method: 'post',
		data,
		headers,
	})
}

export function detail(data) {
	return request({
		url: '/screen/detail',
		method: 'post',
		data,
		headers,
	})
}

export function update(data) {
	return request({
		url: '/screen/update',
		method: 'post',
		data: data,
		headers,
	})
}

export function detailFile(url) {
	return requestNoBaseURL({
		url,
		method: 'get',
		headers,
		dataType: 'json',
	})
}
