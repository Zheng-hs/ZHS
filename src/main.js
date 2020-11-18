import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

router.beforeEach((to,form,next) => {
  let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))

  if(userInfo && userInfo.access_token) {
    next()
  } else {
    next('/login')
  }
})