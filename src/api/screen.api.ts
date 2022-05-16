import request from './request'

export function list(data) {
	return request({
		url: '/screen/list',
		method: 'post',
		data,
	})
}

export function destroy(data) {
	return request({
		url: '/screen/destroy',
		method: 'post',
		data,
	})
}

export function create(data) {
	return request({
		url: '/screen/create',
		method: 'post',
		data,
	})
}

export function publish(data) {
	return request({
		url: '/screen/publish',
		method: 'post',
		data,
	})
}

export function detail(data) {
	return request({
		url: '/screen/detail',
		method: 'post',
		data,
	})
}

export function update(data) {
	return request({
		url: '/screen/update',
		method: 'post',
		data,
	})
}

export function linkList(data) {
	return request({
		url: '/screen/linkList',
		method: 'post',
		data,
	})
}
