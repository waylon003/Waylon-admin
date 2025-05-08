import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// 这行代码导入的是 Element Plus 组件库的全局样式文件，该文件包含了 Element Plus 组件所需的所有 CSS 样式。
import 'element-plus/dist/index.css'
import '@/styles/all.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import pinia from './stores'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component)
}
app.use(pinia)
const { addUserRoutes } = useUserStore()
addUserRoutes()

app.use(router)
app.mount('#app')
