import request, { headers } from './request'

// 创建密钥
export function createSecretKey() {
	return request({
		url: '/secretKey/create',
		method: 'post',
		headers,
	})
}

// 当前用户所有密钥列表
export function getAllSecretKey() {
	return request({
		url: '/secretKey/all',
		method: 'post',
		headers,
	})
}

// 停用秘钥
export function stopSecretKey(data) {
	return request({
		url: '/secretKey/disabled',
		method: 'post',
		headers,
		data,
	})
}

// 启用秘钥
export function useSecretKey(data) {
	return request({
		url: '/secretKey/abled',
		method: 'post',
		headers,
		data,
	})
}
