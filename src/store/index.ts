import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const context = require.context('./', true, /\.(modules.ts)$/)
const modules = {}
context.keys().forEach(name => {
	modules[name.split('.')[1].replace('/', '')] = context(name).default
})
export default new Vuex.Store({
	modules,
})
