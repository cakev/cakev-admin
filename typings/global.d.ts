export {}
declare global {
	interface Window {
		echarts: any
		cakeVEditorInstance: any
		cakeV: any
	}
	export class MyMouseEvent extends MouseEvent {
		readonly layerX: number
		readonly layerY: number
	}
}
