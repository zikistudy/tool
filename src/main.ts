import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { toLine } from './utils'
// 代码高亮
import 'highlight.js/styles/atom-one-dark.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
// 注册自定义全局组件
import gyComponents from './components'
const app = createApp(App)

// 全局注册图标 牺牲一点性能
// el-icon-xxx格式
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    // 注册全局组件
    app.component(`el-icon${toLine(key)}`, component)
  }
app.use(router).use(ElementPlus).use(hljsVuePlugin).use(gyComponents)
app.mount('#app')