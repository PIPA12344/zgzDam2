import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts'
import axios from 'axios'
import FileSaver from "file-saver";
import XLSX from "xlsx";

Vue.prototype.$FileSaver = FileSaver;
Vue.prototype.$XLSX = XLSX;
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.$echarts = echarts
Vue.use(echarts)
Vue.prototype.rescd = '3302001'
Vue.prototype.$axios = axios
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
