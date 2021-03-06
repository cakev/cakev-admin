import request from './request'
import { Editor } from '@cakev/sdk'
const editor = Editor.Instance()

export function create(data) {
	return request({
		url: '/market/componentType/create',
		method: 'post',
		data,
	})
}

export function update(data) {
	return request({
		url: '/market/componentType/update',
		method: 'post',
		data,
	})
}

export function destroy(data) {
	return request({
		url: '/market/componentType/destroy',
		method: 'post',
		data,
	})
}

export function levelList(data) {
	return request({
		url: '/market/componentType/levelList',
		method: 'post',
		data,
	})
}

export function level(data) {
	return request({
		url: '/market/componentType/level',
		method: 'post',
		data,
	})
}

export async function market() {
	const level0 = await level()
	const widgetsObject = {}
	for (const item of level0) {
		const array = await level({
			componentTypeParentId: item.componentTypeId,
		})
		if (array.length > 0) {
			widgetsObject[item.componentTypeId] = {
				...item,
				market: true,
				children: [],
			}
		}
		array.forEach(child => {
			widgetsObject[item.componentTypeId].children.push({
				...child,
				market: true,
			})
		})
		editor.setLocalWidgets(widgetsObject)
	}
}
