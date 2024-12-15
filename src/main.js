import { createApp } from 'vue';
import App from './App.vue';  // 引入 App 组件
import axios from 'axios';
import router from './router/index'
import './plugins/element.js';  // 引入 element 插件文件

const app = createApp(App);
// 设置axios基础URL（假设后端服务运行在本地的8080端口，根据实际后端部署情况修改）
axios.defaults.baseURL = 'http://localhost:8080'
// 将axios挂载到Vue实例上，方便在组件中使用
app.config.globalProperties.$axios = axios
app.use(router);
app.mount('#app');

//createApp(App).mount('#app');  // 初始化应用并挂载到 DOM

// import Vue from 'vue'
// import App from './App.vue'
// import router from './router/index'
// import './plugins/element.js'

// Vue.config.productionTip = false

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
