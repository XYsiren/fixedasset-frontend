import { createApp } from 'vue';
import App from './App.vue';  // 引入 App 组件
import router from './router/index'
import './plugins/element.js';  // 引入 element 插件文件

const app = createApp(App);
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
