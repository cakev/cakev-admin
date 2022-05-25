import request from './request'

export function create(data) {
	return request({
		url: '/market/component/create',
		method: 'post',
		data,
	})
}

export function update(data) {
	return request({
		url: '/market/component/update',
		method: 'post',
		data,
	})
}

export function destroy(data) {
	return request({
		url: '/market/component/destroy',
		method: 'post',
		data,
	})
}

export function list(data) {
	return request({
		url: '/market/component/list',
		method: 'post',
		data,
	})
}

export function checkList(data) {
	return request({
		url: '/market/component/checkList',
		method: 'post',
		data,
	})
}

export function typeList(data) {
	return request({
		url: '/market/component/typeList',
		method: 'post',
		data,
	})
}

export function detail(data) {
	return request({
		url: '/market/component/detail',
		method: 'post',
		data,
	})
}

export function checkSuccess(data) {
	return request({
		url: '/market/component/checkSuccess',
		method: 'post',
		data,
	})
}

export function checkError(data) {
	return request({
		url: '/market/component/checkError',
		method: 'post',
		data,
	})
}

export function getVersionList(data) {
	return request({
		url: '/market/component/version',
		method: 'post',
		data,
	})
}

export function use(data) {
	return request({
		url: '/market/component/use',
		method: 'post',
		data,
	})
}

export function useList(data) {
	return request({
		url: '/market/component/useList',
		method: 'post',
		data,
	})
}

export function versionUpdateList(data) {
	return request({
		url: 'market/component/versionUpdateList',
		method: 'post',
		data,
	})
}
