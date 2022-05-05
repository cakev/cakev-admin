import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { Message, Modal } from 'view-design'
import { format } from 'date-fns'
import '@eslinkv/core/lib/core.css'
import '@eslinkv/vue2/lib/v2.css'
import './scss/index.scss'
import eLayout from './components/e-layout/index.vue'
import eCard from './components/e-card/index.vue'
import eHeader from './components/e-header/index.vue'
import ePage from './components/e-page/index.vue'

Vue.component('e-layout', eLayout)
Vue.component('e-card', eCard)
Vue.component('e-header', eHeader)
Vue.component('e-page', ePage)

Vue.prototype.$format = format
Vue.prototype.$Message = Message
Vue.prototype.$Modal = Modal
Vue.config.productionTip = false

new Vue({
	router,
	render: h => h(App),
}).$mount('#app')
