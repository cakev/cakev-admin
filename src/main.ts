import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Message, Modal } from 'view-design'
import eLayout from './components/e-layout/index.vue'
import eCard from './components/e-card/index.vue'
import eHeader from './components/e-header/index.vue'
import ePage from './components/e-page/index.vue'
import CakeUi from '@cakev/ui'
import CakeSdk, { Editor } from '@cakev/sdk'
import 'view-design/dist/styles/iview.css'
import '@cakev/ui/dist/ui.css'
import '@cakev/sdk/dist/sdk.css'
import './widget-business'

Vue.use(CakeUi)
Vue.use(CakeSdk)
const editor = Editor.Instance()
editor.config.setConfig({
	backUrl: '/screen',
	api: {
		saveUrl: '/api/screen/update',
	},
})
Vue.component('e-layout', eLayout)
Vue.component('e-card', eCard)
Vue.component('e-header', eHeader)
Vue.component('e-page', ePage)

Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App),
}).$mount('#app')
