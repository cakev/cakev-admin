import { Message } from 'view-design'
import axios from 'axios'

const request = axios.create()
const baseURL = '/api'

request.defaults.baseURL = baseURL
request.defaults.timeout = 30000
request.interceptors.request.use(
	function (config) {
		return config
	},
	function (error) {
		return Promise.reject(error)
	},
)

/**
 * @description
 * {
 *   data: '数据',
 *   code: 200,
 *   success: true
 *   msg：'错误信息'
 * }
 */
request.interceptors.response.use(
	response => {
		const { data } = response
		if (data.code === 401) {
			location.href =
				location.origin + '#/login?redirect_url=' + encodeURIComponent(location.hash.replace('#', ''))
		} else if (data.code !== 200) {
			Message.error(data['msg'] || '网络异常，请重试')
			throw new Error(data['msg'] || '网络异常，请重试')
		}
		if (!data.success) {
			Message.error(data['msg'] || '网络异常，请重试')
			throw new Error(data['msg'] || '网络异常，请重试')
		}
		return data.data
	},
	function (e) {
		return false
	},
)

export default request
