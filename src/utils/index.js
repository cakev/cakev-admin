import { Message } from 'view-design'
import Clipboard from 'clipboard'

/**
 *
 * @param hex 例如:"#23ff45"
 * @param opacity 透明度
 * @returns {string}
 */
export function hexToRgba(hex, opacity) {
	return (
		'rgba(' +
		parseInt('0x' + hex.slice(1, 3)) +
		',' +
		parseInt('0x' + hex.slice(3, 5)) +
		',' +
		parseInt('0x' + hex.slice(5, 7)) +
		',' +
		opacity +
		')'
	)
}

/**
 * @description 向上查找 components
 */
export function findComponentUpward(context, componentName, componentNames) {
	if (typeof componentName === 'string') {
		componentNames = [componentName]
	} else {
		componentNames = componentName
	}

	let parent = context.$parent
	let name = parent.$options.name
	while (parent && (!name || componentNames.indexOf(name) < 0)) {
		parent = parent.$parent
		if (parent) name = parent.$options.name
	}
	return parent
}

/**
 * @description 向下查找 components
 */
export function findComponentsDownward(context, componentName) {
	return context.$children.reduce((components, child) => {
		if (child.$options.name === componentName) components.push(child)
		const foundChilds = findComponentsDownward(child, componentName)
		return components.concat(foundChilds)
	}, [])
}

/**
 * @description 加载三方包
 */
export function loadJs(src, value) {
	if (!src) {
		return
	}
	if (typeof src === 'string') {
		return new Promise(resolve => {
			if (window[value]) {
				resolve()
			} else {
				const el = document.createElement('script')
				el.src = src
				el.onload = () => {
					resolve()
				}
				document.head.appendChild(el)
			}
		})
	} else {
		const p = []
		src.forEach((item, index) => {
			p.push(
				new Promise(resolve => {
					if (window[value[index]]) {
						resolve()
					} else {
						const el = document.createElement('script')
						el.src = item
						el.onload = () => {
							resolve()
						}
						document.head.appendChild(el)
					}
				}),
			)
		})
		return Promise.all(p)
	}
}

/**
 * @description 拷贝插件 kay
 */
export function copyText(text, success, error) {
	const oCopyBtn = document.createElement('button')
	oCopyBtn.setAttribute('id', 'copy-btn')
	oCopyBtn.setAttribute('data-clipboard-text', text)
	document.body.appendChild(oCopyBtn)
	const clipboard = new Clipboard('#copy-btn')
	clipboard.on('success', e => {
		typeof success === 'function' && success(e)
		Message.success('复制成功！')
		clipboard.destroy()
		document.body.removeChild(oCopyBtn)
	})
	clipboard.on('error', e => {
		typeof error === 'function' && error(e)
		Message.error('复制失败！')
		clipboard.destroy()
		document.body.removeChild(oCopyBtn)
	})
	oCopyBtn.click()
}

const types = {
	json: 'application/json',
	txt: 'text/plain',
	html: 'text/html',
	js: 'application/javascript',
	png: 'image/png',
	jpg: 'image/jpeg',
}

/**
 * 文件下载函数
 * @author ferrinweb
 * @param {*} data 导出内容，可以是文本、对象、文件
 * @param {String} filename 文件名
 * @param {String} type 文件后缀
 */
export function downloadFile(data, filename, type) {
	let blob
	if (typeof data === 'string') {
		blob = new Blob([data], { type: types[type] })
	} else {
		if (data instanceof Blob || data instanceof File) {
			blob = data
		} else {
			blob = new Blob([JSON.stringify(data, null, 2)], {
				type: types[type],
			})
		}
	}
	const link = document.createElement('a')
	const url = URL.createObjectURL(blob)
	link.download = filename
	link.href = url
	link.click()
	URL.revokeObjectURL(url)
}
