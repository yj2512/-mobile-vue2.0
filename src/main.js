// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//配置MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//配置axios
import Axios from 'axios'
//设置基本路径
Axios.defaults.baseURL = 'https://www.sinya.online/api/'
Vue.prototype.$axios = Axios
//配置请求拦截器，显示loading图标
Axios.interceptors.request.use(function (config) {
  MintUI.Indicator.open({
    text: '玩命儿加载中...',
    spinnerType: 'fading-circle'
  });
  return config;
})
//配置相应拦截器，关闭loading图标
Axios.interceptors.response.use(function (response){
  MintUI.Indicator.close();
  return response;
})

//引用图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)

//引入公共的css
import './assets/css/global.css'

//引入iconfont
import './assets/iconfont/iconfont.css'

// 引入自定义的全局组件
import NavBar from '@/components/common/NavBar'
Vue.component(NavBar.name, NavBar)
import Comments from '@/components/common/Comment'
Vue.component(Comments.name, Comments)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
