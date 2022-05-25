import { WidgetTask } from '@cakev/sdk'

export default new WidgetTask({
	widgetLayout: {
		width: 500,
		height: 500,
	},
	widgetApi: {
		data: JSON.stringify([
			{ name: 'London', 月份: 'Jan.', 月均降雨量: 18.9 },
			{ name: 'London', 月份: 'Feb.', 月均降雨量: 28.8 },
			{ name: 'London', 月份: 'Mar.', 月均降雨量: 39.3 },
			{ name: 'London', 月份: 'Apr.', 月均降雨量: 81.4 },
			{ name: 'London', 月份: 'May', 月均降雨量: 47 },
			{ name: 'London', 月份: 'Jun.', 月均降雨量: 20.3 },
			{ name: 'London', 月份: 'Jul.', 月均降雨量: 24 },
			{ name: 'London', 月份: 'Aug.', 月均降雨量: 35.6 },
			{ name: 'Berlin', 月份: 'Jan.', 月均降雨量: 12.4 },
			{ name: 'Berlin', 月份: 'Feb.', 月均降雨量: 23.2 },
			{ name: 'Berlin', 月份: 'Mar.', 月均降雨量: 34.5 },
			{ name: 'Berlin', 月份: 'Apr.', 月均降雨量: 99.7 },
			{ name: 'Berlin', 月份: 'May', 月均降雨量: 52.6 },
			{ name: 'Berlin', 月份: 'Jun.', 月均降雨量: 35.5 },
			{ name: 'Berlin', 月份: 'Jul.', 月均降雨量: 37.4 },
			{ name: 'Berlin', 月份: 'Aug.', 月均降雨量: 42.4 },
		]),
	},
	widgetBase: {
		name: '柱形图',
	},
	widgetTypeId: '示例一',
	widgetIs: 'hello-column',
	widgetAvatar: require('./snapshot.gif'),
})
