import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/style/reset.css'
import 'lib-flexible'
import store from './store'
import { formateDate } from './utils'


// const pinia = createPinia()
const app = createApp(App)
app.use(store)

app.provide('$formateDate', formateDate)

app.use(router).mount('#app')
