import Vue from 'vue'
import App from './App.vue'
import pageModal from '@/components/PageModal'
import Fragment from 'vue-fragment'
import router from "./router";

import '@/styles/index.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

//引入自定义全局组件
import './plugins/customComponents'
//引入element组件
import './plugins/elementComponent'
//自定义组件样式
// import '@/styles/custom-theme.scss'
 
Vue.use(ElementUI);
Vue.use(Fragment);

Vue.prototype.$pageModal = pageModal


Vue.config.productionTip = false
console.log('router', router)
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
