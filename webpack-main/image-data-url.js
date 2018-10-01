import Vue from 'vue';
import App from '../src/ImageDataUrlApp.vue'
import SuiVue from 'semantic-ui-vue';
import 'semantic-ui-css/semantic.min.css';

Vue.use(SuiVue);

new Vue({
  render: h => h(App)
}).$mount('#app')