import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import './assets/main.css'; // 确保这个文件存在


const app = createApp(App)
app.use(router) // 挂载路由
app.mount('#app')