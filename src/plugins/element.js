import { createApp } from 'vue';  // Vue 3.x 用法
import App from '@/App.vue';
import ElementPlus from 'element-plus';  // 引入 Element Plus
import 'element-plus/dist/index.css';  // 引入 Element Plus 样式

const app = createApp(App);  // 创建 Vue 实例
app.use(ElementPlus);  // 使用 Element Plus 插件


// import Vue from 'vue'
// import Element from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'

// Vue.use(Element)
