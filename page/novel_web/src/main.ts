import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Icon from './components/icon.vue'
import './assets/css/main.css'
import {createPinia} from 'pinia'

const pinia = createPinia()
const app = createApp(App)
app.component('Icon',Icon)
app.use(router)
app.use(pinia)

app.mount('#app')
