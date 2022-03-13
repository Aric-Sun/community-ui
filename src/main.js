import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.config.productionTip = false;
Vue.use(ViewUI);               //注册iview
import BaiduMap from 'vue-baidu-map' // 导入百度地图包
Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: '1pmqCda27U9Qvzsz5wDfwU0v4LVNqUNo'
})
//开始新项目2022.03.13
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
