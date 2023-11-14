import { createApp } from 'vue'
import 'element-plus/dist/index.css'
import 'virtual:windi.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Router from './router'
import store from './store/index'
import "./permissions"

const app = createApp(App)
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(Router)
app.use(store)
app.mount('#app')
