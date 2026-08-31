// ============================================================
// 应用入口文件：整个 Vue 应用从这里启动
// 面试知识点：Vue 应用的三步流程
// 1. createApp(App) 创建应用实例
// 2. app.use(router) 注册路由插件
// 3. app.mount('#app') 挂载到 index.html 中 id="app" 的节点
// ============================================================
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css'

const app = createApp(App)

app.use(router)
app.mount('#app')
